import readline from "readline";
import { WebClient } from "@slack/web-api";
import getRandomQuote from "../../utils/helpers/track-quotes";
import { App } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();

const CHANNEL_ID = process.env.CHANNEL_ID!;
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

const registerKeyPressEvent = (app: App) => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", async (str, key) => {
    if (key.name === "s") {
      console.log("📢 Sending message to Slack...");

      try {
        await slackClient.chat.postMessage({
          channel: CHANNEL_ID,
          text: getRandomQuote(),
        });

        console.log("✅ Message sent successfully!");
      } catch (error) {
        console.error("❌ Error sending message:", error);
      }
    } else if (key.name === "q") {
      console.log("👋 Exiting...");
      process.exit();
    } else if (key.name === "h") {
      app.logger.info(
        "\n- Press 'q' to EXIT \n- Press 's' to send message to CHANNEL"
      );
    }
  });
};

export default registerKeyPressEvent;
