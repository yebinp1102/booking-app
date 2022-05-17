import express from 'express'
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verify.js';

const router = express.Router();

// 호텔 데이터 생성
router.post('/', verifyAdmin, createHotel);
// 호텔 데이터 업데이트
router.put('/:id', verifyAdmin, updateHotel)
// 호텔 데이터 삭제
router.delete('/:id', verifyAdmin, deleteHotel)
// 특정 호텔 데이터 가져오기
router.get('/:id', getHotel)
// 모든 호텔 데이터 가져오기
router.get('/', getHotels)

export default router