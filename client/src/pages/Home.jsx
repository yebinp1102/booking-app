import React from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import Featured from '../components/Featured'
import PropertyList from '../components/PropertyList'
import FeaturedProperties from '../components/FeaturedProperties'
import MailList from '../components/MailList'

const Home = () => {
  return (
    <HomePage>
      <Header />
      <div className='homeContainer'>
        <Featured />
        <h1 className='homeTitle'>유형별 숙소</h1>
        <PropertyList />
        <h1 className='homeTitle'>후기 좋은 숙소들</h1>
        <FeaturedProperties />
        <MailList />
      </div>
    </HomePage>
  )
}

export default Home

const HomePage = styled.div`
  .homeContainer{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .homeTitle{
    width: 1024px;
    font-size: 20px;
  }
`;