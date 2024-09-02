import { notification } from "ant-design-vue";

interface NotificationType {
  type?: "success" | "error" | "info" | "warning";
  message: string;
  description: string;
  [key: string]: any;
}

export default function notificationWindow({
  type = "info",
  message,
  description,
}: NotificationType) {
  if (!["success", "error", "info", "warning"].includes(type)) {
    console.warn(`Unsupported notification type: ${type}`);
    type = "info"; // Дефолтное значение при неподдерживаемом типе
  }

  notification[type]({
    message,
    description,
    duration: 2,
    placement: "bottomRight",
  });
}
