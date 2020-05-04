const express = require('express');
const router = express.Router();

const index1 = require('../crawl/index');
const href = require('../crawl/href');
const no = require('../crawl/no');

router.get('/',async(req,res,next)=>{
    try{
        let crawlresult = {
            content: index1,
            hrefs: href,
            no: no
        };
        res.json(crawlresult);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;