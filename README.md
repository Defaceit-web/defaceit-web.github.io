# DefaceIT-Web 🛡️
### Secure, Offline Video Anonymization Tool / ابزار امن و آفلاین تار کردن ویدیو

**DefaceIT-Web** is a browser-based tool designed to protect anonymity by automatically blurring faces and license plates in videos.

Built with **privacy as the absolute priority**, this tool runs entirely on your device using WebAssembly and Neural Networks. **No video data is ever sent to a server.**

# Defaceit is accessable on [Defaceit-web.github.io](https://Defaceit-web.github.io)

---

## 🔒 Security & Privacy Guarantee
### تضمین امنیت و حریم خصوصی

This project was built to ensure the safety of activists, journalists, and privacy-conscious individuals.

*   **100% Client-Side:** All processing happens inside your browser using your computer's CPU/GPU.
*   **Zero Data Transfer:** No video, audio, or metadata ever leaves your device.
*   **Offline Capable:** You can disconnect your internet after loading the page, and the tool will still work perfectly.
*   **Open Source:** The code is transparent and verifiable.

---

## ✨ Features

*   **AI Detection:** Uses the state-of-the-art **YOLOv11** (Nano) model for fast and accurate detection.
*   **Dual Detection:** Detects **Faces** and **License Plates** (selectable).
*   **Smart Blurring:** Applies a pixelated blur effect to preserve the context of the video while hiding identities.
*   **High Performance:** Utilizes **WebAssembly (WASM)** and multi-threading for faster processing.
*   **Modern Output:** Exports videos in widely supported **MP4 (H.264)** format with AAC audio.
*   **Bilingual:** Full support for **Persian (Farsi)** and **English** with RTL layout support.

---

## 🚀 How to Run Locally

Because this project uses advanced browser features (Service Workers for multi-threading and WebCodecs), **you cannot simply double-click `index.html`**. You must run it via a local server.

### Prerequisites
1.  **Python** installed on your computer.
2.  The `yolo11n.onnx` model file in the project directory.

### Steps
1.  **Download/Clone** this repository.
2.  **Generate/Download the Model:**
    Ensure `yolo11n.onnx` is in the root folder. If you don't have it, run the provided Python script or download a YOLOv11 Nano ONNX model (opset 12).
3.  **Open Terminal/Command Prompt** in the project folder.
4.  **Start a Local Server:**
    ```bash
    python -m http.server
    ```
5.  **Open Browser:**
    Go to `http://localhost:8000`

### Running on GitHub Pages
This project is optimized for GitHub Pages. Simply upload the files to a repository and enable GitHub Pages in the settings. The `coi-serviceworker.js` file ensures that high-performance headers are active.

---

## 🛠️ Tech Stack

