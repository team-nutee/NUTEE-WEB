const client = require('cheerio-httpcli');
let crawlresult = [];

const crawl = (className1, category, url) => new Promise((resolve)=>{
    client.fetch(url, {},(err, $, res, body)=>{
        let bachelor_notice = [];

        let list = $(className1);
        let results = list.find('a').text();
        bachelor_notice.push(category+results);

        resolve(bachelor_notice);
    });
});

crawl(".left15",
    '학사공지: ',
    'http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51')
    .then(result =>{
        crawlresult[0] = result;
    });

crawl(".left15",
    "수업공지: ",
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53")
    .then(result =>{
        crawlresult[1] = result;
    });

crawl(".left15",
    '학점교류: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89")
    .then(result =>{
        crawlresult[2] = result;
    });

crawl(".left15",
    '장학공지: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75")
    .then(result =>{
        crawlresult[3] = result;
    });

crawl(".left15",
    '일반공지: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007")
    .then(result =>{
        crawlresult[4] = result;
    });

crawl(".left15",
    '행사공지: ',
    "http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008")
    .then(result =>{
        crawlresult[5] = result;
    });

module.exports = crawlresult;