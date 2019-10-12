import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
