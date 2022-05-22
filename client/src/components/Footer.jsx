import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterWrap>
      <div className='fLists'>
        <ul className='fList'>
          <li className='fListItem'>국가</li>
          <li className='fListItem'>지역</li>
          <li className='fListItem'>도시</li>
          <li className='fListItem'>구</li>
          <li className='fListItem'>공항</li>
          <li className='fListItem'>호텔</li>
        </ul>
        <ul className='fList'>
          <li className='fListItem'>집</li>
          <li className='fListItem'>아파트</li>
          <li className='fListItem'>리조트</li>
          <li className='fListItem'>빌라</li>
          <li className='fListItem'>호텔</li>
          <li className='fListItem'>게스트 하우스</li>
        </ul>
        <ul className='fList'>
          <li className='fListItem'>특별한 공간</li>
          <li className='fListItem'>리뷰</li>
          <li className='fListItem'>여행 기사</li>
          <li className='fListItem'>여행 커뮤니티</li>
          <li className='fListItem'>시즌별 연휴별 특가</li>
        </ul>
        <ul className='fList'>
          <li className='fListItem'>렌트</li>
          <li className='fListItem'>항공권</li>
          <li className='fListItem'>레스토랑 예약</li>
          <li className='fListItem'>여행사</li>
        </ul>
        <ul className='fList'>
          <li className='fListItem'>소비자 서비스</li>
          <li className='fListItem'>파트너</li>
          <li className='fListItem'>연혁</li>
          <li className='fListItem'>약관 & 조건</li>
        </ul>
      </div>
      <div className='fText'>Copyright © 2022 예약 앱</div>
    </FooterWrap>
  )
}

export default Footer

const FooterWrap = styled.div`
  width: 100%;
  width: 1024px;
  font-size: 12px;

  .fLists{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  .fList{
    list-style: none;
    padding: 0;
  }

  .fListItem{
    margin-bottom: 10px;
    color: #003580;
    cursor: pointer;
  }
`;