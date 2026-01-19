import { Request, Response, NextFunction } from 'express';
import { Model, Document, PopulateOptions } from 'mongoose';

export const createOne = (Model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doc = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};

export const getOne = (Model: Model<any>, popOptions?: PopulateOptions | PopulateOptions[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return res.status(404).json({
                status: 'fail',
                message: 'No document found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};

export const getAll = (Model: Model<any>, popOptions?: PopulateOptions | PopulateOptions[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Basic filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let query = Model.find(queryObj);
        if (popOptions) query = query.populate(popOptions);

        const docs = await query;

        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: {
                data: docs
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};

export const updateOne = (Model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`Update request for ID: ${req.params.id}`);
        console.log('Update body:', req.body);

        // Remove immutable/internal fields from body
        const filteredBody = { ...req.body };
        ['_id', 'id', '__v', 'createdAt', 'updatedAt'].forEach(el => delete filteredBody[el]);

        const doc = await Model.findByIdAndUpdate(req.params.id, filteredBody, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            console.warn(`No document found with ID: ${req.params.id}`);
            return res.status(404).json({
                status: 'fail',
                message: 'No document found with that ID'
            });
        }

        console.log('Update successful');
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    } catch (error: any) {
        console.error('Update failed:', error);
        res.status(400).json({
            status: 'fail',
            message: error.message || 'Error updating document',
            error: error
        });
    }
};

export const deleteOne = (Model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return res.status(404).json({
                status: 'fail',
                message: 'No document found with that ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};
