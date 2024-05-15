/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind CSS가 적용될 파일 경로
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-bg': '#18181b', // 다크 모드 배경색
        'custom-dark-text': '#ffffff', // 다크 모드 텍스트 색상
        'dark-gradient-from': '#333', // 다크 모드 그라데이션 시작 색상
        'dark-gradient-to': '#666', // 다크 모드 그라데이션 끝 색상
      },
    }, // 사용자 정의 설정
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      backgroundImage: ['dark'], // 다크 모드에서 배경 이미지 (그라데이션) 적용
    },
  },
  plugins: [],
  darkMode: 'class', // 다크 모드 설정
}
