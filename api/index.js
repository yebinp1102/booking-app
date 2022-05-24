import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

const connect = async () => {
  try{
    await mongoose.connect(process.env.MONGO)
    console.log('데이터베이스에 연결 되었습니다!')
  }catch(err){
    console.log(err)
  }
}

mongoose.connection.on("disconnected", ()=>{
  console.log('데이터베이스 연결에 실패 했습니다.')
})

app.use(cors())
// 미들웨어
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "문제가 발생 했습니다."
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(5000, () => {
  connect()
  console.log('서버에 성공적으로 연결 되었습니다!')
})