const client = require('cheerio-httpcli');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

let crawlresult = [];

const crawl = (className1,className2,className3,className4,className5,className6,url) => new Promise((resolve)=>{
    client.fetch(url, {},(err, $, res, body)=> {
        let notice = [];
        var body = $.html();
        let htmlbody = body;
        let dom = new JSDOM(htmlbody);
        let check = dom.window.document.getElementById(className1).innerHTML; // [공지]부분
        let str1 = check.indexOf('?');
        let str2 = check.indexOf('\"',str1+1);
        let beforeresult = check.substring(str1,str2);
        let resultsplit = beforeresult.split('&amp;');
        notice.push(`http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`);

        check = dom.window.document.getElementById(className2).innerHTML; // 공지제외 1번
        str1 = check.indexOf('?');
        str2 = check.indexOf('\"',str1+1);
        beforeresult = check.substring(str1,str2);
        resultsplit = beforeresult.split('&amp;');
        notice.push(`http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`);

        check = dom.window.document.getElementById(className3).innerHTML;  // 공지제외 2번
        str1 = check.indexOf('?');
        str2 = check.indexOf('\"',str1+1);
        beforeresult = check.substring(str1,str2);
        resultsplit = beforeresult.split('&amp;');
        notice.push(`http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`);

        check = dom.window.document.getElementById(className4).innerHTML;  // 공지제외 3번
        str1 = check.indexOf('?');
        str2 = check.indexOf('\"',str1+1);
        beforeresult = check.substring(str1,str2);
        resultsplit = beforeresult.split('&amp;');
        notice.push(`http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`);

        check = dom.window.document.getElementById(className5).innerHTML;  // 공지제외 4번
        str1 = check.indexOf('?');
        str2 = check.indexOf('\"',str1+1);
        beforeresult = check.substring(str1,str2);
        resultsplit = beforeresult.split('&amp;');
        notice.push(`http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`);

        check = dom.window.document.getElementById(className6).innerHTML;  // 공지제외 5번
        str1 = check.indexOf('?');
        str2 = check.indexOf('\"',str1+1);
        beforeresult = check.substring(str1,str2);
        resultsplit = beforeresult.split('&amp;');
        notice.push(`http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`);

        resolve(notice);
    })
});

//학사
crawl("ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    'http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51')
    .then(result =>{
        crawlresult[0] = result;
    });

//수업
crawl("ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53")
    .then(result =>{
        crawlresult[1] = result;
    });
//학점
crawl("ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89")
    .then(result =>{
        crawlresult[2] = result;
    });
//장학
crawl("ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75")
    .then(result =>{
        crawlresult[3] = result;
    });
//일반
crawl("ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007")
    .then(result =>{
        crawlresult[4] = result;
    });
//행사
crawl("ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    "ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008")
    .then(result =>{
        crawlresult[5] = result;
    });

module.exports = crawlresult;