import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

// svg icons
import HotelIcon from '@mui/icons-material/Hotel';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AttractionsIcon from '@mui/icons-material/Attractions';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';

const Header = ({type}) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState('')
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })

  const handleOption = (name, operation) => {
    setOptions((prev)=>{
      return{
        ...prev,
        [name] : operation === "i" ? options[name] +1 : options[name] -1
      }
    })
  }

  const {dispatch} = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type: "NEW_SEARCH", payload:{destination, dates, options}})
    navigate('/hotels', {state: {destination, dates, options}})
  }

  return (
    <HeaderWrap>
      <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
        <div className='headerList'>
          <div className='headerListItem active'>
            <HotelIcon/>
            <span>??????</span>
          </div>
          <div className='headerListItem'>
            <FlightTakeoffIcon/>
            <span>??????</span>
          </div>
          <div className='headerListItem'>
            <DirectionsCarFilledOutlinedIcon/>
            <span>??????</span>
          </div>
          <div className='headerListItem'>
            <AttractionsIcon/>
            <span>????????????</span>
          </div>
          <div className='headerListItem'>
            <LocalTaxiIcon/>
            <span>??????</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className='headerTitle'>????????? ???????????? ???????????? ????????? ????????????????</h1>
            <p className='headerDesc'>?????? ??????????????? ?????? ?????? 10% ?????? ?????? ????????? ???????????? ????????????. ??????????????? ?????? ??? ?????? ???????????? ?????? ????????????!</p>
            { !user && <button className='headerBtn'>????????? / ????????????</button>}
            <div className='headerSearch'>
              {/* ?????? ?????? */}
              <div className='headerSearchItem'>
                <HotelIcon/>
                <input
                  type='text'
                  placeholder='??????'
                  className='headerSearchInput'
                  onChange={(e)=>setDestination(e.target.value)}
                />
              </div>
              {/* ?????? ?????? */}
              <div className='headerSearchItem'>
                <CalendarMonthOutlinedIcon className='headerIcon' />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className='headerSearchText'
                >{`${format(dates[0]?.startDate, "yyyy/MM/dd")} ?????? ${format(dates[0]?.endDate, "yyyy/MM/dd")} ??????`}</span>
                {openDate && (
                  <DateRange 
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              {/* ??????, ??? ?????? ?????? */}
              <div className='headerSearchItem'>
                <BoyOutlinedIcon/>
                <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">
                {`${options.adult} adult ??? ${options.children} children ??? ${options.room} room`}
                </span>
                {openOptions && (
                  <div className='options'>
                    {/* ?????? ?????? */}
                    <div className='optionItem'>
                      <span className='optionText'>Adult</span>
                      <div className='optionCounter'>
                        <button 
                          disabled={options.adult <=1}
                          className="optionCounterButton"
                          onClick={()=>handleOption("adult", "d")}
                        > - </button>
                        <span className='optionCounterNumber'>
                          {options.adult}
                        </span>
                        <button 
                          className="optionCounterButton"
                          onClick={()=>handleOption("adult", "i")}
                        > + </button>
                      </div>
                    </div>
                    {/* ????????? ?????? */}
                    <div className='optionItem'>
                      <span className='optionText'>Children</span>
                      <div className='optionCounter'>
                        <button 
                          disabled={options.children <=0}
                          className="optionCounterButton"
                          onClick={()=>handleOption("children", "d")}
                        > - </button>
                        <span className='optionCounterNumber'>
                          {options.children}
                        </span>
                        <button 
                          className="optionCounterButton"
                          onClick={()=>handleOption("children", "i")}
                        > + </button>
                      </div>
                    </div>
                    {/* ??? ?????? */}
                    <div className='optionItem'>
                      <span className='optionText'>room</span>
                      <div className='optionCounter'>
                        <button 
                          disabled={options.room <=1}
                          className="optionCounterButton"
                          onClick={()=>handleOption("room", "d")}
                        > - </button>
                        <span className='optionCounterNumber'>
                          {options.room}
                        </span>
                        <button 
                          className="optionCounterButton"
                          onClick={()=>handleOption("room", "i")}
                        > + </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='headerSearchItem'>
                <button className='headerBtn' onClick={handleSearch}>??????</button>
              </div>
            </div>
          </>
        )}
      </div>
    </HeaderWrap>
  )
}

export default Header

const HeaderWrap = styled.div`
  background-color: #003580;
  color: white;
  display: flex;
  justify-content: center;
  position: relative;

  .headerContainer {
    width: 100%;
    max-width: 1024px;
    margin: 20px 0px 100px 0px;
  }
  
  .headerContainer.listMode {
    margin: 20px 0px 0px 0px;
  }
  
  .headerList {
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
  }
  
  .headerListItem {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .headerListItem.active {
    border: 1px solid white;
    padding: 10px;
    border-radius: 20px;
  }
  
  .headerDesc {
    margin: 20px 0px;
  }
  
  .headerBtn {
    background-color: #0071c2;
    color: white;
    font-weight: 500;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .headerSearch {
    height: 30px;
    background-color: white;
    border: 3px solid #febb02;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0px;
    border-radius: 5px;
    position: absolute;
    bottom: -25px;
    width: 100%;
    max-width: 1024px;
  }
  
  .headerIcon {
    color: lightgray;
  }
  
  .headerSearchItem {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .headerSearchInput {
    border: none;
    outline: none;
  }
  
  .headerSearchText {
    color: lightgray;
    cursor: pointer;
  }
  
  .date {
    position: absolute;
    top: 50px;
    z-index: 2;
  }
  
  .options {
    z-index: 2;
    position: absolute;
    top: 50px;
    background-color: white;
    color: gray;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  }
  
  .optionItem {
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }
  
  .optionCounter {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: black;
  }
  
  .optionCounterButton {
    width: 30px;
    height: 30px;
    border: 1px solid #0071c2;
    color: #0071c2;
    cursor: pointer;
    background-color: white;
  }
  
  .optionCounterButton:disabled {
    cursor: not-allowed;
  }
`;