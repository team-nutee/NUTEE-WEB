const express = require('express');
const router = express.Router();

const index1 = require('../crawl/index');
const href = require('../crawl/href');

router.get('/content',async(req,res,next)=>{
    try{
        let content = await index1;
        res.json(content);
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.get('/href', async(req,res,next)=>{
    try{
        let hrefs = await href;
        res.json(hrefs);
    }catch(err){
        console.error(err);
        next(err);
    }
});
module.exports = router;