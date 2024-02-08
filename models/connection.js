const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DBforShortURLGen').then(()=>{
    console.log('MongoDB Connection')
}).catch((err)=>{
    console.log('error a gaya', err)
})
