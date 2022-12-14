import { Publisher, OrderCreatedEvent, Subjects } from "@cbanchio5tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
