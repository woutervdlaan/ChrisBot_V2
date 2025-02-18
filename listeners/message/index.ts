import type { App } from "@slack/bolt";
import reply from "./reply";
import tag from "./tag";
import directMessage from "./direct-message";

const TRIGGERS = [
  "chris",
  "background",
  "geolocation",
  "Chris",
  "package",
  "bot",
  "Merijn",
  "Bart",
  "merijn",
  "bart",
  "geofencing",
  "modaliteiten",
];

const register = (app: App) => {
  app.message(directMessage);
  app.message(/<@U08BJCVENLW>/, tag);
  TRIGGERS.forEach((trigger) => app.message(trigger, reply));
};

export default { register };
