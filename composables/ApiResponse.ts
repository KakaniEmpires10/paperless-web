import type { InternalApi } from "nitropack";
export type ApiRoutes = keyof InternalApi;

export type ApiResponse<
  T extends ApiRoutes,
  M extends keyof InternalApi[T],
> = InternalApi[T][M];