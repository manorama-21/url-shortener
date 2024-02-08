const express= require('express');
const app= express();
const urlRoute = require('./routes/router');
port=3000;
const path= require('path')

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use('/url',urlRoute)

app.use('/url/analytics',urlRoute)

app.listen(port,()=>{
    console.log(`server running ${port}`);
})

// app.get('/delete/:id',async(req,res)=>
// {
//         const {id}=req.params;
//     deleteURL =await URL.findByIdAndDelete({_id:id});
   
//     res.redirect('/')
// })
