// نستورد React و useState (Hook) عشان نقدر نخزن ونحدّث بيانات الفورم
import React, { useState } from "react";
import { Footer, Navbar } from "../components";

const ContactPage = () => {
  // كل حقل بالفورم له state خاص فيه يخزن القيمة اللي يكتبها المستخدم
  const [name, setName] = useState("");       // يخزن الاسم
  const [email, setEmail] = useState("");      // يخزن الإيميل
  const [message, setMessage] = useState("");  // يخزن نص الرسالة

  // state لرسالة الخطأ (لو فيه غلط بالإدخال)
  const [error, setError] = useState("");
  // state لرسالة النجاح (لو الإرسال تم بنجاح)
  const [success, setSuccess] = useState("");

  // دالة تشتغل لما المستخدم يضغط زر "Send" (submit)
  const handleSubmit = (e) => {
    // نمنع الصفحة من إعادة التحميل (السلوك الافتراضي للفورم بـ HTML)
    e.preventDefault();

    // نصفّر رسائل الخطأ والنجاح القديمة قبل كل محاولة إرسال جديدة
    setError("");
    setSuccess("");

    // نتحقق: هل فيه حقل فاضي؟ (trim() يشيل الفراغات من البداية والنهاية)
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete all required information.");
      return; // نوقف تنفيذ الدالة هنا لو فيه حقل ناقص
    }

    // نتحقق من الاسم: نستخدم Regular Expression (نمط) يقبل بس حروف إنجليزية ومسافات
    const namePattern = /^[A-Za-z ]+$/;

    // لو الاسم ما طابق النمط (يعني فيه أرقام أو رموز)، نطلع رسالة خطأ
    if (!namePattern.test(name)) {
      setError("Name must contain letters only.");
      return;
    }

    // نتحقق من صيغة الإيميل باستخدام Regular Expression
    // النمط يتأكد إن فيه: نص قبل @ + @ + نص بعدها + نقطة + نص بعد النقطة
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // لو الإيميل ما طابق الصيغة الصحيحة، نطلع رسالة خطأ
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // لو كل الشروط انسحبت صح (يعني ما رجعنا return فوق)، نعتبر البيانات صحيحة
    setSuccess("Your message has been sent successfully!");

    // نفضّي الفورم بعد الإرسال الناجح، عشان يرجع فاضي للمستخدم
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar />

      <main className="container my-3 py-3">

        <header>
          <h1 className="text-center">Contact Us</h1>
          <hr />
        </header>

        <section className="row my-4 h-100">

          <article className="col-md-4 col-lg-4 col-sm-8 mx-auto">

            {/* لما نضغط submit، يتنفذ handleSubmit اللي كتبناها فوق */}
            <form onSubmit={handleSubmit}>

              {/* حقل الاسم */}
              <section className="form my-3">
                <label htmlFor="Name">Name</label>

                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter your name"
                  value={name} // القيمة الحالية للحقل مربوطة بـ state (Controlled Input)
                  onChange={(e) => setName(e.target.value)} // كل ما يكتب المستخدم حرف، نحدّث الـ state
                  required // خاصية HTML أساسية تمنع الإرسال لو الحقل فاضي (حماية إضافية من المتصفح)
                />
              </section>

              {/* حقل الإيميل */}
              <section className="form my-3">
                <label htmlFor="Email">Email</label>

                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </section>

              {/* حقل الرسالة */}
              <section className="form my-3">
                <label htmlFor="Message">Message</label>

                <textarea
                  rows={5}
                  className="form-control"
                  id="Message"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </section>

              {/* 
                رسالة الخطأ: تطلع بس لو فيه قيمة بمتغير error (Conditional Rendering)
                error && (...)  يعني: لو error فيه نص (true)، اعرض العنصر اللي بعده
              */}
              {error && (
                <p className="text-danger text-center">
                  {error}
                </p>
              )}

              {/* رسالة النجاح: نفس فكرة رسالة الخطأ بس تطلع لو success فيها قيمة */}
              {success && (
                <p className="text-success text-center">
                  {success}
                </p>
              )}

              {/* زر الإرسال، لاحظ إنه ما فيه disabled هذي المرة لأن الفورم صار شغّال */}
              <footer className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  Send
                </button>
              </footer>

            </form>

          </article>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default ContactPage;