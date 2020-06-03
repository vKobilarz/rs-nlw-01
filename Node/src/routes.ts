import express from 'express';

import pointsController from './controllers/PointsController';
import itemsController from './controllers/ItemsController';

const routes = express.Router();

routes.get('/items', itemsController.index);
routes.get('/items/:id', itemsController.show);
routes.post('/items', itemsController.create);
routes.put('/items/:id', itemsController.update);
routes.delete('/items/:id', itemsController.delete);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
// routes.post('/points', pointsController.create);
// routes.put('/points/:id', pointsController.update);
// routes.delete('/points/:id', pointsController.delete);

export default routes;

// Service Pattern
// Repository Pattern (Data Mapper)
