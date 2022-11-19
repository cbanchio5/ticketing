import { Listener, ExpirationCompleteEvent, Subjects, OrderStatus } from "@cbanchio5tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if(!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Cancelled
    });

  }
}
