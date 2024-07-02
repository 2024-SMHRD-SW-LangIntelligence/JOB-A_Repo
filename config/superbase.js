const { createClient } = require('@supabase/supabase-js');

// Supabase 프로젝트 URL과 API 키
const supabaseUrl = 'https://gxecvthffkqeuxqkckhr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4ZWN2dGhmZmtxZXV4cWtja2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4MDg4NTEsImV4cCI6MjAzNTM4NDg1MX0.Jh8Hj2qLWHvmiat4jLn6wsnyofwvHUL06lSul367nek';

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;