document.addEventListener("DOMContentLoaded", () => {
  const webApp = window.Bale.WebApp;

  // وقتی مینی‌اپ آماده شد
  webApp.ready();

  // تنظیم رنگ بر اساس تم کاربر
  const theme = webApp.themeParams || {};
  document.body.style.setProperty('--bg-color', theme.bg_color || '#fff');
  document.body.style.setProperty('--text-color', theme.text_color || '#000');
  document.body.style.setProperty('--button-color', theme.button_color || '#0088cc');
  document.body.style.setProperty('--button-text-color', theme.button_text_color || '#fff');

  // نمایش اطلاعات کاربر
  const userInfo = document.getElementById("user-info");
  if (webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
    const user = webApp.initDataUnsafe.user;
    userInfo.textContent = `سلام ${user.first_name} 👋`;
  } else {
    userInfo.textContent = "کاربر ناشناس!";
  }

  // دکمه دریافت شماره تلفن
  document.getElementById("get-contact").onclick = () => {
    webApp.requestContact((granted) => {
      alert(granted ? "شماره تلفن ارسال شد ✅" : "دسترسی لغو شد ❌");
    });
  };

  // دکمه تمام‌صفحه
  document.getElementById("expand").onclick = () => {
    webApp.expand();
  };

  // دکمه بستن
  document.getElementById("close").onclick = () => {
    webApp.close();
  };
});
