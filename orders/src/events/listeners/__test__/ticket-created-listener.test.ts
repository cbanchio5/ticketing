import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedEvent } from "@cbanchio5tickets/common";
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async() => {
//create instance of listener
const listener = new TicketCreatedListener(natsWrapper.client)
//create fake data event
const data: TicketCreatedEvent['data'] = {
  id: new mongoose.Types.ObjectId().toHexString(),
  version: 0,
  title: 'concert',
  price: 10,
  userId: new mongoose.Types.ObjectId().toHexString()
}

//create a fake message object
//@ts-ignore
const msg: Message = {
  ack: jest.fn()
}

return {
  listener,
  data,
  msg
}
}

it('created and saves a ticker', async() => {

const { listener, data, msg} =  await setup();
//call the onMessage function with data and message object

await listener.onMessage(data, msg)
const ticket = await Ticket.findById(data.id);


//assertions to make sure ticket was created

expect(ticket).toBeDefined();
expect(ticket!.title).toEqual(data.title);
expect(ticket!.price).toEqual(data.price);
});

it('ack the message', async()=> {

  const { listener, data, msg} =  await setup();

  await listener.onMessage(data, msg);

//call the onMessage function with data and message object

expect(msg.ack).toHaveBeenCalled();
//assertions to make sure ack function was called
});
