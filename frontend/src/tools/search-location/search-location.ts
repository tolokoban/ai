import { assertType } from "@tolokoban/type-guards";
import z from "zod";
import { toolWrap } from "../wrap";

export const toolSearchLocation = toolWrap({
  title: "Search for location",
  description: `Given the name of a location (\`{query: string}\`), return an array of best matches.

The result will have this format:

\`\`\`ts
type Result = Array<{
  lat: number // Latitude
  lng: number // longitude
  type: string // type of the location
  label: string // full name (with adress, etc.) of the location
}>
\`\`\``,
  inputSchema: z.object({
    query: z.string(),
  }),
  execute: async ({ query }: { query: string }): Promise<any> => {
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=geocodejson`;
    const resp = await fetch(url);
    const data = await resp.json();
    assertType(data, {
      features: [
        "array",
        {
          properties: {
            geocoding: {
              type: "string",
              label: "string",
            },
          },
          geometry: {
            coordinates: ["array", "number", { min: 2, max: 2 }],
          },
        },
      ],
    });
    return data.features.map((item) => {
      const { type, label } = item.properties.geocoding;
      const [lng, lat] = item.geometry.coordinates as [number, number];
      return { type, label, lat, lng };
    });
  },
});

export const toolSearchLocationReverse = toolWrap({
  title: "Find location at latitude/longitude",
  description: `Given a latitude and a longitude, return an array of found locations at this point.

This tool will return an array of records with these fields (all strings):
- \`type\`: the type of the found location at the given coordinates.
- \`name\`
- \`postcode\`
- \`street\`
- \`district\`
- \`city\`
- \`state\`
- \`country\`
`,
  inputSchema: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  execute: async (args: { lat: number; lng: number }): Promise<any> => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${args.lat}&lon=${args.lng}&format=geocodejson`;
    const resp = await fetch(url);
    const data = await resp.json();
    assertType(data, {
      features: [
        "array",
        {
          properties: {
            geocoding: {
              type: "string",
              name: "string",
              postcode: "string",
              street: "string",
              district: "string",
              city: "string",
              state: "string",
              country: "string",
            },
          },
        },
      ],
    });
    return data.features.map((item) => {
      const { type, name, postcode, street, district, city, state, country } =
        item.properties.geocoding;
      return { type, name, postcode, street, district, city, state, country };
    });
  },
});
