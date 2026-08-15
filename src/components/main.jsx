import React from "react";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero border-1 pb-3">
        <article className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/Haramain.jpg"
            alt="Haramain Mosque"
            height={500}
          />

          <header className="card-img-overlay d-flex align-items-center">
            <section className="container">
              <h1
                className="fw-bold"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
              >
                Fatoni University Shop
              </h1>

              <p
                className="fs-5"
                style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.8)" }}
              >
                We are committed to creating a sustainable learning and
                development environment in all dimensions—education, religion,
                and ethics—to empower students and staff to reach their full
                potential.
              </p>

              <a href="/product" className="btn btn-success btn-lg mt-3">
                Shop Now
              </a>
            </section>
          </header>
        </article>
      </section>

      {/* About Store */}
      <main className="container py-5">
        <article className="text-center">
          <h2 className="fw-bold">
            Official Merchandise of Fatoni University
          </h2>

          <p className="lead mt-3">
            Explore our official university uniforms and accessories designed
            for Fatoni University students and staff.
          </p>
        </article>
      </main>
    </>
  );
};

export default Home;