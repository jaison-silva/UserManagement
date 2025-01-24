import jwt from 'jsonwebtoken';

export const userTokenAuthenticator = (req,res,next) =>{
    const jwtToken = req.cookies.userAuthJwt;
    console.log("UserAuth middleware reached")

    if(!jwtToken){
        console.log("no token so returned to login")
        return res.status(200).json({message: "no user token", redirect : "/"})
    }

    try{
        req.user = jwt.verify(jwtToken,process.env.JWT_SECRET)
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

export const AdminTokenAuthenticator = (req,res,next) =>{
    const jwtToken = req.cookies.adminAuthJwt
    // console.log("admin auth",adminEmail)

    if(!jwtToken){
        console.log("no token so returned to login")
        return res.status(200).json({message: "no user token", redirect : "/"})
    }

    try{
        req.admin = jwt.verify(jwtToken,process.env.JWT_SECRET)
        console.log("admin auth passed next")
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}