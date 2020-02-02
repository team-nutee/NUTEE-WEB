const client = require('cheerio-httpcli');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

let crawlresult = [];

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML;
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let results = check.substring(str1,str2);
    console.log('http://www.skhu.ac.kr/board/boardread.aspx'+results);
    crawlresult[0] = 'http://www.skhu.ac.kr/board/boardread.aspx'+results;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML;
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let results = check.substring(str1,str2);
    console.log('http://www.skhu.ac.kr/board/boardread.aspx'+results);
    crawlresult[1] = 'http://www.skhu.ac.kr/board/boardread.aspx'+results;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML;
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let results = check.substring(str1,str2);
    console.log('http://www.skhu.ac.kr/board/boardread.aspx'+results);
    crawlresult[2] = 'http://www.skhu.ac.kr/board/boardread.aspx'+results;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML;
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let results = check.substring(str1,str2);
    console.log('http://www.skhu.ac.kr/board/boardread.aspx'+results);
    crawlresult[3] = 'http://www.skhu.ac.kr/board/boardread.aspx'+results;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML;
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let results = check.substring(str1,str2);
    console.log('http://www.skhu.ac.kr/board/boardread.aspx'+results);
    crawlresult[4] = 'http://www.skhu.ac.kr/board/boardread.aspx'+results;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML;
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let results = check.substring(str1,str2);
    console.log('http://www.skhu.ac.kr/board/boardread.aspx'+results);
    crawlresult[5] = 'http://www.skhu.ac.kr/board/boardread.aspx'+results;
});

module.exports = crawlresult;