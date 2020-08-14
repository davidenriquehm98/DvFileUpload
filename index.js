import component from './DvFileUpload.vue'
import component2 from './DvFileUploadBtn.vue'
import { Extenciones } from './utils/extenciones.js'
import { defaultImages } from './utils/defaultImages.js'

export const DvFileUpload = {
  install (Vue) {
    Vue.prototype.$dvExtenciones = Extenciones
    Vue.prototype.$dvDefaultImages = defaultImages
    Vue.component('dv-file-upload', component)
  }
}

export const DvFileUploadBtn = {
  install (Vue) {
    Vue.prototype.$dvExtenciones = Extenciones
    Vue.prototype.$dvDefaultImages = defaultImages
    Vue.component('dv-file-upload-btn', component2)
  }
}
