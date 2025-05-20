const express = require('express');
const connectDb = require('./config/db-config');
const app = express();
const PORT = process.env.PORT || 5000;
connectDb();
app.use(express.json());
app.use("/api/contacts", require("./routes/Contact-routes"))
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})