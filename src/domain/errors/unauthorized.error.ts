import { HttpStatus, HttpStatusName } from "../enum/http-status.enum";
import { BaseError } from "./baseError";

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, HttpStatusName.UNAUTHORIZED);
  }
}