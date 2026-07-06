const express = require('express');
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const path = require("path");
const app = express();

  require("dotenv").config();
  const port = process.env.PORT;

    //cấu hình connect
  const database = require("./config/database")
  database.connect()

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));

  // App local Variables 
  const systemConfig=require("./config/systems")
  app.locals.prefixAdmin =systemConfig.perfixAdmin
  
    // Routers 
  route(app);
  routeAdmin(app);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })