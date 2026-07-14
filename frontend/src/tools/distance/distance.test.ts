// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { toolDistance, RADIANS_PER_DEGREE, EQUTORIAL_RADIUS, POLAR_RADIUS } from "./distance";

describe("toolDistance", () => {
  const execute = toolDistance.execute;

  it("returns 0 for identical points", async () => {
    const result = await execute({ lat1: 48.8566, lng1: 2.3522, lat2: 48.8566, lng2: 2.3522 });
    expect(result).toBeCloseTo(0, 0);
  });

  it("computes distance between Paris and London (~340km)", async () => {
    const result = await execute({ lat1: 48.8566, lng1: 2.3522, lat2: 51.5074, lng2: -0.1278 });
    expect(result).toBeGreaterThan(330_000);
    expect(result).toBeLessThan(350_000);
  });

  it("computes distance between New York and Los Angeles (~3940km)", async () => {
    const result = await execute({ lat1: 40.7128, lng1: -74.006, lat2: 34.0522, lng2: -118.2437 });
    expect(result).toBeGreaterThan(3_800_000);
    expect(result).toBeLessThan(4_000_000);
  });

  it("is symmetric", async () => {
    const ab = await execute({ lat1: 48.8566, lng1: 2.3522, lat2: 51.5074, lng2: -0.1278 });
    const ba = await execute({ lat1: 51.5074, lng1: -0.1278, lat2: 48.8566, lng2: 2.3522 });
    expect(ab).toBeCloseTo(ba, 5);
  });
});

describe("constants", () => {
  it("RADIANS_PER_DEGREE is correct", () => {
    expect(RADIANS_PER_DEGREE).toBeCloseTo(Math.PI / 180);
  });

  it("EQUTORIAL_RADIUS matches WGS84", () => {
    expect(EQUTORIAL_RADIUS).toBe(6378137);
  });

  it("POLAR_RADIUS matches WGS84", () => {
    expect(POLAR_RADIUS).toBe(6356752.3);
  });
});
