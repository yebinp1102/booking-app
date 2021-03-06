import React,{ useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../components/SearchItem'
import useFetch from '../hooks/useFetch'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined)

  const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&minPrice=${minPrice || 0}&maxPrice=${maxPrice || 9999999}`)

  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Header type="list"/>
      <ListContainer>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>검색</h1>
            <div className='lsItem'>
              <label>목적지</label>
              <input placeholder={destination} type="text" onChange={(e)=>setDestination(e.target.value)} />
            </div>
            <div className='lsItem'>
              <label>체크인 날짜</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0]?.startDate, "yyyy/MM/dd")} 부터 ${format(dates[0]?.endDate, "yyyy/MM/dd")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item)=> setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className='lsItem'>
              <label>옵션</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    최저 가격 <small>(1박 기준)</small>
                  </span>
                  <input type="number" className='lsOptionInput'onChange={(e)=>setMinPrice(e.target.value)}/>
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    최대 가격 <small>(1박 기준)</small>
                  </span>
                  <input type="number" className='lsOptionInput'onChange={(e)=>setMaxPrice(e.target.value)}/>
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>성인</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>어린이</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>방</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>검색</button>
          </div>
          <div className='listResult'>
            {loading ? "로딩 중 입니다." : 
            <>
              {data.map(item => (
                <SearchItem item={item} key={item._id} />
              ))}
            </>
            }
          </div>
        </div>
      </ListContainer>
    </div>
  )
}

export default List

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .listWrapper {
    width: 100%;
    max-width: 1024px;
    display: flex;
    gap: 20px;
  }

  .listSearch {
    flex: 1;
    background-color: #febb02;
    padding: 10px;
    border-radius: 10px;
    position: sticky;
    top: 10px;
    height: max-content;
  }

  .lsTitle{
    font-size: 20px;
    color: #555;
    margin-bottom: 10px;
  }

  .lsItem{
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
  }

  .lsItem>label{
    font-size: 12px;
  }

  .lsItem>input{
    height: 30px;
    border: none;
    padding: 5px;
  }
  .lsItem>span{
    height: 30px;
    padding: 5px;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .lsOptions{
    padding: 10px;
  }

  .lsOptionItem{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: #555;
    font-size: 12px;
  }

  .lsOptionInput{
    width: 50px;
  }

  .listSearch>button{
    padding: 10px;
    background-color: #0071c2;
    color: white;
    border: none;
    width: 100%;
    font-weight: 500;
    cursor: pointer;
  }

  .listResult {
    flex: 3;
  }
`;