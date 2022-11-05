import express, {Request, Response} from 'express';
import { NotFoundError, requireAuth, validateRequest, OrderStatus, BadRequestError } from '@cbanchio5tickets/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId')
  .not()
  .isEmpty()
  .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
  .withMessage('Ticket Id must be provided')
], validateRequest,async (req: Request, res: Response) => {
  //Find the ticket use is ordering

  const { ticketId} = req.body;

  const ticket = await Ticket.findById(ticketId);

  if(!ticket) {
    throw new NotFoundError();
  }



  //Make sure ticket is not reserved
  const isReserved = await ticket.isReserved();

  if(isReserved) {
    throw new BadRequestError('Ticket is already reserved');
  }

  // Calculate expiration date

  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

  //Build order and save to database

  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket
  });

  await order.save();

  //Publish event of ordering created

  res.status(201).send(order);
});

export {router as newOrderRouter};
