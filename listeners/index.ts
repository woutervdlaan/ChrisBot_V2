import type { App } from "@slack/bolt";
import message from "./message";

const registerListeners = (app: App) => {
  message.register(app);
};

export default registerListeners;
