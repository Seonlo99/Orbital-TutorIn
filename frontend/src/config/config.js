const rootUrl =
  process.env.NODE_ENV === "production"
    ? "https://tutorin-api.vercel.app"
    : "http://localhost:5000";

export { rootUrl };
