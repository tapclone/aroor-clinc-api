const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const db = require("./config/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(session({ secret: "key", cookie: { maxAge: 6000000 } }));
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 8000;
db.connect((err) => {
  if (err) {
    console.log("connection error" + err);
  } else {
    console.log("database connected");
  }
});
app.listen(PORT, console.log(`server started on PORT ${PORT}`));
