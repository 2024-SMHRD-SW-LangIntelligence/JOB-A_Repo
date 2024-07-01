// 로그인/회원가입창 모달 띄우기
function openModal() {
  var modal = document.getElementById("myModal");
  var blurBg = document.getElementById("blurBgg");

  modal.style.visibility = "visible";
  modal.style.transition = "opacity .6s ease-in-out";
  blurBg.style.display = "block"; // Display background blur
  modal.style.opacity = "1";
}

// 로그인/ 회원가입창 모달 닫기
function closeModal() {
  var modal = document.getElementById("myModal");
  var blurBg = document.getElementById("blurBgg");

  modal.style.visibility = "hidden";
  blurBg.style.display = "none"; // Hide background blur
  modal.style.transition = "none";
  modal.style.opacity = "0";
}

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the login button
  document.getElementById("loginBtn").addEventListener("click", openModal);

  // Add event listener to the blur background
  document.getElementById("blurBgg").addEventListener("click", closeModal);

  // Add event listener to the close button inside the modal
  document.querySelector("#myModal .close").addEventListener("click", closeModal);
});

