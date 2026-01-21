import { Novel } from '../models/novelModel';
import * as factory from './handlerFactory';

export const getAllNovels = factory.getAll(Novel);
export const getNovel = factory.getOne(Novel);
export const createNovel = factory.createOne(Novel);
export const updateNovel = factory.updateOne(Novel);
export const deleteNovel = factory.deleteOne(Novel);
