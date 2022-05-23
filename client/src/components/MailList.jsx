import React from 'react'
import styled from 'styled-components'

const MailList = () => {
  return (
    <List>
      <h1 className='mailTitle'>시간과 비용을 절약하세요!</h1>
      <span className='mailDesc'>저희는 회원들에게 합리적인 가격만을 제공합니다.</span>
      <div className='mailInputContainer'>
        <input type='text' placeholder='이메일'/>
        <button>구독하기</button>
      </div>
    </List>
  )
}

export default MailList

const List = styled.div`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
  background-color: #003580;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px;

  .mailInputContainer>input{
    width: 300px;
    height: 30px;
    padding: 10px;
    border: none;
    margin-right: 10px;
    border-radius: 5px;
  }

  .mailInputContainer>button{
    height: 50px;
    background-color: #0071c2;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;