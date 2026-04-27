import type { GreetOptions, GreetResult } from "./types.js";

/**
 * A minimal example function — replace with your own logic.
 *
 * Returns a tagged-union Result so callers use type narrowing
 * instead of try/catch.
 *
 * @example
 * ```ts
 * import { greet } from 'your-package-name';
 *
 * const result = greet({ name: 'world' });
 * if (result.ok) {
 *   console.log(result.message); // "Hello, world!"
 * }
 * ```
 */
export function greet(opts: GreetOptions): GreetResult {
  const name = opts.name.trim();

  if (name.length === 0) {
    return { ok: false, reason: "empty_name" };
  }

  const prefix = opts.prefix?.trim() ?? "Hello";
  return { ok: true, message: `${prefix}, ${name}!` };
}
