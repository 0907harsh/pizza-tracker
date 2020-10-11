const path=require('path')
// const dotenv=require('dotenv')
// const result=dotenv.config({path:'./config/.env'})
const http=require('http')
const express=require('express')
var expressLayouts=require('express-ejs-layouts')
// require('./db/mongoose')

const app=express()
const ejs= require('ejs')
const server=http.createServer(app)

//Remember the layout must be ont the top of the render engine as it help the ejs layout preprocess the fiels befor the render
// Routes Start Here
const webRouter= require('./routes/web')
app.use(webRouter)

//Setting Up template engine
app.set('views',path.join(__dirname,'../templates/views/'))
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'../public')))



//Setting up the port to use the port provided by the environment
//Starting the server and listening on the dedicated port
const port = process.env.PORT|| 3000
server.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})


// var cookieParser = require('cookie-parser');
// const adminauth = require('./middleware/adminauth')
// const loginauth = require('./middleware/loginauth')

// //Defne path for Express config
// const viewsPath=path.join(__dirname,'../templates/views')
// const partialsPath=path.join(__dirname,'../templates/partials')


// //Setup handlebars engine and viesws locations
// app.set('view engine','hbs')
// app.set('views',viewsPath)

// //Partials path setup
// hbs.registerPartials(partialsPath)

// //Setup static directory to serve
// app.use(express.static(path.join(__dirname,'../public')))
// app.use(require("body-parser").json())
// app.use(cookieParser());