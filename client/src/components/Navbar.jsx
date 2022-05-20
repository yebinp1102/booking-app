import React from 'react'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <Nav>
      <div className='navContainer'>
        <span className='logo'>예약 앱</span>
        <div className='navItems'>
          <button className='navBtn'>회원가입</button>
          <button className='navBtn'>로그인</button>
        </div>
      </div>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  height: 50px;
  background-color: #003580;
  display: flex;
  justify-content: center;

  .navContainer{
    width: 100%;
    max-width: 1024px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo{
    font-weight: 500;
  }

  .navBtn{
    margin-left: 20px;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    color: #003580;
    border-radius: 5px;
  }
`;