*   **Frontend:** HTML5, CSS3 (Glassmorphism UI), Vanilla JavaScript.
*   **AI Engine:** [ONNX Runtime Web](https://github.com/microsoft/onnxruntime) (WASM backend).
*   **Video Processing:** [Mp4Muxer](https://github.com/Vanilagy/mp4-muxer) & WebCodecs API.
*   **Optimization:** `coi-serviceworker` for Cross-Origin Isolation (enabling SharedArrayBuffer).

---

## ⚠️ Requirements

*   **Browser:** A modern browser is required (Chrome 94+, Edge 94+, Firefox 93+).
*   **Hardware:** A device with a decent CPU is recommended. GPU acceleration is used where supported by the browser.

---

## 🤝 Credits & Support

*   **Web Version Developer:** Anonymous Contributor (Daffy Duck)
*   **Original Concept/Base:** Thanks to [Shin](https://x.com/hey_itsmyturn) for the inspiration and base concepts.

### Support the Original Creator
If you find this tool useful, consider sharing the word.

---

## 📄 License

This project is open-source. Feel free to fork, modify, and distribute it to help protect privacy worldwide.

---

<div dir="rtl">

# DefaceIT-Web 🛡️
### ابزار امن و آفلاین تار کردن ویدیو برای حفظ امنیت

**DefaceIT-Web** یک ابزار تحت وب است که برای محافظت از ناشناس ماندن افراد طراحی شده و به صورت خودکار چهره‌ها و پلاک خودروها را در ویدیوها تار می‌کند.

این ابزار با **اولویت مطلق بر حریم خصوصی** ساخته شده است و به طور کامل بر روی دستگاه شما (با استفاده از WebAssembly و شبکه‌های عصبی) اجرا می‌شود. **هیچ ویدیویی هرگز به هیچ سروری ارسال نمی‌شود.**

---

## 🔒 تضمین امنیت و حریم خصوصی

این پروژه برای اطمینان از امنیت فعالان مدنی، روزنامه‌نگاران و افرادی که به حریم خصوصی خود اهمیت می‌دهند ساخته شده است.

*   **۱۰۰٪ سمت کاربر (Client-Side):** تمام پردازش‌ها در داخل مرورگر شما و با استفاده از CPU/GPU دستگاه خودتان انجام می‌شود.
*   **بدون انتقال داده:** هیچ ویدیو، صدا یا اطلاعاتی هرگز از دستگاه شما خارج نمی‌شود.
*   **قابلیت کار آفلاین:** شما می‌توانید پس از باز کردن صفحه، اینترنت خود را قطع کنید و ابزار همچنان بدون نقص کار خواهد کرد.
*   **متن‌باز (Open Source):** کدهای پروژه شفاف و قابل بررسی هستند.

---

## ✨ ویژگی‌ها

*   **هوش مصنوعی:** استفاده از مدل پیشرفته **YOLOv11** (Nano) برای تشخیص سریع و دقیق.
*   **تشخیص دوگانه:** قابلیت تشخیص همزمان **چهره‌ها** و **پلاک خودروها** (قابل انتخاب).
*   **تار کردن هوشمند:** اعمال افکت پیکسلی (Pixelate) برای حفظ کلیت ویدیو در عین مخفی کردن هویت‌ها.
*   **عملکرد بالا:** استفاده از **WebAssembly (WASM)** و پردازش چندریسمانی (Multi-threading) برای سرعت بیشتر.
*   **خروجی مدرن:** خروجی ویدیو با فرمت استاندارد **MP4 (H.264)** و صدای AAC.
*   **دو زبانه:** پشتیبانی کامل از زبان‌های **فارسی** و **انگلیسی** با طراحی راست‌چین (RTL).

---

## 🚀 راهنمای اجرا روی سیستم شخصی

به دلیل استفاده از قابلیت‌های پیشرفته مرورگر (مانند Service Workers برای سرعت بیشتر)، **نمی‌توانید فایل `index.html` را مستقیماً اجرا کنید**. باید آن را از طریق یک سرور محلی (Local Server) اجرا کنید.

### پیش‌نیازها
1.  نصب **Python** روی سیستم.
2.  فایل مدل `yolo11n.onnx` در پوشه پروژه موجود باشد.

### مراحل اجرا
1.  این مخزن (Repository) را دانلود یا Clone کنید.
2.  **دانلود/تولید مدل:**
    مطمئن شوید فایل `yolo11n.onnx` در پوشه اصلی قرار دارد. اگر این فایل را ندارید، اسکریپت پایتون موجود را اجرا کنید یا مدل YOLOv11 Nano ONNX را دانلود کنید.
3.  ترمینال (CMD یا Terminal) را در پوشه پروژه باز کنید.
4.  **اجرای سرور محلی:**
    دستور زیر را وارد کنید:
    ```bash
    python -m http.server
    ```
5.  **باز کردن مرورگر:**
    به آدرس `http://localhost:8000` بروید.

### اجرا روی GitHub Pages
این پروژه برای GitHub Pages بهینه شده است. کافیست فایل‌ها را آپلود کرده و از تنظیمات مخزن، GitHub Pages را فعال کنید. فایل `coi-serviceworker.js` تضمین می‌کند که هدرهای امنیتی لازم برای عملکرد سریع فعال باشند.

---

## 🛠️ تکنولوژی‌ها

*   **فرانت‌اند:** HTML5, CSS3 (رابط کاربری Glassmorphism), جاوا اسکریپت خالص (Vanilla JS).
*   **موتور هوش مصنوعی:** [ONNX Runtime Web](https://github.com/microsoft/onnxruntime) (با خروجی WASM).
*   **پردازش ویدیو:** [Mp4Muxer](https://github.com/Vanilagy/mp4-muxer) و API‌های WebCodecs.
*   **بهینه‌سازی:** استفاده از `coi-serviceworker` برای فعال‌سازی Cross-Origin Isolation.

---

## ⚠️ نیازمندی‌ها

*   **مرورگر:** یک مرورگر مدرن و به‌روز (Chrome 94+, Edge 94+, Firefox 93+).
*   **سخت‌افزار:** دستگاهی با پردازنده متوسط به بالا توصیه می‌شود. در صورت پشتیبانی مرورگر، از شتاب‌دهنده گرافیکی (GPU) استفاده می‌شود.

---

## 🤝 اعتبارات و حمایت

*   **توسعه‌دهنده نسخه وب:** مشارکت‌کننده ناشناس 
*   **ایده اصلی و پایه:** با تشکر فراوان از [Shin](https://x.com/hey_itsmyturn) برای ایده و مفاهیم پایه.

### حمایت از خالق اصلی
اگر این ابزار برای شما مفید بود، لطفاً با استفاده و ترویج آن (یا توسعه بیشتر ابزار)  حمایت کنید:

---

## 📄 لایسنس

این پروژه متن‌باز (Open Source) است. استفاده، تغییر و انتشار آن برای کمک به حفظ حریم خصوصی آزاد است.

</div>