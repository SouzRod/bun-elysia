import { HttpStatus, HttpStatusName } from "../enum/http-status.enum";
import { BaseError } from "./baseError";

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND, HttpStatusName.NOT_FOUND);
  }
}