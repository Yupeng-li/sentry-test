export class ErrorWithCause extends Error{
  constructor(readonly message: string, readonly cause: Error) {
    super()
  }
}
