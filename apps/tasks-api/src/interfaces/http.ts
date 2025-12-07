// apps/tasks-api/src/interfaces/http.ts
import type { Request, Response } from 'express';
import type { HttpLogger } from 'pino-http';

/**
 * Generic description of an endpoint.
 * Each concrete endpoint interface will extend this.
 */
export interface EndpointDefinition {
  PathParams?: Record<string, string>;
  QueryParams?: Record<string, string | string[] | number | number[]>;
  RequestBody?: unknown;
  Responses: {
    [statusCode: number]: unknown;
  };
}

/**
 * Strongly typed Express Request based on an EndpointDefinition.
 */
export type TypedRequest<Def extends EndpointDefinition> = Request<
  Def['PathParams'],
  Def['Responses'][keyof Def['Responses']],
  Def['RequestBody'],
  Def['QueryParams']
>;

/**
 * Strongly typed Express Response based on an EndpointDefinition.
 */
export type TypedResponse<
  Def extends EndpointDefinition,
  StatusCode extends keyof Def['Responses']
> = Response<Def['Responses'][StatusCode]>;

/**
 * Standard error response shape.
 */
export type API_ErrorResponse = {
  errors: {
    code: string;
    title: string;
    detail: string;
  }[];
};

/**
 * Request with pino logger attached (via pino-http).
 */
export type TypedLoggedRequest<Def extends EndpointDefinition> =
  TypedRequest<Def> & {
    log: HttpLogger['logger'];
  };
