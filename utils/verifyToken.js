import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
export const verifyToken=expressAsyncHandler(async (token)=>{
    let decodedToken=await jwt.verify(token,process.env.JWT_SECRET)
    if(!decodedToken){
        throw new Error('Token expired/Invalid')
    }
    return decodedToken;
})