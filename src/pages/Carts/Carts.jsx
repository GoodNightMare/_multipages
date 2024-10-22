import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Carts.css";

function Carts({ carts, setCarts }) {
  return (
    <div className="container-carts">
      <div className="carts-items-container">
        {carts.map((cart) => (
          <div key={cart.id}>
            <Card style={{ width: "13rem" }} key={cart.id}>
              <Card.Img variant="top" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text className="fw-bold fs-4">$ {cart.price}</Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    setCarts(carts.filter((c) => c.id !== cart.id))
                  }
                >
                  Remove From Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <h3 className="text-center">
        Product : <span className="badge bg-danger">{carts.length} items</span> , Total : $ <span className="badge bg-success">{carts.reduce((a, b) => a + b.price, 0).toFixed(2)}</span>
      </h3>
      <div className="d-flex justify-content-center">
        <button className="btn btn-warning">Checkout <span className="bi bi-credit-card-fill"></span>
        </button>
      </div>
    </div>
  );
}

export default Carts;
