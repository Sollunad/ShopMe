import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import {routes} from "../routes";

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({routes});

new Vue({
  vuetify,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
