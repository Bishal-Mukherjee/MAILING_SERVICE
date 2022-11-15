const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/mail", require("./routes/mail"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`sever listening on ${PORT}`);
});
