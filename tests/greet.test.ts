import { describe, it, expect } from "vitest";
import { greet } from "../src/greet.js";

describe("greet", () => {
  it("returns ok:true with a greeting for a valid name", () => {
    const result = greet({ name: "world" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.message).toBe("Hello, world!");
  });

  it("uses a custom prefix", () => {
    const result = greet({ name: "world", prefix: "Hi" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.message).toBe("Hi, world!");
  });

  it("returns ok:false / empty_name for an empty string", () => {
    const result = greet({ name: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("empty_name");
  });

  it("returns ok:false / empty_name for whitespace-only input", () => {
    const result = greet({ name: "   " });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("empty_name");
  });

  it("trims whitespace from the name", () => {
    const result = greet({ name: "  world  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.message).toBe("Hello, world!");
  });
});
