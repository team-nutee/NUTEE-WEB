const express = require('express');
const router = express.Router();

const index1 = require('../crawl/index');
const href = require('../crawl/href');
const date = require('../crawl/date');

router.get('/',async(req,res,next)=>{
    try{
        let crawlresult = {
            content: index1,
            hrefs: href,
            date: date,
        };
        res.json(crawlresult);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;