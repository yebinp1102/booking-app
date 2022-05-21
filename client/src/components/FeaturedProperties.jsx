import React from 'react'
import styled from 'styled-components'

const FeaturedProperties = () => {
  return (
    <PropsWrap>
      <div className='fpItem'>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          className='fpImg'
          alt='옵션 이미지'
        />
        <span className='fpName'>힐튼 가든 호텔</span>
        <span className='fpCity'>순천</span>
        <span className='fpPrice'>12만원 ~</span>
        <div className='fpRating'>
          <button>8.9</button>
          <span>서비스 훌륭</span>
        </div>
      </div>
      <div className='fpItem'>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
          className='fpImg'
          alt='옵션 이미지'
        />
        <span className='fpName'>가평 유토피아 풀빌라</span>
        <span className='fpCity'>가평</span>
        <span className='fpPrice'>21만원 ~</span>
        <div className='fpRating'>
          <button>9.3</button>
          <span>최고의 숙소</span>
        </div>
      </div>
      <div className='fpItem'>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1"
          className='fpImg'
          alt='옵션 이미지'
        />
        <span className='fpName'>강남 사계절 호텔</span>
        <span className='fpCity'>서울</span>
        <span className='fpPrice'>6만원 ~</span>
        <div className='fpRating'>
          <button>8.9</button>
          <span>서비스 훌륭</span>
        </div>
      </div>
      <div className='fpItem'>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
          className='fpImg'
          alt='옵션 이미지'
        />
        <span className='fpName'>경주 자연 별곡</span>
        <span className='fpCity'>경주</span>
        <span className='fpPrice'>18만원 ~</span>
        <div className='fpRating'>
          <button>8.9</button>
          <span>서비스 훌륭</span>
        </div>
      </div>
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