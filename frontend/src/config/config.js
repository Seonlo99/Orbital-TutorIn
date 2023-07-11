const rootUrl =
  process.env.NODE_ENV === "production"
    ? "https://tutorin-api.vercel.app"
    : "http://localhost:5000";

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://tutorin-socketio-l65k-dev.fl0.io"
    : "ws://localhost:8900";

export { rootUrl, SOCKET_URL };
