import express, {Request, Response} from 'express';
import { NotFoundError, requireAuth, validateRequest, OrderStatus, BadRequestError } from '@cbanchio5tickets/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

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

  const isReserved = await ticket.isReserved();

  if(isReserved) {
    throw new BadRequestError('Ticket is already reserved');
  }


  //Make sure ticket is not reserved

  // Calculate expiration date

  //Build order and save to database

  //Publish event of ordering created
});

export {router as newOrderRouter};
