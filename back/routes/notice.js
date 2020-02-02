const express = require('express');
const router = express.Router();

const index1 = require('../crawl/index');
const href = require('../crawl/href');

router.get('/',async(req,res,next)=>{
    try{
        let crawlresult = {
            content: await index1,
            hrefs: await href
        };
        res.json(crawlresult);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;