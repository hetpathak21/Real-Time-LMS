import { useEffect, useRef } from "react";
import {
  initSocket,
  disconnectSocket,
  joinUserRoom,
  onEvent,
  offEvent,
} from "../services/socketService";

import { getToken } from "../services/storageService";
import { SocketEvents } from "../services/socketService";

/**
 * Custom LMS socket hook
 */
export const useSocket = (userId?: string) => {
  const initialized = useRef(false);

  useEffect(() => {
    const token = getToken();

    if (!token || initialized.current) return;

    // Initialize socket connection
    initSocket(token);
    initialized.current = true;

    // Join user room for notifications
    if (userId) {
      joinUserRoom(userId);
    }

    return () => {
      disconnectSocket();
      initialized.current = false;
    };
  }, [userId]);

  /**
   * Subscribe to socket event
   */
  const listen = <K extends keyof SocketEvents>(
    event: K,
    callback: (data: SocketEvents[K]) => void
  ): void => {
    onEvent(event, callback);
  };

  /**
   * Unsubscribe from socket event
   */
  const unlisten = <K extends keyof SocketEvents>(event: K): void => {
    offEvent(event);
  };

  return {
    listen,
    unlisten,
  };
};