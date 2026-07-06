const express = require('express');
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const methodOverride = require("method-override");
const flash = require('express-flash')
  const cookieParser = require('cookie-parser')
  const session = require('express-session')
const path = require("path");
const app = express();

  app.use(methodOverride('_method'))
  require("dotenv").config();
  const port = process.env.PORT;

    //cấu hình connect
  const database = require("./config/database")
  database.connect()

app.set("view engine", "pug");
app.set("views", "./views");

  // flash 
    app.use(cookieParser('KeyBatKy'));
    app.use(session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
  // End flash 

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