// هذا الملف يسمونه "Barrel File" أو ملف تجميع
// وظيفته إنه يجمع كل الصفحات (Pages) بمكان وحد ويصدّرها مرة وحدة
// كذا بدل ما نستورد كل صفحة من ملفها الأصلي بمسار طويل، نقدر نستوردهم كلهم من مكان وحد بسطر وحد
// مثال: import { Home, Cart, Login } from "../pages";  بدل ما نكتب import منفصل لكل صفحة

// نصدّر صفحة Home (الصفحة الرئيسية) بس نسميها "Home" بدل الاسم الافتراضي (default)
export { default as Home } from './Home';

// نصدّر صفحة Products (صفحة عرض كل المنتجات)
export { default as Products } from './Products';

// نصدّر صفحة Product (صفحة تفاصيل منتج وحد بعينه)
export { default as Product } from './Product';

// نصدّر صفحة AboutPage (من نحن)
export { default as AboutPage } from './AboutPage';

// نصدّر صفحة ContactPage (تواصل معنا)
export { default as ContactPage } from './ContactPage';

// نصدّر صفحة Cart (سلة المشتريات)
export { default as Cart } from './Cart';

// نصدّر صفحة Login (تسجيل الدخول)
export { default as Login } from './Login';

// نصدّر صفحة Register (إنشاء حساب جديد)
export { default as Register } from './Register';

// نصدّر صفحة Checkout (إتمام عملية الشراء والدفع)
export { default as Checkout } from './Checkout';

// نصدّر صفحة PageNotFound (صفحة الخطأ 404، تطلع لو المستخدم راح لمسار مو موجود)
export { default as PageNotFound } from './PageNotFound';