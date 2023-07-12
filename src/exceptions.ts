import { GraphQLError } from "graphql";

export class BaseException extends GraphQLError {}

export class AuthenticationError extends BaseException {
  constructor(
    message: string = "Invalid authentication",
    details: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code: "AUTHENTICATION_ERROR",
        http: { details, status: 403 },
      },
    });
  }
}

export class NotAuthenticated extends BaseException {
  constructor(
    message: string = "User not authenticated",
    details: Record<string, any> = {}
  ) {
    super(message, {
      extensions: { code: "NOT_AUTHENTICATED", http: { details, status: 401 } },
    });
  }
}

export class NotAllowed extends BaseException {
  constructor(
    message: string = "User not allowed",
    details: Record<string, any> = {}
  ) {
    super(message, {
      extensions: { code: "NOT_ALLOWED", http: { details, status: 403 } },
    });
  }
}

export class NotFound extends BaseException {
  constructor(
    message: string = "Not found",
    details: Record<string, any> = {}
  ) {
    super(message, {
      extensions: { code: "NOT_FOUND", http: { details, status: 404 } },
    });
  }
}

export class APIException extends BaseException {
  constructor(
    message: string = "API exception",
    details: Record<string, any> = {}
  ) {
    super(message, {
      extensions: { code: "API_EXCEPTION", http: { details, status: 500 } },
    });
  }
}
