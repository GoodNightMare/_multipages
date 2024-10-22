import React from 'react'
import { Button, Card } from 'react-bootstrap'
import './Products.css'

function Products({products, carts, setCarts}) {
  return (
    <div className='container-products'>
      {products.map((product) => (
            <Card style={{ width: '13rem' }} key={product.id}>
            <Card.Img variant="top" src={product.thumbnailUrl} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text className='fw-bold fs-4'>
                $ {product.price} 
              </Card.Text>
              {carts.find((cart)=> cart.id === product.id) ? 
              <span className='badge bg-danger p-2 fs-6'>Product Added</span> : 
              <Button variant="outline-primary" onClick={()=>{setCarts([...carts, product])}}>Add To Cart</Button>}
            </Card.Body>
          </Card>
      ))}
    </div>
  )
}

export default Products