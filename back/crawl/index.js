const client = require('cheerio-httpcli');
let crawlresult = [];

const crawl = (className1,className2,className3,className4,className5,className6,className7, className8, className9,
               className10, className11, className12, className13, className14,className15, url) => new Promise((resolve)=>{
    client.fetch(url, {},(err, $, res, body)=>{
        let bachelor_notice = [];

        let list = $(className1); // [공지]부분
        let results = list.find('a').text();
        bachelor_notice.push(results);

        list = $(className2);
        bachelor_notice.push(list.find('a').text());

        list = $(className3);
        bachelor_notice.push(list.find('a').text());

        list = $(className4);
        bachelor_notice.push(list.find('a').text());

        list = $(className5);
        bachelor_notice.push(list.find('a').text());

        list = $(className6);
        bachelor_notice.push(list.find('a').text());

        list = $(className7);
        bachelor_notice.push(list.find('a').text());

        list = $(className8);
        bachelor_notice.push(list.find('a').text());

        list = $(className9);
        bachelor_notice.push(list.find('a').text());

        list = $(className10);
        bachelor_notice.push(list.find('a').text());

        list = $(className11);
        bachelor_notice.push(list.find('a').text());

        list = $(className12);
        bachelor_notice.push(list.find('a').text());

        list = $(className13);
        bachelor_notice.push(list.find('a').text());

        list = $(className14);
        bachelor_notice.push(list.find('a').text());

        list = $(className15);
        bachelor_notice.push(list.find('a').text());
        resolve(bachelor_notice);
    });
});

crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl05_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl06_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl07_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl08_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl09_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl10_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    'http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51')
    .then(result =>{
        crawlresult[0] = result;
    });

crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl06_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl07_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl08_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl09_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl10_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl11_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl12_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl13_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl14_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53")
    .then(result =>{
        crawlresult[1] = result;
    });

crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl06_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl07_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl08_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl09_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl10_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl11_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl12_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl13_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89")
    .then(result =>{
        crawlresult[2] = result;
    });

crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl05_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl06_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl07_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl08_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75")
    .then(result =>{
        crawlresult[3] = result;
    });

crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl05_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl06_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl06_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl07_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007")
    .then(result =>{
        crawlresult[4] = result;
    });

crawl(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl06_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl07_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl08_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl09_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl10_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl11_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl12_lblTitle",
    ".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl13_lblTitle",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008")
    .then(result =>{
        crawlresult[5] = result;
    });

module.exports = crawlresult;