const client = require('cheerio-httpcli');
let crawlresult = [];

const crawl = (className1,className2,className3,className4,className5,className6,url) => new Promise((resolve)=>{ // 학사
    client.fetch(url, {},(err, $, res, body)=>{
        let bachelor_notice = [];

        let list = $(className1); // [공지]부분
        let results = list.find('a').text();
        bachelor_notice.push(results);

        list = $(className2); // 공지제외 1번
        bachelor_notice.push(list.find('a').text());

        list = $(className3); // 공지제외 2번
        bachelor_notice.push(list.find('a').text());

        list = $(className4); // 공지제외 3번
        bachelor_notice.push(list.find('a').text());

        list = $(className5); // 공지제외 4번
        bachelor_notice.push(list.find('a').text());

        list = $(className6); // 공지제외 5번
        bachelor_notice.push(list.find('a').text());
        resolve(bachelor_notice);
    });
});
//학사
crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    'http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51')
    .then(result =>{
        crawlresult[0] = result;
    });
//수업
crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53")
    .then(result =>{
        crawlresult[1] = result;
    });
//학점
crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89")
    .then(result =>{
        crawlresult[2] = result;
    });
//장학
crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75")
    .then(result =>{
        crawlresult[3] = result;
    });
//일반
crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007")
    .then(result =>{
        crawlresult[4] = result;
    });
//행사
crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008")
    .then(result =>{
        crawlresult[5] = result;
    });

module.exports = crawlresult;