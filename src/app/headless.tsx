"use client";
import React, { useEffect, useState } from "react";
import { Novu, PreferenceLevel } from "@novu/js";
import { env } from "@/env.mjs";

const novu = new Novu({
  subscriberId: env.NEXT_PUBLIC_SUBSCRIBER_ID,
  applicationIdentifier: env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER,
});

export const NovuHeadless = () => {
  const [notifications, setNotifications] = useState<any>();

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await novu.notifications.list({
        limit: 10,
      });

      novu.notifications.count();

      setNotifications(notifications.data?.notifications);

      console.log("listNotifications", notifications);
    };
    fetchNotifications();
  }, []);
  novu.on("notifications.notification_received", (data) => {
    console.log("notification_received", data);
  });

  novu.on("notifications.unread_count_changed", (data) => {
    console.log("notifications.unread_count_changed", data);
  });
  novu.off("notifications.unread_count_changed", (data) => {
    console.log("notifications.unread_count_changed off->", data);
  });

  novu.on("notifications.unseen_count_changed", (data) => {
    console.log("notifications.unseen_count_changed", data);
  });

  novu.on("notifications.list.updated", (data) => {
    console.log("notifications.list.updated", data);
  });

  novu.on("notifications.list.pending", (data) => {
    console.log("notifications.list.pending", data);
  });

  // novu.on("notification.read.pending", (data) => {
  //   console.log("notification.read.pending", data);
  // });

  // novu.on("notification.read.resolved", (data) => {
  //   console.log("notification.read.resolved", data);
  // });

  // novu.on("notification.unread.resolved", (data) => {
  //   console.log("notification.unread.resolved", data);
  // });

  // novu.on("notification.unread.pending", (data) => {
  //   console.log("notification.unread.pending", data);
  // });

  novu.on("notification.archive.pending", (data) => {
    console.log("notification.archive.pending", data);
  });

  novu.on("notification.archive.resolved", (data) => {
    console.log("notification.archive.resolved", data);
  });

  novu.on("notification.unarchive.resolved", (data) => {
    console.log("notification.unarchive.resolved", data);
  });

  novu.on("notification.unarchive.pending", (data) => {
    console.log("notification.unarchive.pending", data);
  });

  novu.on("notifications.read_all.pending", (data) => {
    console.log("notifications.read_all.pending", data);
  });

  novu.on("notifications.read_all.resolved", (data) => {
    console.log("notifications.read_all.resolved", data);
  });

  novu.on("notifications.archive_all.pending", (data) => {
    console.log("notifications.archive_all.pending", data);
  });

  novu.on("notifications.archive_all.resolved", (data) => {
    console.log("notifications.archive_all.resolved", data);
  });

  novu.on("notifications.archive_all_read.pending", (data) => {
    console.log("notifications.archive_all_read.pending", data);
  });

  novu.on("notifications.archive_all_read.resolved", (data) => {
    console.log("notifications.archive_all_read.resolved", data);
  });

  const listNotifications = async () => {
    console.log("in list notifications");
    const response = await novu.notifications.list({
      limit: 10,
      // read: false,
      // archived: false,
    });

    if (response && response.data && response.data.notifications) {
      setNotifications(response.data.notifications);
      console.log("listNotifications", response.data.notifications);
    }

    // const preferenes = await novu.preferences.list();

    const updatePreferences = await novu.preferences.update({
      workflowId: "66d9f42fcf572b81c7c69074",
      channelPreferences: {
        in_app: true,
      },
    });
    console.log("preferenes", updatePreferences);
  };
  const listNotificationsWithLimit = async () => {
    const notifications = await novu.notifications.list({
      limit: 10,
      offset: 10,
      // read: false,
      // archived: false,
    });

    console.log("listNotificationsWithLimit", notifications);
  };

  const handleNotificationRead = async (
    notificationId: string,
    status: boolean
  ) => {
    if (status) {
      await novu.notifications.unread({ notificationId });
    } else {
      await novu.notifications.read({ notificationId });
    }
  };

  const handleNotificationArchived = async (
    notificationId: string,
    status: boolean
  ) => {
    if (status) {
      await novu.notifications.unarchive({ notificationId });
    } else {
      await novu.notifications.archive({ notificationId });
    }
  };

  const handleNotification = async (notification: any) => {
    await notification.unread();
  };

  return (
    <div>
      <button onClick={() => listNotifications()}>list notifications</button>
      <button onClick={() => listNotificationsWithLimit()}>
        list notifications with limit
      </button>

      <button onClick={async () => await novu.notifications.readAll()}>
        mark all as read
      </button>
      <button
        onClick={async () => {
          const archiveAll = await novu.notifications.archiveAll();
          console.log("archiveAll", archiveAll);
        }}
      >
        mark all as archived
      </button>
      <button onClick={async () => await novu.notifications.archiveAllRead()}>
        mark all read as archived
      </button>

      {notifications?.length !== 0 &&
        notifications?.map((notification: any) => {
          return (
            <div key={notification.id}>
              {notification.body} |||{" "}
              <button
                onClick={() =>
                  handleNotificationRead(notification.id, notification.isRead)
                }
              >
                mark as {notification.isRead ? "unread" : "read"}
              </button>
              |||{" "}
              <button
                onClick={() =>
                  handleNotificationArchived(
                    notification.id,
                    notification.isArchived
                  )
                }
              >
                mark as {notification.isArchived ? "unarchive" : "archive"}
              </button>
              <button onClick={() => handleNotification(notification)}>
                mark as {notification.isRead ? "unread" : "read"}
              </button>
            </div>
          );
        })}
    </div>
  );
};
