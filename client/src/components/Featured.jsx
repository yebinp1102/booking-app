import React from 'react'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'

const Featured = () => {
  const {data, loading} = useFetch("hotels/countByCity?cities=경주,부산,서울")
  return (
    <FeaturedWrap>
      {loading ? "로딩 중입니다. 잠시만 기다려주세요" : <>
        <div className='featuredItem'>
          <img 
            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
            className='featuredImg'
            alt='숙소 유형 사진'
          />
          <div className='featuredTitles'>
            <h1>경주</h1>
            <h2>{data[0]}개의 숙소</h2>
          </div>
        </div>
        <div className='featuredItem'>
          <img 
            src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
            className='featuredImg'
            alt='숙소 유형 사진'
          />
          <div className='featuredTitles'>
            <h1>부산</h1>
            <h2>{data[1]}개의 숙소</h2>
          </div>
        </div>
        <div className='featuredItem'>
          <img 
            src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
            className='featuredImg'
            alt='숙소 유형 사진'
          />
          <div className='featuredTitles'>
            <h1>서울</h1>
            <h2>{data[2]}개의 숙소</h2>
          </div>
        </div>
      </>}
    </FeaturedWrap>
  )
}

export default Featured

const FeaturedWrap = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  z-index: 1;

  .featuredItem{
    position: relative;
    color: white;
    border-radius: 10px;
    overflow: hidden;
    height: 250px;
    flex:1
  }

  .featuredImg{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .featuredTitles{
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
`;