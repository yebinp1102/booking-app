import express from 'express'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verify.js';

const router = express.Router();

// 방 데이터 생성
router.post('/:hotelid', verifyAdmin, createRoom);
// 방 데이터 업데이트
router.put('/:id', verifyAdmin, updateRoom)
// 방 데이터 삭제
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)
// 특정 방 데이터 가져오기
router.get('/:id', getRoom)
// 모든 방 데이터 가져오기
router.get('/', getRooms)

export default router