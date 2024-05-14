/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind CSS가 적용될 파일 경로
  ],
  theme: {
    extend: {}, // 사용자 정의 설정
  },
  plugins: [],
  darkMode: 'class', // 다크 모드 설정
}
