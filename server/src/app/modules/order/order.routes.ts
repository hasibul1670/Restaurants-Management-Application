import express from 'express';


import { OrderController } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  OrderController.createOrder
);
router.get('/:id', OrderController.getSingleOrder);
router.delete(
  '/:id',

  OrderController.deleteOrder
);

router.patch('/', OrderController.updateOrder);

router.get('/', OrderController.getAllOrders);

export const OrderRoutes = router;
