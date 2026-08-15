import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  // نجيب بيانات السلة من الـ Redux Store
  const state = useSelector((state) => state.handleCart);
  // دالة الـ dispatch عشان نرسل الأكشنات (زيادة/نقصان المنتجات) للـ Redux
  const dispatch = useDispatch();

  // نحسب المجموع الفرعي (subtotal) عن طريق ضرب سعر كل منتج × الكمية وجمعها كلها
  const subtotal = state.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // نحسب عدد القطع الكلي بالسلة (مجموع كل الكميات)
  const totalItems = state.reduce(
    (total, item) => total + item.qty,
    0
  );

  // تكلفة الشحن ثابتة
  const shipping = 30;

  // مكون صغير يطلع لو السلة فاضية
  const EmptyCart = () => (
    <section className="container py-5 bg-light text-center">
      <h4 className="display-5 p-3">Your Cart is Empty</h4>
      {/* زر يرجع المستخدم للصفحة الرئيسية عشان يكمل تسوق */}
      <Link to="/" className="btn btn-outline-dark">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </section>
  );

  // مكون يعرض محتويات السلة لو فيها منتجات
  const ShowCart = () => (
    <section className="container py-5">
      <div className="row justify-content-center">

        {/* قسم عرض قائمة المنتجات اللي بالسلة */}
        <article className="col-md-8">
          <div className="card mb-4">
            <header className="card-header py-3">
              <h5 className="mb-0">Item List</h5>
            </header>

            <div className="card-body">
              {/* نلف على كل منتج بالسلة ونعرضه */}
              {state.map((item) => (
                <article key={item.id}>
                  <div className="row align-items-center">

                    {/* صورة المنتج */}
                    <div className="col-lg-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        width="100"
                        height="75"
                      />
                    </div>

                    {/* اسم المنتج */}
                    <div className="col-lg-5">
                      <strong>{item.title}</strong>
                    </div>

                    <div className="col-lg-4">
                      {/* زر ينقص من كمية المنتج */}
                      <button
                        className="btn px-3"
                        onClick={() => dispatch(delCart(item))}
                      >
                        <i className="fas fa-minus"></i>
                      </button>

                      {/* عرض الكمية الحالية للمنتج */}
                      <span className="mx-4">{item.qty}</span>

                      {/* زر يزيد كمية المنتج */}
                      <button
                        className="btn px-3"
                        onClick={() => dispatch(addCart(item))}
                      >
                        <i className="fas fa-plus"></i>
                      </button>

                      {/* عرض الكمية × السعر */}
                      <p>
                        <strong>
                          {item.qty} x ฿{item.price}
                        </strong>
                      </p>
                    </div>

                  </div>
                  <hr />
                </article>
              ))}
            </div>
          </div>
        </article>


        {/* قسم ملخص الطلب (سايد بار) */}
        <aside className="col-md-4">
          <div className="card mb-4">

            <header className="card-header bg-light">
              <h5>Order Summary</h5>
            </header>

            <div className="card-body">
              <ul className="list-group list-group-flush">

                {/* عدد المنتجات وسعرها الكلي (بدون الشحن) */}
                <li className="list-group-item d-flex justify-content-between">
                  Products ({totalItems})
                  <span>฿{Math.round(subtotal)}</span>
                </li>

                {/* تكلفة الشحن */}
                <li className="list-group-item d-flex justify-content-between">
                  Shipping
                  <span>฿{shipping}</span>
                </li>

                {/* المبلغ الإجمالي (المنتجات + الشحن) */}
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total amount</strong>
                  <strong>
                    ฿{Math.round(subtotal + shipping)}
                  </strong>
                </li>

              </ul>

              {/* زر يوديك لصفحة الدفع (checkout) */}
              <Link
                to="/checkout"
                className="btn btn-dark btn-lg w-100 mt-3"
              >
                Go to checkout
              </Link>

            </div>
          </div>
        </aside>

      </div>
    </section>
  );

  // هذا هو الجزء اللي يرجعه المكون الرئيسي Cart
  return (
    <>
      {/* شريط التنقل فوق */}
      <Navbar />

      <main className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {/* لو فيه منتجات بالسلة نعرض ShowCart، لو فاضية نعرض EmptyCart */}
        {state.length ? <ShowCart /> : <EmptyCart />}
      </main>

      {/* الفوتر تحت */}
      <Footer />
    </>
  );
};

export default Cart;