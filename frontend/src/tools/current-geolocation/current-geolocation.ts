import z from "zod";
import { toolWrap } from "../wrap";

const ERR_NO_GPS_AVAILABLE = -1;
const ERR_NOT_ALLOWED = -2;
const ERR_TIMEOUT = -3;

export const toolCurrentGeolocation = toolWrap({
  title: "Get current latitude/longitude",
  description: `Tries to retrieve the current latitude and longitude from the GPS.
If found, return it as \`{lat: number, lng: number}\`.
If no GPS is available on this device, return -1.
If the user did not allow GPS use, return -2.`,
  inputSchema: z.object({}),
  execute: (): Promise<{ lat: number; lng: number } | number> => {
    return new Promise((resolve) => {
      if (!("geolocation" in navigator)) {
        resolve(ERR_NO_GPS_AVAILABLE);
        return;
      }

      const successCallback = (arg: GeolocationPosition) => {
        resolve({
          lat: arg.coords.latitude,
          lng: arg.coords.longitude,
        });
      };
      const errorCallback = (arg: GeolocationPositionError) => {
        console.error(arg);
        switch (arg.code) {
          case arg.PERMISSION_DENIED:
            return resolve(ERR_NOT_ALLOWED);
          case arg.POSITION_UNAVAILABLE:
            return resolve(ERR_NO_GPS_AVAILABLE);
          default:
            return resolve(ERR_TIMEOUT);
        }
      };
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        timeout: 10000,
        maximumAge: Infinity,
      });
    });
  },
});
