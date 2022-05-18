import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'

// 새로운 방이 만들어지면, 호텔 정보에 해당 방을 ID 식별자로 저장해야 한다. 
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body)

  try{
    const savedRoom = await newRoom.save();
    // 호텔에 새로운 방 정보를 추가하기 위한 try and catch 블럭
    try{  
      await Hotel.findByIdAndUpdate(hotelId, { $push : {rooms: savedRoom._id} })
    }catch(err){
      next(err)
    }
    res.status(200).json(savedRoom)
  }catch(err){
    next(err)
  }
}

export const updateRoom = async (req, res, next) => {
  try{
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      {new: true}
    )
    res.status(200).json(updatedRoom)
  }catch(err){
    next(err)
  }
}

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try{
    await Room.findByIdAndDelete(req.params.id)
    try{  
      await Hotel.findByIdAndUpdate(hotelId, { $pull : {rooms: req.params.id} })
    }catch(err){
      next(err)
    }
    res.status(200).json("해당 방 정보가 삭제 되었습니다.")
  }catch(err){
    next(err)
  }
}

export const getRoom = async (req, res, next) => {
  try{
    const room = await Room.findById(req.params.id)
    res.status(200).json(room)
  }catch(err){
    next(err)
  }
}

export const getRooms = async (req, res, next) => {
  try{
    const rooms = await Room.find()
    res.status(200).json(rooms)
  }catch(err){
    next(err)
  }
}