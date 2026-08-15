// نستورد React مع useEffect و useState
// useState: عشان نخزن بيانات تتغير (زي المنتج، حالة التحميل...)
// useEffect: عشان ننفذ كود معين تلقائيًا عند تحميل الصفحة أو تغيّر شي معين (زي الـ id)
import React, { useEffect, useState } from "react";

// مكتبة تعرض شكل "هيكل تحميل" (Skeleton Loading) بدل السبينر العادي
// يعطي إحساس بصري إن المحتوى جاي وبيظهر قريب (تجربة مستخدم أحسن)
import Skeleton from "react-loading-skeleton";

// Link: رابط داخلي بدون إعادة تحميل الصفحة
// useParams: Hook يقرأ لنا القيم المتغيرة من رابط المسار (URL) زي :id
import { Link, useParams } from "react-router-dom";

// مكتبة تسوي تأثير "شريط متحرك" (Marquee) عشان نعرض المنتجات المشابهة وهي تتحرك أفقيًا
import Marquee from "react-fast-marquee";

// useDispatch: عشان نرسل أكشن addCart لـ Redux Store
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";

const Product = () => {
  // مصفوفة ثابتة (Static Array) فيها كل منتجات الجامعة
  // بالمشروع الحقيقي/الاحترافي، هذي البيانات المفروض تجي من API أو قاعدة بيانات
  // بس هنا محطوطة يدويًا (Hardcoded) عشان أغراض العرض والتجربة
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

  // useParams يجيب لنا قيمة :id من رابط المسار
  // مثال: لو الرابط /product/3 → id بيكون "3"
  const { id } = useParams();

  // state يخزن بيانات المنتج الحالي اللي المستخدم فاتحه
  const [product, setProduct] = useState({});
  // state يخزن قائمة المنتجات المشابهة (نفس الفئة/category)
  const [similarProducts, setSimilarProducts] = useState([]);
  // state يتحكم بحالة تحميل المنتج الرئيسي (true = لسا يحمّل)
  const [loading, setLoading] = useState(true);
  // state يتحكم بحالة تحميل المنتجات المشابهة (منفصل عن التحميل الأول)
  const [loading2, setLoading2] = useState(true);

  const dispatch = useDispatch();

  // دالة تضيف منتج معين للسلة عن طريق إرسال أكشن addCart لـ Redux
  const addProduct = (product) => {
    dispatch(addCart(product));
  };


  // useEffect يشتغل تلقائيًا أول ما الصفحة تفتح، وكل مرة يتغير فيها id
  // (يعني لو المستخدم فتح منتج ثاني، بيعيد تنفيذ هذا الكود من جديد)
  useEffect(() => {
    const getProduct = () => {
      // نفعّل حالة التحميل قبل ما نبدأ نجيب البيانات
      setLoading(true);
      setLoading2(true);

      // نبحث بمصفوفة universityProducts عن المنتج اللي يطابق الـ id من الرابط
      // نحول id لرقم بـ Number() لأن useParams يرجعه كنص (String) دايمًا
      const currentProduct = universityProducts.find(
        (item) => item.id === Number(id)
      );

      // نخزن المنتج اللي لقيناه بالـ state
      setProduct(currentProduct);

      // نفلتر باقي المنتجات ونجيب بس اللي بنفس الفئة (category)
      // وبنفس الوقت نستثني المنتج نفسه (item.id !== currentProduct.id)
      const similar = universityProducts.filter(
        (item) =>
          item.category === currentProduct.category &&
          item.id !== currentProduct.id
      );

      setSimilarProducts(similar);

      // خلصنا التحميل، نطفي حالة التحميل عشان يطلع المحتوى الحقيقي
      setLoading(false);
      setLoading2(false);
    };

    getProduct();
  }, [id]); // [id] معناها: نفّذ هذا الكود من جديد كل ما تغيرت قيمة id


  // مكون صغير يعرض هيكل تحميل (Skeleton) للمنتج الرئيسي وهو لسا يحمّل
  const Loading = () => (
    <section className="container my-5 py-2">
      <div className="row">

        {/* هيكل تحميل مكان صورة المنتج */}
        <div className="col-md-6">
          <Skeleton height={400} width={400} />
        </div>

        {/* هيكل تحميل مكان تفاصيل المنتج (العنوان، السعر، الوصف) */}
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={50} />
          <Skeleton height={120} />
        </div>

      </div>
    </section>
  );


  // مكون يعرض تفاصيل المنتج الحقيقية بعد ما يخلص التحميل
  const ShowProduct = () => (
    <section className="container my-5 py-2">
      <div className="row">

        {/* صورة المنتج */}
        <div className="col-md-6 py-3">
          <img
            className="img-fluid"
            src={product.image}
            alt={product.title}
            width="400"
            height="400"
          />
        </div>


        <article className="col-md-6 py-5">

          {/* فئة المنتج (رجالي/نسائي) */}
          <h4 className="text-uppercase text-muted">
            {product.category}
          </h4>

          {/* اسم المنتج */}
          <h1 className="display-5">
            {product.title}
          </h1>

          {/* سعر المنتج بالبات التايلندي (฿) */}
          <h3 className="display-6 my-4">
            ฿{product.price}
          </h3>

          {/* وصف المنتج */}
          <p className="lead">
            {product.description}
          </p>


          {/* زر يضيف المنتج الحالي للسلة */}
          <button
            className="btn btn-outline-dark"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>


          {/* رابط يودي مباشرة لصفحة السلة */}
          <Link
            to="/cart"
            className="btn btn-dark mx-3"
          >
            Go to Cart
          </Link>

        </article>

      </div>
    </section>
  );

  // مكون يعرض هيكل تحميل (Skeleton) لقسم "المنتجات المشابهة" وهي لسا تحمّل
  // نستخدم [1, 2, 3, 4].map عشان نكرر نفس شكل الهيكل 4 مرات (4 بطاقات وهمية)
  const Loading2 = () => (
    <div className="d-flex">

      {[1, 2, 3, 4].map((item) => (
        <div className="mx-4" key={item}>
          <Skeleton height={300} width={220} />
        </div>
      ))}

    </div>
  );


  // مكون يعرض المنتجات المشابهة الحقيقية بعد ما تخلص التحميل
  const ShowSimilarProduct = () => (
    <div className="d-flex">

      {/* نلف على كل منتج بمصفوفة similarProducts ونسوي له بطاقة (Card) */}
      {similarProducts.map((item) => (
        <article
          key={item.id} // key ضروري بـ React لما نستخدم map، يساعده يميز كل عنصر
          className="card mx-4 text-center"
          style={{ width: "250px" }} // نستخدم style بصيغة object لأن هذا JSX مو HTML عادي
        >

          {/* صورة المنتج المشابه */}
          <img
            className="card-img-top p-3"
            src={item.image}
            alt={item.title}
            height="250"
          />


          <div className="card-body">

            {/* 
              اسم المنتج، نقصه لأول 15 حرف بس بواسطة substring(0, 15)
              عشان ما يطول العنوان ويكسر تصميم البطاقة، ونضيف "..." بعده يدويًا
            */}
            <h5 className="card-title">
              {item.title.substring(0, 15)}...
            </h5>


            {/* سعر المنتج */}
            <p>
              ฿{item.price}
            </p>


            {/* رابط يودينا لصفحة تفاصيل هذا المنتج المشابه (Dynamic Route) */}
            <Link
              to={`/product/${item.id}`}
              className="btn btn-dark m-1"
            >
              View
            </Link>


            {/* زر يضيف المنتج المشابه مباشرة للسلة بدون ما نروح لصفحته */}
            <button
              className="btn btn-dark m-1"
              onClick={() => addProduct(item)}
            >
              Add
            </button>

          </div>

        </article>
      ))}

    </div>
  );


  // هذا الجزء اللي يرجعه المكون الرئيسي Product
  return (
    <>
      <Navbar />

      <main>

        {/* 
          Conditional Rendering: لو loading لسا true نعرض Loading (الهيكل)
          لو خلص التحميل (false) نعرض ShowProduct (المحتوى الحقيقي)
        */}
        {loading ? (
          <Loading />
        ) : (
          <ShowProduct />
        )}


        {/* قسم "منتجات ممكن تعجبك" */}
        <section className="container my-5 py-5">

          <h2>
            You may also like
          </h2>


          {/* 
            Marquee يخلي المحتوى بداخله يتحرك أفقيًا بشكل مستمر (شريط متحرك)
            pauseOnHover: يوقف الحركة لما نحط الماوس فوقه
            pauseOnClick: يوقف الحركة لما نضغط عليه
            speed: سرعة الحركة
          */}
          <Marquee
            pauseOnHover={true}
            pauseOnClick={true}
            speed={50}
          >

            {/* نفس فكرة Conditional Rendering، بس هذي المرة لقسم المنتجات المشابهة */}
            {loading2 ? (
              <Loading2 />
            ) : (
              <ShowSimilarProduct />
            )}

          </Marquee>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Product;