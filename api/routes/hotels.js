import express from 'express'
import Hotel from '../models/Hotel.js'

const router = express.Router();

// 호텔 데이터 생성
router.post('/', async (req, res)=>{
  const newHotel = new Hotel(req.body)
  try{
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  }catch(err){
    res.status(500).json(err)
  }
})

// 호텔 데이터 업데이트
// id를 파라미터로 받고, Hotel 모델에서 아이디로 수정할 호텔 데이터를 찾는다. 
router.put('/:id', async (req, res)=>{
  try{
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      {new: true}
    )
    res.status(200).json(updatedHotel)
  }catch(err){
    res.status(500).json(err)
  }
})

// 호텔 데이터 삭제
router.delete('/:id', async (req, res)=>{
  try{
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json("해당 호텔 정보가 삭제 되었습니다.")
  }catch(err){
    res.status(500).json(err)
  }
})

// 특정 호텔 데이터 가져오기
router.get('/:id', async (req, res)=>{
  try{
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  }catch(err){
    res.status(500).json(err)
  }
})

// 모든 호텔 데이터 가져오기
router.get('/', async (req, res)=>{
  try{
    const hotels = await Hotel.find()
    res.status(200).json(hotels)
  }catch(err){
    res.status(500).json(err)
  }
})

export default router