const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
const mongoose = require('mongoose'); // mongoose 객체 생성

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



//----------------------------------------- MongoDB 연결 URL---------------------
const uri = 'mongodb://localhost:27017/JOBA';

// MongoDB 연결
mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB에 성공적으로 연결되었습니다.');
    })
    .catch((err) => {
        console.error('MongoDB 연결 중 오류 발생:', err);
    });

// 간단한 스키마와 모델 정의
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const User = mongoose.model('User', userSchema);

// 샘플 데이터 추가
const newUser = new User({
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com'
});

newUser.save()
    .then(() => {
        console.log('사용자가 성공적으로 저장되었습니다.');
        mongoose.connection.close(); // 연결 종료
    })
    .catch((err) => {
        console.error('사용자 저장 중 오류 발생:', err);
    });
// ------------------------------MongoDB 관련 설정 끝---------------------------------

// ------------------------------supabase 관련 설정 ----------------------------------
const { createClient } = require('@supabase/supabase-js');

// Supabase 프로젝트 URL과 API 키
const supabaseUrl = 'https://gxecvthffkqeuxqkckhr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4ZWN2dGhmZmtxZXV4cWtja2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4MDg4NTEsImV4cCI6MjAzNTM4NDg1MX0.Jh8Hj2qLWHvmiat4jLn6wsnyofwvHUL06lSul367nek';

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);


// ------------------------------supabase 관련 설정 끝 ------------------------------
