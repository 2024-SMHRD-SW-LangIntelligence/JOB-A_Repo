const express = require('express');
const path = require('path');

// express 객체 생성
const app = express();

// ejs를 템플릿 엔진으로 사용하도록 설정
app.set('view engine', 'ejs');
// 뷰 템플릿 파일이 위치한 디렉토리를 public으로 설정
app.set('views', path.join(__dirname, 'public'));

// 정적 파일을 제공하기 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로에 접속 시 index.ejs 템플릿을 렌더링하고 title 변수를 전달
app.get('/', (req, res) => {
  res.render('index', { title: 'My EJS Page' });
});

// 3379 포트를 사용

app.listen(3379, () => {
  console.log(`서버 가동`);
});