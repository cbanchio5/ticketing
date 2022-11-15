import { OrderCreatedListener } from "../order-created-listener"
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@cbanchio5tickets/common";
import { Message } from "node-nats-streaming";

const setup = async() => {
//create an nstance of listener

const listener = new OrderCreatedListener(natsWrapper.client);

//create and save ticket

const ticket = Ticket.build({

  title: 'cpncert',
  price: 99,
  userId: 'ajhsas'
})

await ticket.save();

//create fake data event

const data: OrderCreatedEvent['data'] = {
  id: new mongoose.Types.ObjectId().toHexString(),
  version: 0,
  status: OrderStatus.Created,
  userId: 'djfhs',
  expiresAt: '3243',
  ticket: {
    id: ticket.id,
    price: ticket.price
  }
}
// @ts-ignore
const msg : Message = {
  ack: jest.fn()
}

return { listener, ticket, data, msg}
}

it('sets the userId of the ticket', async() => {
const {listener, ticket, data, msg} = await setup();

await listener.onMessage(data, msg);

const updatedTicket = await Ticket.findById(ticket.id);

expect(updatedTicket!.orderId).toEqual(data.id);
})

it('acks the msg', async() => {
  const {listener, ticket, data, msg} = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
})
