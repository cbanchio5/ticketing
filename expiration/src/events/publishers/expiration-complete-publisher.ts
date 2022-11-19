import { Subjects, Publisher, ExpirationCompleteEvent } from "@cbanchio5tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
