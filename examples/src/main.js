import Vue from 'vue'
import App from './App.vue'

import './plugins'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  components: { App },
  template: '<App/>'
}).$mount('#app')
