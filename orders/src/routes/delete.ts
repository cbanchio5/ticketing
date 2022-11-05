import express, {Request, Response} from 'express';
import { Order, OrderStatus } from '../models/order';
import { requireAuth, NotAuhtorizeError, NotFoundError } from '@cbanchio5tickets/common';

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {

  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if(!order){
    throw new NotFoundError()
  }

  if(order.userId !== req.currentUser!.id) {
    throw new NotAuhtorizeError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  //publish an event saying order was cancelled

  res.status(204).send(order);
});

export {router as deleteOrderRouter}
