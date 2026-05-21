import { io, Socket } from "socket.io-client";
import { AppDispatch } from "../../app/store";
import { addNotification } from "./notificationSlice";
import { INotification } from "../../types/notificationTypes";

/**
 * Singleton socket instance
 */
let socket: Socket | null = null;

/**
 * Initialize socket connection
 */
export const initNotificationSocket = (token: string) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: {
      token,
    },
    transports: ["websocket"],
  });

  return socket;
};

/**
 * Connect socket listeners
 */
export const listenNotificationEvents = (dispatch: AppDispatch) => {
  if (!socket) return;

  /**
   * New notification event
   */
  socket.on("notification:new", (data: INotification) => {
    dispatch(addNotification(data));
  });

  /**
   * Optional: assignment events (mapped into notifications)
   */
  socket.on("assignment:created", (data: INotification) => {
    dispatch(addNotification(data));
  });

  socket.on("assignment:submitted", (data: INotification) => {
    dispatch(addNotification(data));
  });

  socket.on("assignment:graded", (data: INotification) => {
    dispatch(addNotification(data));
  });

  /**
   * Course enrollment events
   */
  socket.on("course:enrolled", (data: INotification) => {
    dispatch(addNotification(data));
  });

  socket.on("course:completed", (data: INotification) => {
    dispatch(addNotification(data));
  });

  /**
   * System alerts
   */
  socket.on("system:alert", (data: INotification) => {
    dispatch(addNotification(data));
  });
};

/**
 * Disconnect socket safely
 */
export const disconnectNotificationSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};