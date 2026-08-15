import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const subtotal = state.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const totalItems = state.reduce(
    (total, item) => total + item.qty,
    0
  );

  const shipping = 30;

  const [error, setError] = useState("");

  const handleCheckout = (e) => {
    e.preventDefault();

    const form = document.getElementById("checkoutForm");

    if (!form.checkValidity()) {
      setError(
        "Please complete all required information before proceeding to checkout."
      );
      form.reportValidity();
      return;
    }

    setError("");
    alert("Order placed successfully!");
  };

  const EmptyCart = () => (
    <section className="container py-5 bg-light text-center">
      <h4 className="display-5 p-3">No item in Cart</h4>

      <Link to="/" className="btn btn-outline-dark">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </section>
  );

  const ShowCheckout = () => (
    <section className="container py-5">
      <div className="row my-4">

        <aside className="col-md-5 col-lg-4 order-md-last">
          <div className="card mb-4">

            <header className="card-header bg-light py-3">
              <h5 className="mb-0">Order Summary</h5>
            </header>

            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  Products ({totalItems})
                  <span>฿{Math.round(subtotal)}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  Shipping
                  <span>฿{shipping}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total amount</strong>
                  <strong>฿{Math.round(subtotal + shipping)}</strong>
                </li>
              </ul>
            </div>

          </div>
        </aside>

        <article className="col-md-7 col-lg-8">
          <div className="card mb-4">

            <header className="card-header py-3">
              <h4 className="mb-0">Billing address</h4>
            </header>

            <div className="card-body">

              <form
                id="checkoutForm"
                className="needs-validation"
                noValidate
              >

                <div className="row g-3">

                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
  type="text"
  className="form-control"
  id="firstName"
  pattern="[A-Za-z ]+"
  title="Only letters are allowed"
  required
/>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
  type="text"
  className="form-control"
  id="lastName"
  pattern="[A-Za-z ]+"
  title="Only letters are allowed"
  required
/>                 
                    
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">
                      Address 2
                      <span className="text-muted"> (Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                    />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select className="form-select" id="country" required>
                      <option value="">Choose...</option>
                      <option>Thailand</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select className="form-select" id="state" required>
                      <option value="">Choose...</option>
                      <option>Yala</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
  type="text"
  className="form-control"
  id="zip"
  pattern="[0-9]{5}"
  maxLength="5"
  title="Enter 5 digits"
  required
/>
                  </div>

                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="row gy-3">

                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      Name on card
                    </label>
                    <input
  type="text"
  className="form-control"
  id="cc-name"
  pattern="[A-Za-z ]+"
  title="Enter card holder name"
  required
/>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      Credit card number
                    </label>
                   <input
  type="text"
  className="form-control"
  id="cc-number"
  pattern="[0-9]{16}"
  maxLength="16"
  title="Enter 16-digit card number"
  required
/>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      Expiration
                    </label>
                    <input
  type="text"
  className="form-control"
  id="cc-expiration"
  pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
  placeholder="MM/YY"
  title="Example: 08/29"
  required
/>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                      CVV
                    </label>
                   <input
  type="text"
  className="form-control"
  id="cc-cvv"
  pattern="[0-9]{3,4}"
  maxLength="4"
  title="3 or 4 digits"
  required
/>
                  </div>

                </div>

                <hr className="my-4" />

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <button
                  className="w-100 btn btn-primary"
                  type="button"
                  onClick={handleCheckout}
                >
                  Continue to Checkout
                </button>

              </form>

            </div>

          </div>
        </article>

      </div>
    </section>
  );

  return (
    <>
      <Navbar />

      <main className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </main>

      <Footer />
    </>
  );
};

export default Checkout;