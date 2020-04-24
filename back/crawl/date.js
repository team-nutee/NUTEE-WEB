const client = require('cheerio-httpcli');
let crawlresult = [];

const crawl = (className, category, url) => new Promise((resolve)=> { // 날짜
    client.fetch(url, {}, (err, $, res, body) => {
        let notice_date = [];

        let dateList = $(className);

        notice_date.push(category + dateList.text());

        resolve(notice_date);
    })
});

// 학사
crawl("table.board_list tr td:nth-child(5)",
    '학사공지: ',
    'http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51')
    .then(result =>{
        crawlresult[0] = result;
    });

// 수업
crawl("table.board_list tr td:nth-child(5)",
    '수업공지: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53")
    .then(result =>{
        crawlresult[1] = result;
    });

// 학점
crawl("table.board_list tr td:nth-child(5)",
    '학점교류: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89")
    .then(result =>{
        crawlresult[2] = result;
    });

// 장학
crawl("table.board_list tr td:nth-child(5)",
    '장학공지: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75")
    .then(result =>{
        crawlresult[3] = result;
    });

// 일반
crawl("table.board_list tr td:nth-child(5)",
    '일반공지: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007")
    .then(result =>{
        crawlresult[4] = result;
    });

// 행사
crawl("table.board_list tr td:nth-child(5)",
    '행사공지: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008")
    .then(result =>{
        crawlresult[5] = result;
    });


module.exports = crawlresult;