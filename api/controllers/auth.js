import AppUser from "../models/User.js"
import bcrypt from 'bcrypt'
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new AppUser({
      username: req.body.username,
      email: req.body.email,
      password: hash
    })
    await newUser.save()
    res.status(200).send("유저가 생성 되었습니다.")
  }catch(err){
    next(err)
  }
}

export const login = async (req, res, next) => {
  try{
    // 유저명 존재하는지 확인
    const user = await AppUser.findOne({username: req.body.username})
    if(!user) return next(createError(404, "일치하는 유저명이 없습니다."))
    
    // 비밀번호 일치하는지 확인
    const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordCorrect) return next(createError(400, "비밀번호가 일치하지 않습니다."))

    // 토큰 생성
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_PRIVATE_KEY)

    // user를 디스트럭쳐링함으로써 다음 password와 isAdmin은 클라이언트에게 넘겨주지 않는다.
    const {password, isAdmin, ...otherDetails} = user._doc

    // 유저명과 비밀번호 모두 일치할 경우, cookie에 생성한 token을 저장하고 보안상의 이유로 http 접근만 허용
    res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails});
  }catch(err){
    next(err)
  }
}