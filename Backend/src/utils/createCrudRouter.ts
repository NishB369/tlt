import { Router } from 'express';
import { Model, PopulateOptions } from 'mongoose';
import * as factory from '../controllers/handlerFactory';

export const createCrudRouter = (Model: Model<any>, popOptions?: PopulateOptions | PopulateOptions[]) => {
    const router = Router();

    router.route('/')
        .get(factory.getAll(Model, popOptions))
        .post(factory.createOne(Model));

    router.route('/:id')
        .get(factory.getOne(Model, popOptions))
        .patch(factory.updateOne(Model))
        .put(factory.updateOne(Model))
        .delete(factory.deleteOne(Model));

    return router;
};
