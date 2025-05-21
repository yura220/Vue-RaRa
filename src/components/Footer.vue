<script>
import './css/main.css'

export default {
  data() {
    return {
      // public/img 폴더에 있는 이미지는 절대 경로로 참조
      footerImage: '/img/event-logo.png' // 기본 이미지 설정
    }
  },
  watch: {
    // 경로가 바뀔 때마다 footer 이미지 변경
    $route(to) {
      if (to.name === 'event') {
        this.footerImage = '/img/event-logo.png' // 'event' 경로에서 사용할 이미지
      } else {
        this.footerImage = '/img/footer-logo.png' // 다른 경로에서 사용할 이미지
      }
    }
  }
}

</script>

<template>
<footer id="footer">
    <div class="wrap">
<!-- 왼쪽 로고 -->
        <div class="footer-left">
            <img :src="footerImage" alt="로고 이미지" class="logo" />
        </div>

<!-- 가운데 텍스트 -->
        <div class="footer-center">
            <p class="site-name">LARA</p>
            <p>© 2025 Team LARA</p>
            <p>Designed & Developed by 경유라, 김민주, 이주영, 이한별</p>
            <p>Uicons by <a href="https://www.flaticon.com/uicons" target="_blank">Flaticon</a>
                 · Images by <a href="https://unsplash.com/ko" target="_blank">Unsplash</a>
                  · Images by <a href="https://www.freepik.com/" target="_blank">Freepik</a>
            </p>
        </div>

<!-- 오른쪽 아이콘 -->
        <div class="footer-right">
            <a href="https://github.com/" target="_blank">
                <img src="/img/github.png" alt="GitHub" />
            </a>
        </div>
    </div>
</footer>
</template>
