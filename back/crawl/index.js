const client = require('cheerio-httpcli');

let crawlresult = [];

new Promise((resolve)=>{ // 학사
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10004&searchBun=51", {},(err, $, res, body)=>{
        let bachelor_notice = {};

        let list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle"); // [공지]부분
        let results = list.find('a').text();
        bachelor_notice.bechelor_notice = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle"); // 공지제외 1번
        bachelor_notice.bechelor_0 = list.find('a').text();

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle"); // 공지제외 2번
        bachelor_notice.bechelor_1 = list.find('a').text();

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle"); // 공지제외 3번
        bachelor_notice.bechelor_2 = list.find('a').text();

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle"); // 공지제외 4번
        bachelor_notice.bechelor_3 = list.find('a').text();

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle"); // 공지제외 5번
        bachelor_notice.bechelor_4 = list.find('a').text();
        resolve(bachelor_notice);
    });
}).then((result)=>{
    crawlresult[0] = result;
});

new Promise((resolve)=>{ // 수업
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10005&searchBun=53",{},(err,$,res,body)=>{
        let class_notice = {};
        let list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle"); // 1번 공지
        let results = list.find('a').text();
        class_notice.class_notice_0 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle");  // 2번 공지
        results = list.find('a').text();
        class_notice.class_notice_1 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle");  // 3번 공지
        results = list.find('a').text();
        class_notice.class_notice_2 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle");  // 4번 공지
        results = list.find('a').text();
        class_notice.class_notice_3 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle");  // 5번 공지
        results = list.find('a').text();
        class_notice.class_notice_4 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl05_lblTitle");  // 6번 공지
        results = list.find('a').text();
        class_notice.class_notice_5 = results;

        resolve(class_notice);
    });
}).then((result)=>{
    crawlresult[1] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10038&searchBun=89",{},(err,$,res,body)=>{
        let credit_exchange_notice = {};
        let list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle"); // [공지] 부분
        let results = list.find('a').text();
        credit_exchange_notice.credit_exchange_notice = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle"); // 공지 제외 1번
        results = list.find('a').text();
        credit_exchange_notice.credit_exchange_0 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle"); // 공지 제외 2번
        results = list.find('a').text();
        credit_exchange_notice.credit_exchange_1 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle"); // 공지 제외 3번
        results = list.find('a').text();
        credit_exchange_notice.credit_exchange_2 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle"); // 공지 제외 4번
        results = list.find('a').text();
        credit_exchange_notice.credit_exchange_3 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle"); // 공지 제외 5번
        results = list.find('a').text();
        credit_exchange_notice.credit_exchange_4 = results;

        resolve(credit_exchange_notice);
    });
}).then((result)=>{
    crawlresult[2] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10006&searchBun=75",{},(err,$,res,body)=>{
        let scholarship_notice = {};
        let list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle"); // [공지] 부분
        let results = list.find('a').text();
        scholarship_notice.scholarship_notice = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle"); // 공지 제외 1번
        results = list.find('a').text();
        scholarship_notice.scholarship_0 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle"); // 공지 제외 2번
        results = list.find('a').text();
        scholarship_notice.scholarship_1 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle"); // 공지 제외 3번
        results = list.find('a').text();
        scholarship_notice.scholarship_2 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle"); // 공지 제외 4번
        results = list.find('a').text();
        scholarship_notice.scholarship_3 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle"); // 공지 제외 5번
        results = list.find('a').text();
        scholarship_notice.scholarship_4 = results;

        resolve(scholarship_notice);
    });
}).then((result)=>{
    crawlresult[3] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10007",{},(err,$,res,body)=>{
        let general_notice = {};
        let list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle"); // [공지] 부분
        let results = list.find('a').text();
        general_notice.general_notice = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle"); // 공지 제외 1번
        results = list.find('a').text();
        general_notice.general_0 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle"); // 공지 제외 2번
        results = list.find('a').text();
        general_notice.general_1 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle"); // 공지 제외 3번
        results = list.find('a').text();
        general_notice.general_2 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle"); // 공지 제외 4번
        results = list.find('a').text();
        general_notice.general_3 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle"); // 공지 제외 5번
        results = list.find('a').text();
        general_notice.general_4 = results;

        resolve(general_notice);
    });
}).then((result)=>{
    crawlresult[4] = result;
});

new Promise((resolve)=>{
    client.fetch("http://www.skhu.ac.kr/board/boardlist.aspx?bsid=10008",{},(err,$,res,body)=>{
        let event_notice = {};
        let list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList2_ctl00_lblTitle"); // [공지] 부분
        let results = list.find('a').text();
        event_notice.event_notice = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl00_lblTitle"); // 공지 제외 1번
        results = list.find('a').text();
        event_notice.event_0 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl01_lblTitle");// 공지 제외 2번
        results = list.find('a').text();
        event_notice.event_1 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl02_lblTitle"); // 공지 제외 3번
        results = list.find('a').text();
        event_notice.event_2 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl03_lblTitle"); // 공지 제외 4번
        results = list.find('a').text();
        event_notice.event_3 = results;

        list = $(".left15 #ctl00_ContentPlaceHolder1_ctl00_rptList_ctl04_lblTitle"); // 공지 제외 5번
        results = list.find('a').text();
        event_notice.event_4 = results;

        resolve(event_notice);
    });
}).then((result)=>{
    crawlresult[5] = result;
});


module.exports = crawlresult;