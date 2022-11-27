import { Subjects, Publisher, PaymentCreatedEvent } from "@cbanchio5tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
