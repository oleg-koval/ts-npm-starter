// ---------------------------------------------------------------------------
// Replace this file with your package's domain types.
// The Result<T, E> tagged-union pattern below is a useful convention:
// callers narrow on `.ok` instead of catching exceptions.
// ---------------------------------------------------------------------------

export type GreetResult =
  | { ok: true; message: string }
  | { ok: false; reason: "empty_name" };

export interface GreetOptions {
  /** Name to greet. Must be non-empty.
   *  @example "world" */
  name: string;
  /** Optional greeting prefix.
   *  @default "Hello" */
  prefix?: string;
}
