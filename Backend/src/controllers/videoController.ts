import { Video } from '../models/videoModel';
import * as factory from './handlerFactory';

export const getAllVideos = factory.getAll(Video, { path: 'novel', select: 'title' });
export const getVideo = factory.getOne(Video, { path: 'novel', select: 'title' });
export const createVideo = factory.createOne(Video);
export const updateVideo = factory.updateOne(Video);
export const deleteVideo = factory.deleteOne(Video);
