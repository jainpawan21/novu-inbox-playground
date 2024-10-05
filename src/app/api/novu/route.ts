import { serve } from "@novu/framework/next";
import { inboxNotification } from "../../workflows/inbox";

export const { GET, POST, OPTIONS } = serve({
  workflows: [inboxNotification],
});
