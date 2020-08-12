import component from './DvFileUpload.vue'
import component2 from './DvFileUploadBtn.vue'

export const DvFileUpload = {
  install (Vue) {
    Vue.component('dv-file-upload', component)
  }
}

export const DvFileUploadBtn = {
  install (Vue) {
    Vue.component('dv-file-upload-btn', component2)
  }
}
