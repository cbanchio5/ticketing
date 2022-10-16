import { CustomError } from "./custom-errors";

export class NotAuhtorizeError extends CustomError {
  statusCode= 401;

  constructor(){
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuhtorizeError.prototype);

  }

  serializeErrors() {
    return[{message: 'Not authorized'}];
  }
}
