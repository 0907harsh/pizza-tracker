const mongoose=require('mongoose')
// const validator=require('validator')
// process.env.MONGODB_URL
url = 'mongodb://localhost/pizza-tracker';
mongoose.connect(url,{
    useNewUrlParser:true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify:false
})

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('Database connected ... ')
    
}).catch(err =>{
    console.log('Connection failed ... ')
})

module.exports = connection