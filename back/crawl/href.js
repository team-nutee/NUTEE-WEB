const client = require('cheerio-httpcli');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

let crawlresult = [];

new Promise((resolve)=>{ // 학사 공지
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    let bachelor_notice = {};

    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle').innerHTML; // 학사 공지 공지
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    bachelor_notice.bachelor_notice = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML; // 학사공지 1
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    bachelor_notice.bachelor_0 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle').innerHTML;  // 학사공지 2
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    bachelor_notice.bachelor_1 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle').innerHTML;  // 학사공지 3
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    bachelor_notice.bachelor_2 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle').innerHTML;  // 학사공지 4
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    bachelor_notice.bachelor_3 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle').innerHTML;  // 학사공지 5
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    bachelor_notice.bachelor_4 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    crawlresult[0] = bachelor_notice;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    let class_notice = {};

    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML; // 1번 공지
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    class_notice.class_0 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle').innerHTML;  // 2번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    class_notice.class_1 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle').innerHTML;  // 3번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    class_notice.class_2 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle').innerHTML;  // 4번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    class_notice.class_3 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle').innerHTML;  // 5번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    class_notice.class_4 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle').innerHTML;  // 6번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    class_notice.class_notice_5 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    crawlresult[1] = class_notice;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    let credit_exchange_notice = {};
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle').innerHTML; // [공지] 부분
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    credit_exchange_notice.credit_exchange_notice  = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML; // 1번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    credit_exchange_notice.credit_exchange_0  = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle').innerHTML; // 2번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    credit_exchange_notice.credit_exchange_1  = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle').innerHTML; // 3번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    credit_exchange_notice.credit_exchange_2  = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle').innerHTML; // 4번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    credit_exchange_notice.credit_exchange_3  = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle').innerHTML; // 5번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    credit_exchange_notice.credit_exchange_4  = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    crawlresult[2] = credit_exchange_notice;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    let scholarship_notice = {};
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle').innerHTML; // [공지] 부분
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    scholarship_notice.scholarship_notice = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML; // 1번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    scholarship_notice.scholarship_0 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle').innerHTML; // 2번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    scholarship_notice.scholarship_1 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle').innerHTML; // 3번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    scholarship_notice.scholarship_2 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle').innerHTML; // 4번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    scholarship_notice.scholarship_3 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle').innerHTML; // 5번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    scholarship_notice.scholarship_4 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}&${resultsplit[3]}`;

    crawlresult[3] = scholarship_notice;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    let general_notice = {};
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle').innerHTML; // [공지] 부분
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    general_notice.general_notice= `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML; // 1번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    general_notice.general_0 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle').innerHTML; // 2번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    general_notice.general_1 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle').innerHTML; // 3번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    general_notice.general_2 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle').innerHTML; // 4번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    general_notice.general_3 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle').innerHTML; // 5번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    general_notice.general_4 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    crawlresult[4] = general_notice;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008", {},(err, $, res, body)=>{
        var body = $.html();
        results = body;
        resolve(results);
    });
}).then((result)=>{
    let event_notice = {};
    const dom = new JSDOM(result);
    let check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle').innerHTML; // [공지] 부분
    let str1 = check.indexOf('?');
    let str2 = check.indexOf('\"',str1+1);
    let beforeresult = check.substring(str1,str2);
    let resultsplit = beforeresult.split('&amp;');
    event_notice.event_notice = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle').innerHTML; // 1번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    event_notice.event_0 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle').innerHTML; // 2번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    event_notice.event_1 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle').innerHTML; // 3번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    event_notice.event_2 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle').innerHTML; // 4번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    event_notice.event_3 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    check = dom.window.document.getElementById('ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle').innerHTML; // 5번 공지
    str1 = check.indexOf('?');
    str2 = check.indexOf('\"',str1+1);
    beforeresult = check.substring(str1,str2);
    resultsplit = beforeresult.split('&amp;');
    event_notice.event_4 = `http://www.skhu.ac.kr/board/boardread.aspx${resultsplit[0]}&${resultsplit[1]}&${resultsplit[2]}`;

    crawlresult[5] = event_notice;
});

module.exports = crawlresult;