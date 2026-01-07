import { HttpStatus, HttpStatusName } from "../enum/http-status.enum";
import { BaseError } from "./baseError";

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, HttpStatusName.BAD_REQUEST);
  }
}