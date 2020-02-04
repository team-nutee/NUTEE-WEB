const client = require('cheerio-httpcli');

let crawlresult = [];

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51", {},(err, $, res, body)=>{
        const list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle");
        const results = list.find('a').text();
        resolve(results);
    });
}).then((result)=>{
    crawlresult[0] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53",{},(err,$,res,body)=>{
        const list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle");
        const results = list.find('a').text();
        resolve(results);
    });
}).then((result)=>{
    crawlresult[1] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89",{},(err,$,res,body)=>{
        const list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle");
        const results = list.find('a').text();
        resolve(results);
    });
}).then((result)=>{
    crawlresult[2] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75",{},(err,$,res,body)=>{
        const list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle");
        const results = list.find('a').text();
        resolve(results);
    });
}).then((result)=>{
    crawlresult[3] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007",{},(err,$,res,body)=>{
        const list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle");
        const results = list.find('a').text();
        resolve(results);
    });
}).then((result)=>{
    crawlresult[4] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008",{},(err,$,res,body)=>{
        const list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle");
        const results = list.find('a').text();
        resolve(results);
    });
}).then((result)=>{
    crawlresult[5] = result;
});


module.exports = crawlresult;