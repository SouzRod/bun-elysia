import { HttpStatus } from "../enum/http-status.enum";
import { BaseError } from "./baseError";

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, HttpStatus[HttpStatus.BAD_REQUEST]);
  }
}