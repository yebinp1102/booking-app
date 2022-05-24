import React from 'react'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=4");
  return (
    <PropsWrap>
      {loading ? "로딩 중 입니다" : (
        <>
          {data.map((item) => (
            <div className='fpItem' key={item._id}>
              <img
                src={item.photos[0]}
                className='fpImg'
                alt='옵션 이미지'
              />
              <span className='fpName'>{item.name}</span>
              <span className='fpCity'>{item.city}</span>
              <span className='fpPrice'>{item.cheapestPrice}원 ~</span>
              { item.rating &&
                <div className='fpRating'>
                  <button>{item.rating}</button>
                  <span>훌륭한 서비스</span>
                </div>
              }
            </div>
          ))}
        </>
      )}
    </PropsWrap>
  )
}

export default FeaturedProperties

const PropsWrap = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .fpItem{
    flex: 1;
    gap: 10px;
    display: flex;
    flex-direction: column;
  }

  .fpImg{
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .fpName{
    color: #333;
    font-weight: bold;
  }

  .fpCity{
    font-weight: 300;
  }

  .fpPrice{
    font-weight: 500;
  }

  .fpRating>button{
    background-color: #003580;
    color: white;
    border: none;
    padding: 3px;
    margin-right: 10px;
    font-weight: bold;
  }

  .fpRating>span{
    font-size: 14px;
  }
`;