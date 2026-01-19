import { Video } from '../models/videoModel.js';
import * as factory from './handlerFactory.js';

export const getAllVideos = factory.getAll(Video);
export const getVideo = factory.getOne(Video);
export const createVideo = factory.createOne(Video);
export const updateVideo = factory.updateOne(Video);
export const deleteVideo = factory.deleteOne(Video);
