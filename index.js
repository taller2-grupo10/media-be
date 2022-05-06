import "./database.js";
import app from "./app.js";

// Assign the PORT to our app
app.listen(app.get("port"), () =>
  console.log(`[APP] Server Running successfully`),
);
