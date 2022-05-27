import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Footer from '../components/Footer';
import MailList from '../components/MailList';
import useFetch from '../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';
import Reserve from '../components/Reserve';

const Hotel = () => {
  const location = useLocation()
  // location의 pathname이라는 프로퍼티는 URL 정보를 담고 있음. 이것을 이용함.
  const id = location.pathname.split('/')[2] // pathname에서 필요한 것은 / 뒤의 숙소의 고유 id
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false)

  const {data, loading} = useFetch(`/hotels/find/${id}`)

  const handleMove = (direction) => {
    let newSlideNumber;
    if(direction === "left"){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber -1;
    }else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber +1;
    }
    setSlideNumber(newSlideNumber)
  }

  const {dates, options} = useContext(SearchContext);

  // 몇 박인지 계산하는 함수
  const MILLISECONDES_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(startDate, endDate){
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff/MILLISECONDES_PER_DAY)
    return diffDays
  }
  const days = (dayDifference(dates[0].endDate, dates[0].startDate))

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  // 로그인 했으면 예약을 위한 모달창 보여주고, 아니면 로그인 페이지로 이동
  const handleClick = () => {
    if(user){
      setOpenModal(true);
    }else{
      navigate('/login')
    }
  }

  return (
    <div>
      <Header type="list" />
      {loading ? "로딩 중 입니다." : <HotelWrap>
        {open && (
          <div className='slider'>
            <CloseIcon onClick={()=>setOpen(false)} className="close" />
            <ArrowBackIcon onClick={()=>handleMove("left")} className="arrow" />
            <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
            <ArrowForwardIcon onClick={()=>handleMove("right")} className="arrow" />
          </div>
        )}
        <div className='hotelWrapper'>
          <button className='bookNow'>지금 예약 해보세요!</button>
          <h1 className='hotelTitle'>{data.name}</h1>
          <div className='hotelAddress'>
            <span>{data.address}</span>
          </div>
          <span className='hotelDistance'>서울 중심인 강남에서 {data.distance}m 거리에 위치 합니다</span>
          <span className='hotelPriceHightlight'>
            5월 31일까지 10만원 이상 결제하시는 고객에게 공항 무료 픽업 서비스를 제공합니다.
          </span>
          <div className='hotelImages'>
            {data.photos?.map((photo, i) => (
              <div className='hotelImgWrapper' key={i}>
                <img
                  onClick={()=>handleOpen(i)}
                  src={photo}
                  alt="숙소 이미지"
                  className='hotelImg'
                />
              </div>
            ))}
          </div>
          <div className='hotelDetails'>
            <div className='hotelDetailsTexts'>
              <h1 className='hotelTitle'>{data.title}</h1>
              <p className='hotelDesc'>
                {data.desc}
              </p>
            </div>
            <div className='hotelDetailsPrice'>
              <h1>4박 5일동안 최고의 시간을 보내세요!</h1>
              <span>서울 중심구에 위치한 신라 호텔, 위치 점수 9.8로 최상 입니다.</span>
              <h2>
                <b>{days * data.cheapestPrice * options.room }만원</b> ({days}박 {days+1}일)
              </h2>
              <button onClick={handleClick}>지금 예약 하세요!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </HotelWrap>}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  )
}

export default Hotel

const HotelWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .hotelWrapper {
    width: 100%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
  }

  .bookNow {
    position: absolute;
    top: 10px;
    right: 0;
    border: none;
    padding: 10px 20px;
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }

  .hotelTitle {
    font-size: 24px;
  }

  .hotelAddress {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .hotelDistance {
    color: #0071c2;
    font-weight: 500;
  }

  .hotelPriceHighlight {
    color: #008009;
    font-weight: 500;
  }

  .hotelImages {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .hotelImgWrapper {
    width: 33%;
  }

  .hotelImg {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  .hotelDetails {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
  }

  .hotelDetailsTexts {
    flex: 3;
  }

  .hotelDesc {
    font-size: 14px;
    margin-top: 20px;
  }

  .hotelDetailsPrice {
    flex: 1;
    background-color: #ebf3ff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .hotelDetailsPrice > h1 {
    font-size: 18px;
    color: #555;
  }
  .hotelDetailsPrice > span {
    font-size: 14px;
  }
  .hotelDetailsPrice > h2 {
    font-weight: 300;
  }
  .hotelDetailsPrice > button {
    border: none;
    padding: 10px 20px;
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
  }

  .slider{
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.613);
    z-index: 999;
    display: flex;
    align-items: center;
  }

  .sliderWrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sliderImg{
    width: 80%;
    height: 80vh;
  }

  .close{
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: lightgray;
    cursor: pointer;
  }

  .arrow{
    margin: 20px;
    font-size: 50px;
    color: lightgray;
    cursor: pointer;
  }
`;