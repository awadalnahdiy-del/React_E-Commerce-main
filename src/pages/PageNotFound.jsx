// نستورد React عشان نقدر نستخدم صيغة JSX
import React from "react";

// نستورد Link من react-router-dom عشان نسوي روابط داخلية بدون ما الصفحة تعيد تحميل كاملة
// (يختلف عن وسم <a> العادي اللي يعمل Full Page Reload)
import { Link } from "react-router-dom";

// نستورد Navbar بس (بدون Footer هالمرة) من مجلد components
import { Navbar } from "../components";

// مكون فانكشن (Functional Component) اسمه PageNotFound
// وظيفته إنه يعرض صفحة خطأ 404، تطلع لما المستخدم يروح لمسار (Route) مو موجود بالموقع
const PageNotFound = () => {
  return (
    // Fragment <>...</> عشان نرجع أكثر من عنصر بدون إضافة div زيادة
    <>
      {/* شريط التنقل يطلع فوق حتى بصفحة الخطأ */}
      <Navbar />

      {/* المحتوى الرئيسي للصفحة */}
      <main className="container my-3 py-3">

        {/* 
          section تحتوي رسالة الخطأ:
          py-5: حشوة فوق وتحت
          bg-light: خلفية رمادية فاتحة (Bootstrap)
          text-center: توسيط النص
        */}
        <section className="py-5 bg-light text-center">

          {/* 
            عنوان يوضح للمستخدم إن الصفحة اللي يدورها مو موجودة
            display-5: كلاس Bootstrap يخلي حجم الخط كبير وبارز
            p-3: حشوة حوالين العنوان
          */}
          <h4 className="p-3 display-5">
            404: Page Not Found
          </h4>

          {/* 
            رابط يرجع المستخدم للصفحة الرئيسية "/"
            نستخدم Link بدل <a> عشان التنقل يصير بدون إعادة تحميل الصفحة كاملة (Client-side Routing)
          */}
          <Link
            to="/"
            className="btn btn-outline-dark"
          >
            {/* أيقونة سهم رجوع من Font Awesome */}
            <i className="fa fa-arrow-left"></i> Go Back to Home
          </Link>

        </section>
      </main>
    </>
  );
};

// نصدّر المكون عشان نربطه بالراوتر App.js كصفحة احتياطية (Fallback Route)
// تطلع تلقائيًا لأي مسار (URL) غير معرّف بالتطبيق
export default PageNotFound;