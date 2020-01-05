const client = require('cheerio-httpcli');
module.exports = new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53",{},(err,$,res,body)=>{
        const list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle");
        const results = list.find('a').text();
        resolve(results);
    });
});