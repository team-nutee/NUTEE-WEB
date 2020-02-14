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
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    const results = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;
    console.log(results);
    crawlresult[0] = results;
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
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    const results = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;
    console.log(results);
    crawlresult[1] = results;
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
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    const results = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;
    console.log(results);
    crawlresult[2] = results;
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
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    const results = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;
    console.log(results);
    crawlresult[3] = results;
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
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    const results = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;
    console.log(results);
    crawlresult[4] = results;
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
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    const results = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;
    console.log(results);
    crawlresult[5] = results;
});

module.exports = crawlresult;