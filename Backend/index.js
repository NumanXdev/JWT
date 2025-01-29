const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
require("dotenv").config();

const app = express();
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

  app.use(
    cors({
      origin: "https://jwt-drab.vercel.app", // Your frontend URL
      credentials: true, // Allow cookies and credentials
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
    })
  );

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", true);
app.use("/", authRoute);

app.get("/good", (req, res) => {
  res.send("good");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
