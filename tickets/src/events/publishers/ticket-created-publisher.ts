import { Publisher, Subjects, TicketCreatedEvent } from "@cbanchio5tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
