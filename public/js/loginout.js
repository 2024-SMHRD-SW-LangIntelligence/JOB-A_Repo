const i = false; // i를 true로 설정 (예시)

// 조건에 따라 요소 표시
if (i==false) {
    document.getElementById('login').classList.remove('hidden');
    console.log(i);
}
if (i==true) {
    document.getElementById('logout').classList.remove('hidden');
    console.log(i);
}
