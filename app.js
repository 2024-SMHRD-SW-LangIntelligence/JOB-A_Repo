const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const path = require('path');

// express 객체 생성
const app = express();


app.use(expressLayouts);
// ejs를 템플릿 엔진으로 사용하도록 설정
app.set('view engine', 'ejs');
app.set('layout', 'template');
// 뷰 템플릿 파일이 위치한 디렉토리를 public으로 설정
app.set('views', path.join(__dirname, 'public', 'views'));


// 정적 파일을 제공하기 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로에 접속 시 index.ejs 템플릿을 렌더링하고 title 변수를 전달
app.get('/', (req, res) => {
  res.render('main', { title: 'My EJS Page' });
});

app.get('/workSheet', (req, res) => {
  res.render('workSheet', { title: 'workSheet' });
});

app.get('/certificate', (req, res) => {
  res.render('certificate', { title: 'certificate' });
});

app.get('/certificate_info', (req, res) => {
  res.render('certificate_info', { title: 'certificate_info' });
});

app.get('/studyGruop', (req, res) => {
  res.render('studyGruop', { title: 'studyGruop' });
});

app.get('/my_studyGruop', (req, res) => {
  res.render('my_studyGruop', { title: 'my_studyGruop' });
});

app.get('/tables', (req, res) => {
  res.render('tables', { title: 'tables' });
});

app.get('/search', (req, res) => {
  res.render('search', { title: 'search' });
});
// 3379 포트를 사용

app.listen(3379, () => {
  console.log(`서버 가동`);
});