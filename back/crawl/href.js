const client = require('cheerio-httpcli');
let crawlresult = [];

const crawl = (className1,category, url) => new Promise((resolve)=>{
    client.fetch(url, {},(err, $, res, body)=> {
        let notice = [];
        let tag = $(className1);

        let list = [];

        notice.push(category);
        tag.each(function(i, elem) {

            list[i] = $(this).find('a').attr('href');
            notice.push(`http://www.skhu.ac.kr/board/${list[i]}`);
        });

        resolve(notice);
    })
});

//학사
crawl(".left15 span",
    '학사공지',
    'http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51')
    .then(result =>{
        crawlresult[0] = result;
    });

//수업
crawl(".left15 span",
    '수업공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53")
    .then(result =>{
        crawlresult[1] = result;
    });

//학점
crawl(".left15 span",
    '학점교류',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89")
    .then(result =>{
        crawlresult[2] = result;
    });

//장학
crawl(".left15 span",
    '장학공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75")
    .then(result =>{
        crawlresult[3] = result;
    });

//일반
crawl(".left15 span",
    '일반공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007")
    .then(result =>{
        crawlresult[4] = result;
    });

//행사
crawl(".left15 span",
    '행사공지',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008")
    .then(result =>{
        crawlresult[5] = result;
    });

module.exports = crawlresult;