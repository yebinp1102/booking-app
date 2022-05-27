import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import useFetch from '../hooks/useFetch';
import { SearchContext } from '../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({setOpen, hotelId}) => {
  const [selectedRooms, setSelectedRooms] = useState([]) 
  const {data, loading} = useFetch(`/hotels/room/${hotelId}`)
  const {dates} = useContext(SearchContext) // dates : Home 페이지의 검색 UI에서 입력한 날짜를 의미
  const navigate = useNavigate();

  // 체크 박스에 체크 되면, 해당 숙소 ID 정보가 selectedRooms 배열에 담긴다.
  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
  }

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber?.unavailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(selectedRooms.map((roomId) => {
        const res = axios.put(`/rooms/availability/${roomId}`, {
          dates: alldates,
        });
        return res.data;
      })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  };
  
  return (
    <ReserveWrap>
      <div className="rContainer">
        <CancelPresentationTwoToneIcon
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </ReserveWrap>
  )
}

export default Reserve

const ReserveWrap = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.418);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

  .rContainer {
    background-color: white;
    padding: 2rem;
    position: relative;
  }

  .rClose {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }

  .rItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
    padding: 20px;
  }

  .rInfo {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .rTitle {
    font-weight: 500;
  }

  .rDesc {
    font-weight: 300;
  }

  .rMax {
    font-size: 12px;
  }

  .rPrice {
    font-weight: 500;
  }

  .rSelectRooms{
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 8px;
    color: gray;
  }

  .room{
    display: flex;
    flex-direction: column;
  }

  .rButton {
    border: none;
    padding: 10px 20px;
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
  }
`;