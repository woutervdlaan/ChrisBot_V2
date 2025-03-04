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
  "Wouter",
];

const FOUR_HOURS = 4 * 60 * 60 * 1000;

const muteUntilPerChannel = new Map<string, number>();

const isMuted = (channel: string) => {
  const muteUntil = muteUntilPerChannel.get(channel);
  return muteUntil !== undefined && Date.now() < muteUntil;
};

const register = (app: App) => {
  app.message(directMessage);

  app.message(
    /<@U08BJCVENLW>/,
    async ({ message, next }) => {
      if ("channel" in message) muteUntilPerChannel.delete(message.channel);
      await next();
    },
    tag
  );

  app.message("CHRIS, SHUT UP!", async ({ message, say }) => {
    if ("channel" in message) {
      if (isMuted(message.channel)) return;

      muteUntilPerChannel.set(message.channel, Date.now() + FOUR_HOURS);

      app.logger.info(
        `Chris is muted in channel: ${
          message.channel
        }. [MUTED_CHANNELS: ${Array.from(muteUntilPerChannel).join(", ")}] `
      );

      await say(
        "I'm sorry... Ignorance is triggering. I'll stay quiet for a while. Tag me if you want me to return. Otherwise, I'll be back in 4 hours."
      );
    }
  });

  TRIGGERS.forEach((trigger) => {
    app.message(
      trigger,
      async ({ message, next }) => {
        if ("channel" in message && isMuted(message.channel)) return;
        await next();
      },
      reply
    );
  });
};

export default { register };
