const express = require('express');
const router = express.Router();

const puppeteer = require('puppeteer');

router.get('/', async (req,res,next)=>{
    try{
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--window-size=1920,1080', '--disable-notifications'],
            userDataDir: 'User_Data',
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1080,
            height: 1080,
        });
        await page.goto('https://instagram.com/cantuccio2019/');

        const newPost = await page.evaluate(() => {
            const article = document.querySelector('article:first-child');
            const img = article.querySelector('.KL4Bh img') && article.querySelector('.KL4Bh img').src;
            return {
                img,
            }
        });

        res.status(200).json({
            img: newPost.img,
        });
        await page.close();
        await browser.close();
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;