import React from 'react'
import AdminNavbar from '../../../components/admin/adminNavbar'
import { Outlet } from "react-router"
import Footer from '../../../components/Footer'

function AdminRoot() {
  return (
    <div>
      <AdminNavbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default AdminRoot