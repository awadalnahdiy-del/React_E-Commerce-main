import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    setLoading(true);

    const universityProducts = [
      {
        id: 1,
        title: "Fatoni Hijab",
        price: 250,
        image: "/assets/hijap.png",
        description: "Official Fatoni University Hijab",
        category: "women",
      },
      {
        id: 2,
        title: "Green Abaya",
        price: 550,
        image: "/assets/abaya.png",
        description: "Official Fatoni University Abaya",
        category: "women",
      },
      {
        id: 3,
        title: "Green Pants",
        price: 400,
        image: "/assets/pants.png",
        description: "Official Fatoni University Pants",
        category: "men",
      },
      {
        id: 4,
        title: "White Shirt",
        price: 300,
        image: "/assets/shirt.png",
        description: "Official Fatoni University Shirt",
        category: "men",
      },
      {
        id: 5,
        title: "Black Shoes",
        price: 650,
        image: "/assets/shose.png",
        description: "Official Black Shoes",
        category: "men",
      },
    ];

    setData(universityProducts);
    setFilter(universityProducts);
    setLoading(false);
  }, []);

  const Loading = () => {
    return (
      <>
        <section className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </section>

        <article className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </article>

        <article className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </article>

        <article className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </article>

        <article className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </article>

        <article className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </article>

        <article className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </article>
      </>
    );
  };
  const filterProduct = (cat) => {
  const updatedList = data.filter((item) => item.category === cat);
  setFilter(updatedList);
};

const ShowProducts = () => {
  return (
    <>
      {filter.map((product) => {
        return (
          <article
            id={product.id}
            key={product.id}
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
          >
            <div className="card text-center h-100">
              <img
                className="card-img-top p-3"
                src={product.image}
                alt={product.title}
                height={350}
              />

              <section className="card-body">
                <h5 className="card-title">
                  {product.title.substring(0, 12)}...
                </h5>

                <p className="card-text">
                  {product.description.substring(0, 90)}...
                </p>
              </section>

              <ul className="list-group list-group-flush">
                <li className="list-group-item lead">
                  ฿ {product.price}
                </li>
              </ul>

              <footer className="card-body">
                <Link
                  to={"/product/" + product.id}
                  className="btn btn-dark m-1"
                >
                  Order Now
                </Link>

                <button
                  className="btn btn-dark m-1"
                  onClick={() => {
                    toast.success("Added to cart");
                    addProduct(product);
                  }}
                >
                  Add to Basket
                </button>
              </footer>
            </div>
          </article>
        );
      })}
    </>
  );
};

return (
  <main className="container my-3 py-3">
    <header className="row">
      <section className="col-12">
        <h2 className="display-5 text-center fw-bold">
          Fatoni University Merchandise
        </h2>
        <hr />
      </section>
    </header>

    <section className="row justify-content-center">
      {loading ? <Loading /> : <ShowProducts />}
    </section>
  </main>
);
};

export default Products;
  