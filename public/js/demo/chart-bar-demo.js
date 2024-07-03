// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
// 탬플릿에서 만들어져있던거라 뭔지 모릅니다



// ------------------------------- 바 차트 -----------------------------------
var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["안", "녕", "하", "세", "요", "!"], // 컬럼 (자격증)
    datasets: [{
      label: "Revenue",                         // ex) 자격증 취득수
      backgroundColor: "#4e73df",               // 배경색
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [9, 12, 20, 24, 19, 16],       // 값 ex) 자격증 취득수의 값
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    }
  }
});
