import WebSocket from "ws";

export class ConnectionSchema {
  constructor(webSocket, type) {
    this.webSocket = webSocket;
    this.type = type;
  }
}
