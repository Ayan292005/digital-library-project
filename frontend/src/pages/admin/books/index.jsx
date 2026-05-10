import React, { useEffect, useState } from 'react'
import axios from "axios"
import Table from 'react-bootstrap/Table'
let DBurl="http://localhost:4000/books"
      

function AdminProducts() {
    let [data, setData] = useState([])
    let [modalProduct, setModalProduct] = useState(null)

  // function getData() {
  //   axios.get(DBurl)
  //     .then(res => {
  //       setData(res.data)

  //     })
  // }

  useEffect(() => {
    getData()
  }, [])

  function deleteData(id) {
    let dataId = data.filter(el => el.id !== id)
    setData(dataId)

    axios.delete(`${DBurl}/${id}`)
      .then(() => {
        getData()
      })
  }

  function handleModalClose() {
    setModalProduct(null)
  }
  return (
    <>
     <Table style={{ width: "80%", margin: "0 auto" }}>
        <thead>
          <tr>
          <th>image</th>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Details</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {
            data && data.map(product => (
              <tr key={product.id}>
                <td><img src={product.image} alt="" style={{width:"80px",height:"80px",objectFit:"contain"}}/></td>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.author}</td>
                <td>{product.price}$</td>
                <td><button className='btn btn-success'>Edit</button></td>
                <td><button className="btn btn-info" style={{color:'white'}} onClick={() =>setModalProduct(product)}>Info</button></td>
                <td><button className='btn btn-danger'  onClick={() => deleteData(product.id)}>Delete</button> </td>
              

              </tr>
            ))
          }
        </tbody>
      </Table> 

      {modalProduct && (
        <div className='modal'>
          <div className='modal-content '>
            <h2>Product Info</h2>
            <img src={modalProduct.image} alt=""  style={{ height: '200px', objectFit: 'contain' }} />
            <p><strong>title:</strong> {modalProduct.title}</p>
            <p><strong>description:</strong> {modalProduct.description}</p>
            <p><strong>author:</strong> {modalProduct.author}</p>
            <p><strong>price:</strong> {modalProduct.price}$</p>
            <p><strong>pages count:</strong> {modalProduct.pagesCount}</p>
            <p><strong>genre:</strong> {modalProduct.genre}</p>
            <p><strong>published year:</strong> {modalProduct.publishedYear}</p>
            <p><strong>language:</strong> {modalProduct.language}</p>
            <button className='custom-button' onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )} 
    </>
  )
}

export default AdminProducts