const express = require("express");
const colors = require('colors');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { ErrorHandler } = require("./middleware/error-middleware");
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/users-routes"));
app.use("/api/pagecontents", require("./routes/page-content-routes"));
app.use("/api/projects", require("./routes/projects-routes"));
app.use("/api/skills", require("./routes/skills-routes"));
app.use("/api/account", require("./routes/account-routes"));

app.use(ErrorHandler);
app.listen(port, () => console.log(`Server listening on port : ${port}`));
