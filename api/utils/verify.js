import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  // 토큰이 존재하지 않는 경우
  if(!token) return next(createError(400, "기능을 수행 할 권한이 없는 사용자 입니다."))
  
  // 토큰이 있는 경우
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    // 유저의 토큰 인증이 안되는 경우
    if(err) return next(createError(400, "올바른 토큰이 아닙니다."))
    // 토큰이 유효한 경우 user라는 프로퍼티를 생성해서 jwt로부터 받은 user를 할당.
    req.user = user
    next()
  })
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
      next()
    }else{
      return next(createError(400, "권한이 없습니다."))
    }
  })
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if(req.user.isAdmin){
      next()
    }else{
      return next(createError(400, "권한이 없습니다."))
    }
  })
}