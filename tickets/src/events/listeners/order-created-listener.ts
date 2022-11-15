import { Listener, OrderCreatedEvent, Subjects } from "@cbanchio5tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

    //Find ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //If not ticker, throw error

    if(!ticket) {
      throw new Error('Ticket not found');
    }

    //Mark ticket as reserved by setting orderId property
      ticket.set({orderId: data.id});
    //save ticket

    await ticket.save();

    //ack message

    msg.ack();
  }
}
