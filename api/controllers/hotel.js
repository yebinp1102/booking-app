import Hotel from "../models/Hotel.js"
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)
  try{
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  }catch(err){
    next(err)
  }
}

export const updateHotel = async (req, res, next) => {
  try{
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      {new: true}
    )
    res.status(200).json(updatedHotel)
  }catch(err){
    next(err)
  }
}

export const deleteHotel = async (req, res, next) => {
  try{
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json("해당 호텔 정보가 삭제 되었습니다.")
  }catch(err){
    next(err)
  }
}

export const getHotel = async (req, res, next) => {
  try{
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  }catch(err){
    next(err)
  }
}

export const getHotels = async (req, res, next) => {
  const {minPrice, maxPrice, ...rest} = req.query
  try{
    const hotels = await Hotel.find({
      ...rest,
      cheapestPrice: { $gt: minPrice | 1, $lt: maxPrice || 9999999},
    }).limit(req.query.limit)
    res.status(200).json(hotels)
  }catch(err){
    next(err)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try{
    const list = await Promise.all(cities.map(city=>{
      return Hotel.countDocuments({city:city})
    }))
    res.status(200).json(list)
  }catch(err){
    next(err)
  }
}

export const countByType = async (req, res, next) => {
  try{
    const hotelCount = await Hotel.countDocuments({type: "호텔"})
    const apartmentCount = await Hotel.countDocuments({type: "에어비엔비"})
    const resortCount = await Hotel.countDocuments({type: "리조트"})
    const villaCount = await Hotel.countDocuments({type: "풀빌라"})
    const cabinCount = await Hotel.countDocuments({type: "별장"})

    res.status(200).json([
      {type:"호텔", count: hotelCount},
      {type:"에어비엔비", count: apartmentCount},
      {type:"리조트", count: resortCount},
      {type:"풀빌라", count: villaCount},
      {type:"별장", count: cabinCount}
    ])
  }catch(err){
    next(err)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};