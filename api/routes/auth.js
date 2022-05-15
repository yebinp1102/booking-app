import express from 'express'

const router = express.Router();

router.get('/', (req, res)=>{
  res.send('인증 라우터입니다.')
})

router.get('/register', (req, res)=>{
  res.send('회원가입을 위한 엔드포인트 입니다.')
})

export default router