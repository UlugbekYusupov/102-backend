const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");

app.use(express.json());
app.use(cors());

app.use("/auth", userRoute);
app.use("/project", projectRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
