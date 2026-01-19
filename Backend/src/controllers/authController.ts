import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/tokenUtils.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { token, type } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        let email, name, googleId, picture;

        if (type === 'access_token') {
            // Verify via UserInfo API
            const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userInfo = await userInfoResponse.json();

            if (!userInfo.email) {
                return res.status(400).json({ message: 'Invalid access token' });
            }

            email = userInfo.email;
            name = userInfo.name;
            googleId = userInfo.sub;
            picture = userInfo.picture;

        } else {
            // Verify Google Token (ID Token)
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            if (!payload) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            email = payload.email;
            name = payload.name;
            googleId = payload.sub;
            picture = payload.picture;
        }

        if (!email) {
            return res.status(400).json({ message: 'Email not found in token' });
        }

        // Find or Create User
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                name,
                googleId,
                picture,
            });
        } else {
            // Update info if changed (optional)
            user.name = name || user.name;
            user.picture = picture || user.picture;
            await user.save();
        }

        // Generate Tokens
        const accessToken = generateAccessToken((user._id as unknown as string));
        const refreshToken = generateRefreshToken((user._id as unknown as string));

        // Set Refresh Token in Cookie (HTTP Only)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // or 'lax' depending on frontend hosting
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
            },
            accessToken,
        });

    } catch (error) {
        console.error('Google Login Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const refreshAccessToken = async (req: Request, res: Response): Promise<any> => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' });
        }

        const decoded = verifyRefreshToken(refreshToken);

        if (!decoded) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const accessToken = generateAccessToken(decoded.userId);

        return res.status(200).json({ accessToken });

    } catch (error) {
        console.error('Refresh Token Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
};
