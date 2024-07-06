// express 모듈 불러오기
// express : node.js에서 웹 어플리케이션 구축할때 사용하는 프레임워크
// 서버설정, 라우팅, 미들웨어 처리 기능 제공
const express = require('express');

// ejs의 레이아웃기능을 제공하여 유지보수에 용이
const expressLayouts = require('express-ejs-layouts')

// HTTP 요청에서 쿠키를 파싱하는 미들웨어 쿠키 데이터를 쉽게 접근하고 사용

// 세션 관리를 위한 미들웨어
// 사용자별 세션 데이터를 서버에 저장 
// 세션 ID를 쿠키로 클라이언트에 전달하여 상태를 유지
var session = require('express-session');
const path = require('path');
var cookieParser = require('cookie-parser');
//  Express에서 HTTP 요청의 본문(body)을 파싱하는 미들웨어
// 주로 POST 요청의 본문 데이터를 처리
var bodyParser = require('body-parser');

// express 객체 생성
const app = express();
// superbase 객체생성
const supabase = require('./config/superbase');

// 세션 설정
app.use(session({
  secret: 'JOB-A',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false, // HTTPS를 사용하지 않는 경우 false로 설정
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(cookieParser('JOB-A'));


app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use(expressLayouts);
// ejs를 템플릿 엔진으로 사용하도록 설정
app.set('view engine', 'ejs');
app.set('layout', 'template');
// 뷰 템플릿 파일이 위치한 디렉토리를 public으로 설정
app.set('views', path.join(__dirname, 'public', 'views'));


// 정적 파일을 제공하기 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// POST 요청 본문을 파싱하기 위한 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
// HTTP 요청의 body에서 JSON 형식으로 전송된 데이터를 파싱(parsing)하여 JavaScript 객체로 만들어주는 역할 
app.use(bodyParser.json());

// 멤버라우트 모듈 불러오기
const memberRoutes = require('./routes/memberRoutes');
app.use('/member', memberRoutes);
// 라우트 모듈 불러오기
const certiRoutes = require('./routes/certiRoutes');
app.use('/certi', certiRoutes);
// 채팅 모듈 불러오기
app.use(express.json());
const studyRoutes = require('./routes/studyGruopRoutes');
app.use('/chat', studyRoutes);

// 스케쥴라우트 모듈 불러오기
const scheduleRoutes = require('./routes/scheduleRoutes');
app.use('/schedule', scheduleRoutes);


// 루트 경로에 회원값이 있을 시 세션의 유저값을 user 변수에 담아 이동
app.get('/', (req, res) => {
  if (req.session.user) {
    res.render('main', { user : req.session.user, title: 'Main' });
  } else {
    res.render('main', { user : null, title: 'Main' });
  }
  
});

app.get('/certificate', (req, res) => {
  res.render('certificate', { title: 'certificate' });
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
