const express = require('express');
const router = express.Router();

const index1 = require('../crawl/index');
const index2 = require('../crawl/index2');
const index3 = require('../crawl/index3');
const index4 = require('../crawl/index4');
const index5 = require('../crawl/index5');
const index6 = require('../crawl/index6');

router.get('/',async(req,res,next)=>{
    try{
        let crawlresult = {
            'crawl1': await index1.then((result)=>{
                return result;
            }),
            'crawl2': await index2.then((result)=>{
                return result;
            }),
            'crawl3':await index3.then((result)=>{
                return result;
            }),
            'crawl4':await index4.then((result)=>{
                return result;
            }),
            'crawl5': await index5.then((result)=>{
                return result;
            }),
            'crawl6':await index6.then((result)=>{
                return result;
            }),
        };
        res.json(crawlresult);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;