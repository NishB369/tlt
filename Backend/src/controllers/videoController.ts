import { Video } from '../models/videoModel';
import * as factory from './handlerFactory';

export const getAllVideos = factory.getAll(Video);
export const getVideo = factory.getOne(Video);
export const createVideo = factory.createOne(Video);
export const updateVideo = factory.updateOne(Video);
export const deleteVideo = factory.deleteOne(Video);
