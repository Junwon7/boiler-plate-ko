const {User} = require('../models/User');  // 대문자 


let auth = (req, res, next) => {


    // 인증처리 하는곳

    //클라이언트 쿠키에서 토큰 가져온다
    let token = req.cookies.x_auth;

    // 토큰을 복화화 한후 유저을 찾는다
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error:true})

        req.token = token; // index 에서 사용하기 위해 (밖에서 )
        req.user = user;
        next(); 
    })

    // 유저가 있으면 인증 

    // 유저가 없으면 노인증

}

module.exports = { auth };