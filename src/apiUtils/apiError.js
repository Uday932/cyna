export class AppError extends Error {
  #errors = null;
  #httpCode = null;
  #code = "error.app";
  #details = null;

  constructor(
    errors = ["Oops. Something went wrong"],
    httpCode = 500,
    code,
    details = null,
  ) {
    super(errors.join(" | "));
    this.#errors = errors;
    this.#httpCode = httpCode;
    this.#code = code;
    this.#details = details;
  }

  get errors() {
    return this.#errors;
  }

  get httpCode() {
    return this.#httpCode;
  }

  get code() {
    return this.#code;
  }

  get details() {
    return this.#details;
  }
}

export class NotFoundError extends AppError {
  constructor(errors = ["Not found"], details = null) {
    super(errors, 404, "error.app.notFound", details);
  }
}

export class InvalidArgumentError extends AppError {
  constructor(errors = ["Invalid arguments"], details = null) {
    super(errors, 422, "error.app.InvalidArgumentError", details);
  }
}

export class InternalServerError extends AppError {
  constructor(errors = ["Internal Server Error"], details = null) {
    super(errors, 500, "error.app.InternalServerError", details);
  }
}
