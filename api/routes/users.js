import express from 'express'
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/verify.js'
const router = express.Router();

// router.get('/checkuser/:id', verifyUser,(req, res, next) => {
//   res.send("이미 로그인 한 유저이며, 당신의 계정을 삭제 할 수 있는 권한을 갖고 있습니다.")
// })

// router.get('/checkadmin/:id', verifyAdmin,(req, res, next) => {
//   res.send("당신은 관리자이며, 모든 계정을 관리 할 수 있는 권한이 있습니다.")
// })

// 유저 데이터 업데이트
router.put('/:id', verifyUser, updateUser)
// 유저 데이터 삭제
router.delete('/:id', verifyUser, deleteUser)
// 특정 유저 데이터 가져오기
router.get('/:id', verifyUser, getUser)
// 모든 유저 데이터 가져오기
router.get('/', verifyAdmin, getUsers)

export default router