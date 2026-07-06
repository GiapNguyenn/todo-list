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

app.set('views', `${__dirname}/views`);
app.set("views", "./views");

  // flash 
    app.use(cookieParser('KeyBatKy'));
    app.use(session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
  // End flash 

  //tinyMCE
  app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
  //end tinyMCE

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // App local Variables 
  const systemConfig=require("./config/systems")
  app.locals.prefixAdmin =systemConfig.perfixAdmin

  app.use(express.static(`${__dirname}/public`))
  
    // Routers 
  route(app);
  routeAdmin(app);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })