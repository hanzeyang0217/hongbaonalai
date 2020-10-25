import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue';

Vue.config.productionTip = false
Vue.component('Layout', Layout);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

let lastTouchEnd = 0;
document.addEventListener('touchstart', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
});
document.addEventListener('touchend', function(event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 100) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);
document.addEventListener('gesturestart', function(event) {
  event.preventDefault();
});