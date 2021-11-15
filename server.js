const express = require("express");
const { notFound } = require("./middleware/notFound.js");
const { serverError } = require("./middleware/serverError.js");
const app = express();
const { PORT = 3000 } = process.env;
const appRouter = require("./router.js");

//setup
app.use(express.json());

// routes
app.use("/api/v1/", appRouter);

//middleware
app.use(notFound);
app.use(serverError);
// run server
app.listen(PORT, () => {
  console.clear();
  console.log(`server is running on http://localhost:${PORT}`);
});
