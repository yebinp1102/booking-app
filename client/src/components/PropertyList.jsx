import React from 'react'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'

const PropertyList = () => {
  const {data, loading} = useFetch("/hotels/countByType")
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
  ]
  return (
    <List>
      {loading ? "로딩중 입니다." : (
        <>
        { data && images.map((img, idx) => (
          <div className='pListItem' key={idx}>
            <img 
              src={img}
              alt={data[idx]?.type}
              className='pListImg'
            />
            <div className='pListTitles'>
              <h1>{data[idx]?.type}</h1>
              <h2>{data[idx]?.count}개의 {data[idx]?.type}</h2>
            </div>
          </div>
        ))}
        </>
      )}
    </List>
  )
}

export default PropertyList

const List = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .pListItem{
    flex:1;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }

  .pListImg{
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .pListTitles>h1{
    font-size: 18px;
    color: #444;
  }

  .pListTitles>h2{
    font-size: 14px;
    font-weight: 300;
  }
`;