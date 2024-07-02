// express 모듈 불러오기
// express : node.js에서 웹 어플리케이션 구축할때 사용하는 프레임워크
// 서버설정, 라우팅, 미들웨어 처리 기능 제공
const express = require('express');

// ejs의 레이아웃기능을 제공하여 유지보수에 용이
const expressLayouts = require('express-ejs-layouts')

//  Express에서 HTTP 요청의 본문(body)을 파싱하는 미들웨어
// 주로 POST 요청의 본문 데이터를 처리
var bodyParser = require('body-parser');

// HTTP 요청에서 쿠키를 파싱하는 미들웨어 쿠키 데이터를 쉽게 접근하고 사용
var cookieParser = require('cookie-parser');

// 세션 관리를 위한 미들웨어
// 사용자별 세션 데이터를 서버에 저장 
// 세션 ID를 쿠키로 클라이언트에 전달하여 상태를 유지
var session = require('express-session');

const path = require('path');

// express 객체 생성
const app = express();

// superbase 객체생성
const supabase = require('./config/superbase');

app.use(expressLayouts);
// ejs를 템플릿 엔진으로 사용하도록 설정
app.set('view engine', 'ejs');
app.set('layout', 'template');
// 뷰 템플릿 파일이 위치한 디렉토리를 public으로 설정
app.set('views', path.join(__dirname, 'public', 'views'));


// 정적 파일을 제공하기 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// POST 요청 본문을 파싱하기 위한 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
// HTTP 요청의 body에서 JSON 형식으로 전송된 데이터를 파싱(parsing)하여 JavaScript 객체로 만들어주는 역할 
app.use(bodyParser.json());

// 쿠키 파서와 세션 설정
app.use(cookieParser());
app.use(session({
    secret: 'JOB-A',
    resave: false, // 세션을 언제나 저장할지 설정함
    saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    cookie: { secure: false },
}));

// 라우트 모듈 불러오기
const memberRoutes = require('./routes/memberRoutes');
app.use('/member', memberRoutes);


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
