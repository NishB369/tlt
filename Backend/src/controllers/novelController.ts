import { Novel } from '../models/novelModel.js';
import * as factory from './handlerFactory.js';

export const getAllNovels = factory.getAll(Novel);
export const getNovel = factory.getOne(Novel);
export const createNovel = factory.createOne(Novel);
export const updateNovel = factory.updateOne(Novel);
export const deleteNovel = factory.deleteOne(Novel);
