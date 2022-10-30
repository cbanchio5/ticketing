import { Publisher, Subjects, TicketUpdatedEvent } from "@cbanchio5tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
