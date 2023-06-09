// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeoLocation from 'vue-browser-geolocation'
import axios from "axios";

Vue.prototype.$axios = axios
 
Vue.config.productionTip = false
Vue.use(VueGoogleMaps,{
  load: {
    key: process.env.VUE_APP_GEO_API_KEY,
    libraries: "places"
  }
})
Vue.use(VueGeoLocation)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
