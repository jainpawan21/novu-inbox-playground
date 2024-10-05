import { workflow } from "@novu/framework";
import { z } from "zod";

export const inboxNotification = workflow(
  "inbox-notification",
  async ({ step, payload }) => {
    await step.inApp("inbox", async () => {
      return {
        subject: payload.inboxSubject,
        body: payload.inboxBody,
      };
    });
  },
  {
    payloadSchema: z.object({
      inboxSubject: z.string().default("Inbox Subject"),
      inboxBody: z.string().default("Inbox Body"),
    }),
  }
);
