exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        next();//next 를하면 다음 미들웨어로
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();//next 를하면 다음 미들웨어로
    } else {
        res.status(401).send('현재 로그인 중입니다.');
    }
};