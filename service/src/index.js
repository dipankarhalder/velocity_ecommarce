/** Node modules */
import express from "express";

/** Initial express app */
const app = express();

app.use("/api", (req, res) => {
  res.status(201).json({
    message: "User logged-in successfully.",
  });
});

app.listen(3000, () => {
  console.log(`Server running: http://localhost:3000.`);
});
