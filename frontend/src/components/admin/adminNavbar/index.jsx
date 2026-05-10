import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom"

function AdminNavbar() {
  return (
    <>
             <Navbar bg="dark" data-bs-theme="dark" style={{position:"fixed",top:"0",width:"100%",zIndex:"10000"}}>
        <Container>
          <NavLink className='mx-2' to="/admin" style={{textDecoration:"none",color:"white",fontSize:"40px"}}>Admin</NavLink>
          <Nav className="me-auto">
            <NavLink className='mx-2' to="/admin/dashboard" style={{textDecoration:"none",color:"white",fontSize:"20px"}}>Dashboard</NavLink>
            <NavLink className='mx-2' to="/admin/products" style={{textDecoration:"none",color:"white",fontSize:"20px"}}>Products</NavLink>
            <NavLink className='mx-2' to="/admin/addProduct" style={{textDecoration:"none",color:"white",fontSize:"20px"}}>AddProduct</NavLink>
            <NavLink className='mx-2' to="/home" style={{textDecoration:"none",color:"white",fontSize:"20px"}}>Home</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar

