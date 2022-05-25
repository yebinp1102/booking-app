import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SearchItem = ({item}) => {
  return (
    <ItemContainer>
      <img
        src={item.photos[0]}
        className='siImg'
        alt='썸네일'
      />
      <div className='siDesc'>
        <h1 className='siTitle'>{item.name}</h1>
        <span className='siDistance'>중앙역에서 {item.distance}m</span>
        <span className='siTaxiOp'>공항까지 무료 픽업 서비스 제공</span>
        <span className='siSubtitle'>
          에어컨과 어메니티 제공
        </span>
        <span className='siFeatures'>{item.desc}</span>
        <span className='siCancelOp'>취소 수수료 없음</span>
      </div>
      <div className='siDetails'>
        { item.rating && <div className='siRating'>
          <span>훌륭함</span>
          <button>{item.rating}</button>
        </div>}
        <div className='siDetailTexts'>
          <span className='siPrice'>{item.cheapestPrice}~</span>
          <span className='siTaxOp'>부과세 포함 가격</span>
          <Link to={`/hotels/${item._id}`}>
            <button className='siCheckButton'>더보기</button>
          </Link>
        </div>
      </div>
    </ItemContainer>
  )
}

export default SearchItem

const ItemContainer = styled.div`
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;

  .siImg {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  .siDesc {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 2;
  }

  .siTitle {
    font-size: 20px;
    color: #0071c2;
  }

  .siDistance {
    font-size: 12px;
  }

  .siTaxiOp {
    font-size: 12px;
    background-color: #008009;
    color: white;
    width: max-content;
    padding: 3px;
    border-radius: 5px;
  }

  .siSubtitle{
    font-size: 12px;
    font-weight: bold;
  }

  .siFeatures{
    font-size: 12px;
  }

  .siCancelOp{
    font-size: 12px;
    color: #008009;
    font-weight: bold;
  }

  .siCancelOpSubtitle{
    font-size: 12px;
    color: #008009;
  }

  .siDetails {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between
  }

  .siRating{
    display: flex;
    justify-content: space-between
  }

  .siRating>span{
    font-weight: 500;
  }
  .siRating>button{
  background-color: #003580;
  color: white;
  padding: 5px;
  font-weight: bold;
  border: none;
  }

  .siDetailTexts{
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .siPrice{
    font-size: 24px;
  }

  .siTaxOp{
    font-size: 12px;
    color: gray;
  }

  .siCheckButton{
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    padding: 10px 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`;