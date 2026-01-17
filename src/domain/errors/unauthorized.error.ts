import { HttpStatus } from "../enum/http-status.enum";
import { BaseError } from "./baseError";

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, HttpStatus[HttpStatus.UNAUTHORIZED]);
  }
}