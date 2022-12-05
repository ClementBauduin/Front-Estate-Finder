import React from 'react'
import { Link } from 'react-router-dom'
import MobileHeader from '../../components/Header/Header'
import Style from './ErrorPage.module.css'

export default function ErrorPage() {
  return (
    <>
      <MobileHeader />
      <div className={Style.ErrorWrapper}>
         <h1>Error 404</h1>
        <h2>The page you are looking for doesn't exist.</h2>
        <Link to='/'>Click here to get to the homepage</Link>
      </div>
     
    </>
  )
}
