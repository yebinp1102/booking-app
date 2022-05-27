import express from 'express'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verify.js';

const router = express.Router();

// 데이터 생성
router.post('/:hotelid', verifyAdmin, createRoom);
// 데이터 업데이트
router.put('/:id', verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability);
// 데이터 삭제
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)
// 데이터 가져오기
router.get('/:id', getRoom)
// 모든 데이터 가져오기
router.get('/', getRooms)

export default router