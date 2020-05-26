const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type:Number,
        default:0
    },
    image: String,
    token: {
        type: String

    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function(next){
    // 비밀번호 암호화  시킨다 

    var user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(saltRounds, function(err, salt) {

            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });

    }else{
        next()   // ??
    }


})


userSchema.methods.comparePassword = function(plainPassword, cb){


    console.log('comparePassword', plainPassword); 
    //console.log('err', err);
    //console.log('isMatch', isMatch);

    //plainPassword 1234567   암호화 해서 디비와 비교  (암호화된 것 복호화 안됨)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        
        if(err) return cb(err)        
        cb(null, isMatch)

    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this; 
    // jsonwebtoken을 이용해서 token을 생성하기
    // _id 몽고 디비 아이디 
    // user._id + secretToken  = >  Token 
    console.log('user._id', user._id);

    var token = jwt.sign(user._id.toHexString(), 'secretToken' );  // Expected "playload" to be a plain object.
    //var token = jwt.sign(user._id, 'secretToken' );  // Expected "playload" to be a plain object.
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    
    // 토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function(err, decode){
        // 유저 아이디를 이용해서 유저을 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);

        })
    })
}



const User = mongoose.model('User', userSchema)

module.exports = {User}