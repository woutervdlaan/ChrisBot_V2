import type { App as SlackApp } from "@slack/bolt";
import { ExpressApp } from "../app.ts";
import trigger from "./trigger/index.ts";

const registerEndpoints = (app: ExpressApp, slackApp: SlackApp) => {
  trigger.register(app, slackApp);
};

export default registerEndpoints;
