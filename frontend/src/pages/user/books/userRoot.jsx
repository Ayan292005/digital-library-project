import React from 'react'
import UserNavbar from '../../../components/user/userNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../../components/Footer'
function UserRoot() {
  return (
    <>
     <UserNavbar/>
     <Outlet/>
     <Footer/> 
    </>
  )
}

export default UserRoot
