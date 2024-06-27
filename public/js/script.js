// 모달 열기 함수
function openModal() {
    var modal = document.getElementById("myModal");
    var blurBg = document.getElementById("blurBgg");
  
    modal.style.display = "block"; // 모달 표시
    blurBg.style.display = "block"; // 배경 블러 표시
  }
  
  // 모달 닫기 함수
  function closeModal() {
    var modal = document.getElementById("myModal");
    var blurBg = document.getElementById("blurBgg");
  
    modal.style.display = "none"; // 모달 숨기기
    blurBg.style.display = "none"; // 배경 블러 숨기기
  }



  document.addEventListener("DOMContentLoaded", function() {
    // id가 "loginBtn"인 요소를 클릭했을 때 실행될 함수
    document.getElementById("loginBtn").addEventListener("click", openModal);
});

  
  // 배경 블러 부분 클릭 시 모달 닫기
  document.getElementById("blurBgg").addEventListener("click", closeModal);
  
  // 모달 창 내부 클릭 시 이벤트 전파 방지
  document.querySelector("login_modal-content").addEventListener("click", function(event) {
    event.stopPropagation(); // 이벤트 전파 방지
  });
  
  // 모달 닫기 버튼 클릭 시 모달 닫기
  document.querySelector(".close").addEventListener("click", closeModal);
  