import { io, type Socket } from "socket.io-client";

const BACKEND_BASE_URL = window.location.origin;
// const BACKEND_BASE_URL = import.meta.env.VITE_API_URL;

console.log("BACKEND_BASE_URL", BACKEND_BASE_URL);

class SocketService {
  public socket: Socket | null = null;

  public connect(accessToken: string) {
    if (this.socket?.connected) return this.socket;

    this.socket = io(`${BACKEND_BASE_URL}/chatting`, {
      auth: {
        token: accessToken,
      },
      transports: ["polling", "websocket"],
      timeout: 10_000,
    });

    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
