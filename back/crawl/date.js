const client = require('cheerio-httpcli');
let crawlresult = [];

const crawl = (className1, category, url) => new Promise((resolve)=> { // 날짜
    client.fetch(url, {}, (err, $, res, body) => {
        let notice_date = [];
        let tag = $(className1);

        let list = [];

        notice_date.push(category);
        tag.each(function(i, elem) {

            list[i] = $(this).children('td:nth-child(5)').text();
            notice_date.push(list[i]);
        });

        resolve(notice_date);
    })
});

// 학사
crawl(".board_list tr",
    '학사공지',
    'http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51')
    .then(result =>{
        crawlresult[0] = result;
    });

// 수업
crawl(".board_list tr",
    '수업공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53")
    .then(result =>{
        crawlresult[1] = result;
    });

// 학점
crawl(".board_list tr",
    '학점교류',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89")
    .then(result =>{
        crawlresult[2] = result;
    });

// 장학
crawl(".board_list tr",
    '장학공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75")
    .then(result =>{
        crawlresult[3] = result;
    });

// 일반
crawl(".board_list tr",
    '일반공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007")
    .then(result =>{
        crawlresult[4] = result;
    });

// 행사
crawl(".board_list tr",
    '행사공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008")
    .then(result =>{
        crawlresult[5] = result;
    });


module.exports = crawlresult;