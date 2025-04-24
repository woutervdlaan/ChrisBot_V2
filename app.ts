import pkg from "@slack/bolt";
import dotenv from "dotenv";
import express from "express";
import registerListeners from "./listeners/index.ts";
import registerEndpoints from "./endpoints/index.ts";
// import registerKeyPressEvent from "./listeners/keypress/keypress.ts";

const { App } = pkg;
const PORT = 3000;

const app = express();
app.use(express.json());

export type ExpressApp = typeof app;

dotenv.config();

const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
});

registerListeners(slackApp);
registerEndpoints(app, slackApp);

const init = async () => {
  await slackApp.start();
  slackApp.logger.info("Chris listening for questions that will piss him off");

  app.listen(PORT, () =>
    slackApp.logger.info(`Server running on port ${PORT}`)
  );

  // app.logger.info(
  //   "\n- Press 'q' to EXIT \n- Press 's' to send message to CHANNEL \n- Press 'h' for OPTIONS"
  // );

  // registerKeyPressEvent(app);
};

// init();
