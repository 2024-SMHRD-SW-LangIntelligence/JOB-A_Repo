// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
// 윗줄은 템플릿이 만든거라 뭔지 모릅니다--------------------------------------------

// --------------------------------------파이차트-------------------------------------
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["1개~4개", "5개~9개", "10개~14개", "15개~19개", "20개~"],            /// 컬럼
    datasets: [{
      data: [48432, 4261, 192, 13, 3],                               /// 수칫값
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc','#4e73df', '#1cc88a'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#2e59d9', '#17a673'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)", // 툴팁 배경색을 흰색으로 설정
      bodyFontColor: "#858796",            // 본문 텍스트 색상을 회색(#858796)으로 설정
      borderColor: '#dddfeb',              // 툴팁 테두리 색상을 연한 보라색(#dddfeb)으로 설정
      borderWidth: 1,                      // 테두리 두께를 1픽셀로 설정
      xPadding: 15,                        // 좌우 패딩을 15픽셀로 설정
      yPadding: 15,                        // 상하 패딩을 15픽셀로 설정
      displayColors: false,                // 툴팁에 항목의 색상 표시를 비활성화
      caretPadding: 10,                    // 포인터와 본문 사이의 여백을 10픽셀로 설정
    }
    ,
    legend: {
      display: true       // 차트위 컬럼명 표시 ------  차트 위에있는 컬럼명 클릭시 해당 컬럼을 제외시킨 그래프로 바뀜
    },
    cutoutPercentage: 80,
  },
});
