import React from 'react'
import styled from 'styled-components'

const SearchItem = () => {
  return (
    <ItemContainer>
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        className='siImg'
        alt='썸네일'
      />
      <div className='siDesc'>
        <h1 className='siTitle'>서울 중앙 호텔</h1>
        <span className='siDistance'>중앙역에서 500m</span>
        <span className='siTaxiOp'>공항까지 무료 픽업 서비스 제공</span>
        <span className='siSubtitle'>
          에어컨과 어메니티 제공
        </span>
        <span className='siFeatures'>
          20평 • 퀸 사이즈 침대 1 • 욕실 1
        </span>
        <span className='siCancelOp'>취소 수수료 없음</span>
      </div>
      <div className='siDetails'>
        <div className='siRating'>
          <span>훌륭함</span>
          <button>8.9</button>
        </div>
        <div className='siDetailTexts'>
          <span className='siPrice'>12만원</span>
          <span className='siTaxOp'>부과세 포함 가격</span>
          <button className='siCheckButton'>더보기</button>
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