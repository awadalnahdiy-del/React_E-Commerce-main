// نستورد React عشان نقدر نسوي مكونات (Components) بصيغة JSX
import React from 'react'

// نستورد مكونين جاهزين من مجلد components: 
// Footer (تذييل الصفحة) و Navbar (شريط التنقل العلوي)
// كذا نتفادى نكرر نفس الكود بكل صفحة، ونستخدمهم جاهزين
import { Footer, Navbar } from "../components";

// هذا مكون فانكشن (Functional Component) اسمه AboutPage
// وظيفته إنه يعرض صفحة "About Us" (من نحن) بالموقع
const AboutPage = () => {
  // كل مكون React لازم يرجع (return) عنصر JSX واحد
  // عشان نقدر نرجع أكثر من عنصر بدون ما نلفهم بـ div زايد، نستخدم Fragment <>...</>
  return (
    <>
      {/* شريط التنقل يطلع فوق بكل الصفحات، هنا نستدعيه بالأعلى */}
      <Navbar />

      {/* 
        وسم <article> هو وسم HTML5 دلالي (Semantic Tag)
        نستخدمه هنا لأن المحتوى اللي بداخله يمثل محتوى مستقل ومكتمل بذاته (نبذة عني)
        الكلاسات container my-3 py-3 هي كلاسات Bootstrap:
        - container: تحدد عرض المحتوى وتوسطه بالصفحة
        - my-3: مسافة (margin) فوق وتحت
        - py-3: حشوة (padding) فوق وتحت
      */}
      <article className="container my-3 py-3">

        {/* عنوان الصفحة الرئيسي، وسط الصفحة بفضل كلاس text-center */}
        <h1 className="text-center">About Us</h1>

        {/* خط أفقي فاصل بين العنوان والمحتوى */}
        <hr />

        {/* 
          فقرة نصية تحتوي معلومات عني كصاحب المشروع
          كلاس lead من Bootstrap يخلي حجم الخط أكبر شوي ومميز عن باقي الفقرات العادية
          وكلاس text-center يخلي النص وسط الصفحة
        */}
        <p className="lead text-center">
          {/* 
            هذا النص التعريفي يشرح:
            1) مين أنا (الاسم والتخصص والجامعة)
            2) طبيعة المشروع (مشروع تخرج/مشروع جامعي)
            3) التقنيات المستخدمة بالمشروع (React, Bootstrap, HTML, CSS, JavaScript)
            4) الهدف من المشروع (متجر إلكتروني لمنتجات جامعة فطاني الرسمية)
          */}
          My name is Awadh Mubarak Badr, an Information Technology student at Fatoni University.

This website was developed as a university project using React, Bootstrap, HTML, CSS, and JavaScript. It demonstrates my web development skills by creating an online store for official Fatoni University merchandise.
        </p>
      </article>

      {/* الفوتر (تذييل الصفحة) يطلع تحت بكل الصفحات */}
      <Footer />
    </>
  )
}

// نصدّر المكون عشان نقدر نستورده ونستخدمه بملفات ثانية (زي App.js أو ملف الراوتر)
export default AboutPage