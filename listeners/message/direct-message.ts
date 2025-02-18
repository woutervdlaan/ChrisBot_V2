import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import wait from "../../utils/helpers/wait";
import getRandomQuote from "../../utils/helpers/track-quotes";

const directMessage = async ({
  event,
  say,
  logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">) => {
  if (!("text" in event) || !event.text || event.channel_type !== "im") return;

  logger.info("📬 Received Message Event:", event);

  try {
    await wait(3000);
    await say({
      channel: event.channel,
      text: getRandomQuote(),
    });
  } catch (error) {
    logger.error("Error handling Slack message:", error);
  }
};

export default directMessage;
