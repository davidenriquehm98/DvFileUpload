import Vue from 'vue'
const SleepBus = {}
SleepBus.install = (Vue) => {
  Vue.prototype.$sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
}
Vue.use(SleepBus)
