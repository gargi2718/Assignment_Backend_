const express = require("express");
const rateLimit = require("express-rate-limit");
const { DBConnection } = require("./database/db");
const postRoutes = require("./routes/route");
const app = express();
const port = process.env.PORT || 8000;

//use database
DBConnection();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use router
app.use("/", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
