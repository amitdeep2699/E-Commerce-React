const jwt=require('jsonwebtoken')
function checkAuthUser(req,res,next){
    if(req.body.token){
        jwt.verify(req.body.token,process.env.ACCESS_TOKEN,(err,result)=>{
            if(err){
                res.status(401).json({error:'fail'});
            }else if(result){
                if(result.isVerified && result.isSeller==='user'){
                    req.Session=result;
                    // console.log(result);
                    next();
                }else if(!result.isVerified && result.isSeller==='user'){
                    res.status(401).json({error:'NotVerified'});
                }
                else{
                    res.status(401).json({error:'unauthorized'})
                }
            }
        });
    }else{
        res.status(401).json({error:'fail'});
    }
}
function checkAuthAdmin(req,res,next){
    if(req.body.token){
        jwt.verify(req.body.token,process.env.ACCESS_TOKEN,(err,result)=>{
            if(err){
                res.status(401).json({error:'fail'});
            }else if(result){
                if(result.isVerified && result.isSeller==='admin'){
                    req.Session=result;
                    // console.log(result);
                    next();
                }else if(!result.isVerified && result.isSeller==='admin'){
                    res.status(401).json({error:'NotVerified'});
                }
                else{
                    res.status(401).json({error:'unauthorized'})
                }
            }
        });
    }else{
        res.status(401).json({error:'fail'});
    }
}
function checkAuthSeller(req,res,next){
    if(req.body.token){
        jwt.verify(req.body.token,process.env.ACCESS_TOKEN,(err,result)=>{
            if(err){
                res.status(401).json({error:'fail'});
            }else if(result){
                if(result.isVerified && result.isSeller==='seller'){
                    req.Session=result;
                    // console.log(result);
                    next();
                }else if(!result.isVerified && result.isSeller==='seller'){
                    res.status(401).json({error:'NotVerified'});
                }
                else{
                    res.status(401).json({error:'unauthorized'})
                }
            }
        });
    }else{
        res.status(401).json({error:'fail'});
    }
}
module.exports={checkAuthUser:checkAuthUser,checkAuthAdmin:checkAuthAdmin,checkAuthSeller:checkAuthSeller}