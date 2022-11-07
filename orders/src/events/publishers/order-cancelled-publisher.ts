import { Publisher, OrderCancelledEvent, Subjects } from "@cbanchio5tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
