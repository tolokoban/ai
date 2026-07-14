import z from "zod";
import { toolWrap } from "../wrap";

export const toolDistance = toolWrap({
  title: "Distance between two points",
  description: `Given the latitude and a longitude of two locations, return the distance between them in straight line, expressed in meters.`,
  inputSchema: z.object({
    lat1: z.number(),
    lng1: z.number(),
    lat2: z.number(),
    lng2: z.number(),
  }),
  execute: async (args: {
    lat1: number;
    lng1: number;
    lat2: number;
    lng2: number;
  }): Promise<any> => {
    const { lat1, lng1, lat2, lng2 } = args;
    const elevation = 0;
    const lat1rad = lat1 * RADIANS_PER_DEGREE;
    const lng1rad = lng1 * RADIANS_PER_DEGREE;
    const lat2rad = lat2 * RADIANS_PER_DEGREE;
    const lng2rad = lng2 * RADIANS_PER_DEGREE;

    const r1 = (EQUTORIAL_RADIUS + elevation) * Math.cos(lat1rad);
    const z1 = (POLAR_RADIUS + elevation) * Math.sin(lat1rad);
    const x1 = r1 * Math.cos(lng1rad);
    const y1 = r1 * Math.sin(lng1rad);
    const r2 = (EQUTORIAL_RADIUS + elevation) * Math.cos(lat2rad);
    const z2 = (POLAR_RADIUS + elevation) * Math.sin(lat2rad);
    const x2 = r2 * Math.cos(lng2rad);
    const y2 = r2 * Math.sin(lng2rad);

    const x = x1 - x2;
    const y = y1 - y2;
    const z = z1 - z2;

    return Math.sqrt(x * x + y * y + z * z);
  },
});

export const RADIANS_PER_DEGREE = Math.PI / 180;
export const EQUTORIAL_RADIUS = 6378137;
export const POLAR_RADIUS = 6356752.3;
