const express = require('express');
const router = express.Router();

router.get('/:id',async(req,res,next)=>{
    try{

    }catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;