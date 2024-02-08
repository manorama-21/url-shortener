const URL = require('../models/schema');
const shortid = require('shortid');
// ----controllers---

// ---get all user in the frontend---

const api=async(req,res)=>{
    const data=await URL.find({})
    res.json(data)
}

const allusers=async(req,res)=>{
    const all=await URL.find({});
    res.render('home',{
        urls:all
    })
}


// ---post or generate a short url---
const GeneratenewshortURL =async(req,res)=>{
    const body = req.body;
    const shortId =shortid();
    await URL.create({
        ShortID:shortId,
        RedirectURL:body.url,
        VisitedHistory:[],
    })
    res.redirect('/url')
}
const redirecttoOriginalPage =('/:shortid',async(req,res)=>{
    const ShortID =req.params.shortid;
    const entry = await URL.findOneAndUpdate({ShortID},{
        $push:{
            VisitedHistory:{
                timestamp:Date.now()
            }
        }
    })
    const address=entry.RedirectURL;
    res.redirect(address)
})

const Analytics=('/analytics/:shortid',async(req,res)=>{
    const ShortID =req.params.shortid;
    const result = await URL.findOne({ShortID})
    res.json({
        Totalclick:result.VisitedHistory.length,
    analytics:result.VisitedHistory
})

})

// ---exporting---
module.exports={GeneratenewshortURL,redirecttoOriginalPage,Analytics,allusers,api}