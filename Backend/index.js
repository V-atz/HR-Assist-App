const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const slotRoutes = require("./routes/slotRoutes");
const connectToMongoDb = require("./connect");

//add mongodb url
const mongoUrl = "your_mongodb_url"

//middlewares
app.use(express.json());
app.use(cors());

//db connection
connectToMongoDb(mongoUrl).then(() =>
  console.log("Mongo Db connected successfully")
);

//routes
app.use("/api", slotRoutes);

//server
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});