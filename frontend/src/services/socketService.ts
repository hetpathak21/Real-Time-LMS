import { io, Socket } from "socket.io-client";

/* -------------------------------------------------------------------------- */
/*                              CUSTOM EVENTS                                 */
/* -------------------------------------------------------------------------- */

export interface SocketEvents {
  new_notification: {
    id: string;
    title: string;
    message: string;
  };

  assignment_created: {
    assignmentId: string;
    courseId: string;
  };

  submission_received: {
    submissionId: string;
    studentId: string;
  };
}

/* -------------------------------------------------------------------------- */
/*                              SOCKET INSTANCE                               */
/* -------------------------------------------------------------------------- */

let socket: Socket | null = null;

/* -------------------------------------------------------------------------- */
/*                            INITIALIZE SOCKET                               */
/* -------------------------------------------------------------------------- */

export const initSocket = (token: string): Socket => {
  socket = io(import.meta.env.VITE_SOCKET_URL as string, {
    auth: { token },
    transports: ["websocket"],
  });

  return socket;
};

/* -------------------------------------------------------------------------- */
/*                             GET SOCKET                                     */
/* -------------------------------------------------------------------------- */

export const getSocket = (): Socket | null => socket;

/* -------------------------------------------------------------------------- */
/*                           DISCONNECT SOCKET                                */
/* -------------------------------------------------------------------------- */

export const disconnectSocket = (): void => {
  socket?.disconnect();
  socket = null;
};

/* -------------------------------------------------------------------------- */
/*                              ROOM JOIN                                     */
/* -------------------------------------------------------------------------- */

export const joinUserRoom = (userId: string): void => {
  socket?.emit("join_user_room", userId);
};

/* -------------------------------------------------------------------------- */
/*                         SAFE EVENT LISTENING                               */
/* -------------------------------------------------------------------------- */

/**
 * Custom typed event listener
 * (Avoids Socket.IO internal typing conflicts)
 */
export const onEvent = <T extends keyof SocketEvents>(
  event: T,
  callback: (data: SocketEvents[T]) => void
): void => {
  socket?.on(event as string, callback as (data: unknown) => void);
};

/**
 * Remove event listener
 */
export const offEvent = <T extends keyof SocketEvents>(
  event: T
): void => {
  socket?.off(event as string);
};