"use client";
import "./page.css";
import { Inbox } from "@novu/react";
import { env } from "../env.mjs";
import { NovuHeadless } from "./headless";

export default function NovuInbox() {
  const handleActionAndNotificationClick = (data: any) => {
    console.log("handleActionAndNotificationClick", data);
  };

  return (
    <Inbox
      applicationIdentifier={env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER}
      subscriberId={env.NEXT_PUBLIC_SUBSCRIBER_ID}
      subscriberHash="subcriberHash"
      onNotificationClick={handleActionAndNotificationClick}
      onPrimaryActionClick={handleActionAndNotificationClick}
      onSecondaryActionClick={handleActionAndNotificationClick}
      // appearance={{
      //   elements: {
      //     popoverTrigger: "novu-popover-trigger",
      //   },
      //   baseTheme: {},
      // }}
    />
    // <NovuHeadless />
  );
}
