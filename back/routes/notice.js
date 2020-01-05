const express = require('express');
const router = express.Router();

const index1 = require('../crawl/index');
const index2 = require('../crawl/index2');
const index3 = require('../crawl/index3');
const index4 = require('../crawl/index4');
const index5 = require('../crawl/index5');
const index6 = require('../crawl/index6');

router.get('/',(req,res,next)=>{
    let constresult = {};
    index1.then((results)=>{
        console.log(results);
         constresult.a = results;
        index2.then((results)=>{
            constresult.b = results;
            index3.then((results)=>{
                constresult.c = results;
                index4.then((results)=>{
                    constresult.d = results;
                    index5.then((results)=>{
                        constresult.e = results;
                        index6.then((results)=>{
                            constresult.f = results;
                        });
                    });
                });
            });
        });
    });
    setTimeout(()=>{
        console.log(constresult.a);
        console.log(constresult.b);
        console.dir("constresult는"+constresult.toLocaleString());
        return res.json(constresult);
    },500);
});

module.exports = router;