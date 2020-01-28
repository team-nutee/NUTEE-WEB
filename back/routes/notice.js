const express = require('express');
const router = express.Router();

const index1 = require('../crawl/index');

router.get('/',async(req,res,next)=>{
    try{
        let crawlresult = await index1;
        res.json(crawlresult);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;