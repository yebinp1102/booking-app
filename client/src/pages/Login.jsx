import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const [ credentials, setCredentials ] = useState({
    username: undefined,
    password: undefined
  })
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials( prev => ({...prev, [e.target.id]:e.target.value }) )
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try{
      const res = await axios.post('/auth/login', credentials)
      dispatch({type: "LOGIN_SUCCESS", payload: res.data })
      navigate("/")
    }catch(err){
      dispatch({type: "LOGIN_FAIL", payload: err.response.data })
    }
  }

  return (
    <LoginWrap>
      <div className='lContainer'>
        <input 
          type='text'
          placeholder='유저명 username'
          id='username'
          onChange={handleChange}
          className="lInput"
        />
        <input 
          type='password'
          placeholder='비밀번호 password'
          id='password'
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleLogin} className='lButton'>로그인</button>
        {error && <span>{error.message}</span>}
      </div>
    </LoginWrap>
  )
}

export default Login

const LoginWrap = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .lContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .lInput{
    height: 30px;
    padding: 10px;
  }

  .lButton {
    border: none;
    padding: 10px 20px;
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
  }

  .lButton:disabled{
    background-color: #0071c28c;
    cursor: not-allowed;
  }
`;