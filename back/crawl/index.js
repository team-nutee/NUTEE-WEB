const client = require('cheerio-httpcli');
let crawlresult = [];

const crawl = (className1, category, url) => new Promise((resolve)=>{
    client.fetch(url, {},(err, $, res, body)=>{
        let bachelor_notice = [];
        let tag = $(className1);

        let num = []; // 공지 No.
        let list = []; // 공지 제목

        bachelor_notice.push(category);
        tag.each(function(i, elem) {
            num[i] = $(this).children('td:first-child').text();
            list[i] = $(this).find('a').text();

            bachelor_notice.push(num[i]);
            bachelor_notice.push(list[i]);
        });

        resolve(bachelor_notice);
    });
});

crawl(".board_list tbody tr",
    '학사공지',
    'http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51')
    .then(result =>{
        crawlresult[0] = result;
    });

crawl(".board_list tbody tr",
    "수업공지",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53")
    .then(result =>{
        crawlresult[1] = result;
    });

crawl(".board_list tbody tr",
    '학점교류',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89")
    .then(result =>{
        crawlresult[2] = result;
    });

crawl(".board_list tbody tr",
    '장학공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75")
    .then(result =>{
        crawlresult[3] = result;
    });

crawl(".board_list tbody tr",
    '일반공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007")
    .then(result =>{
        crawlresult[4] = result;
    });

crawl(".board_list tbody tr",
    '행사공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008")
    .then(result =>{
        crawlresult[5] = result;
    });

module.exports = crawlresult;