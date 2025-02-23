const app = require('./app.js');

const PORT = 6005 ;

app.listen(PORT , ()=>{
    console.log("Server is running Port " + PORT);
})