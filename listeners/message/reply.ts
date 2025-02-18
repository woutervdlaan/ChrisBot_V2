import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import getRandomQuote from "../../utils/helpers/track-quotes";
import wait from "../../utils/helpers/wait";

const reply = async ({
  event,
  client,
  say,
  logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">) => {
  if (!("text" in event) || !event.text || "bot_id" in event) return;

  logger.info("📬 Received Message Event:", event);

  try {
    await wait(1000);

    await client.reactions.add({
      channel: event.channel,
      timestamp: event.ts,
      name: "thumbsdown",
    });

    await wait(3000);

    await say({
      channel: event.channel,
      text: getRandomQuote(),
    });
  } catch (error) {
    logger.error("Error handling Slack message:", error);
  }
};

export default reply;
