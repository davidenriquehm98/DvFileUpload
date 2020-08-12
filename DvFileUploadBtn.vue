<template>
  <div class="dv-fub-main" @click="clickHandler()" >
    <slot name="default" />
    <input
      ref="uploadFileReference"
      :id="'uploadFileReference' + uid"
      :multiple="(isCollections) ? true : false"
      type="file"
      style="display: none"
      @change="buscarImagenes" >
    <v-bottom-sheet
      v-model="verMenu"
      class="dv-fub__bottom-shet" >
      <v-list class="dv-fub__list">
        <v-subheader>
          Opciones
        </v-subheader>
        <v-list-tile
          v-if="platform !== 'web'"
          class="dv-fub__list-tile" >
          <v-list-tile-avatar>
            <v-avatar size="32px" >
              <v-icon color="blue" >
                camera_alt
              </v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title @click="usarCamara()" >
            Camara
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          class="uploadFileReference__list-tile" >
          <v-list-tile-avatar>
            <v-avatar size="32px" >
              <v-icon color="blue" >
                collections
              </v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title @click="clickHandler()" >
            Galeria
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { Extenciones } from './utils/extenciones.js'
import { defaultImages } from './utils/defaultImages.js'
export default {
  name: 'dv-file-upload-btn',
  model: {
    prop: 'files',
    event: 'input'
  },
  props: {
    files: {
      /* eslint-disable */
      type: Array | null,
      required: true
      /* eslint-enable */
    },
    isCollections: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    platform: {
      type: String,
      default: 'web'
    },
    previewSize: {
      type: [Number, String],
      default: '50'
    },
    maxMb: {
      type: [Number, String],
      default: 4
    }
  },
  data () {
    return {
      modelo: [],
      uid: String(Math.floor(Math.random() * 1000)),
      args: {
        'selectMode': 100, // 101=picker image and video , 100=image , 102=video
        'maxSelectCount': 50, // default 40 (Optional)
        'maxSelectSize': 4194304 // 188743680=180M (Optional) only android
      },
      imgError: defaultImages['error-file'],
      size: (typeof this.previewSize === 'undefined' ? 80 : this.previewSize),
      img64Default: '',
      verMenu: false
    }
  },
  watch: {
    files: {
      handler () {
        this.modelo = this.files
      },
      deep: true,
      inmediate: true
    },
    maxMb () {
      let mB = parseFloat(this.maxMb).toFixed(2)
      this.args.maxSelectSize = mB.toString() !== 'NaN' ? (mB * 1048576) : 4194304
    }
  },
  created () {
    this.modelo = this.files
    let mB = parseFloat(this.maxMb).toFixed(2)
    this.args.maxSelectSize = mB.toString() !== 'NaN' ? (mB * 1048576) : 4194304
    this.img64Default = defaultImages[this.imgDefault]
    this.previewUrl = this.img64Default
  },
  methods: {
    clickHandler () {
      this.$emit('click')
      if (!this.isMobile) {
        if (this.platform !== 'web' && this.isCollections) {
            this.agregarMobile()
          } else {
            this.seleccionarArchivo()
          }
      } else {
        if (this.verMenu) {
          if (this.platform !== 'web' && this.isCollections) {
            this.agregarMobile()
          } else {
            this.seleccionarArchivo()
          }
        } else {
          this.verMenu = true
        }
      }
    },
    seleccionarArchivo () {
      let id = 'uploadFileReference' + this.uid
      document.getElementById(id.toString()).click()
    },
    focus () {
      this.$refs.field.focus()
    },
    openMenu () {
      this.verMenu = true
    },
    buscarImagenes (event) {
      this.modelo = []                      
      this.$emit('input', this.modelo)
      let archivo = event.target.files || event.dataTransfer.files
      let tamanio = archivo.length
      for (let i = 0; i < tamanio; i++) {
        let mbFile = archivo[i].size / 1024 / 1024
        if (mbFile > this.maxMb) {
          const mensajeError = 'No se puede subir el archivo, ha excedido el limite de ' + this.maxMb + ' mb.'
          this.$emit('error', mensajeError)
          console.error('DvFileUpload - ', mensajeError)
          this.limpiar(defaultImages['error-file'])
          return
        }
      }
      this.agregarListaImagen(archivo)
    },
    agregarMobile () {
      this.fileMobile = []
      this.$emit('input', this.modelo)
      /* eslint-disable */
      try {
        MediaPicker.getMedias(this.args,
          (medias) => {
            this.getThumbnail(medias)
          },
          function (e) {
            console.log(e)
          })
      } catch {
        const mensajeError = 'Error al acceder a los Archivos, No se Encontró el Plugin de MediaPicker para ' + this.platform
        this.$emit('error', mensajeError)
        console.error('DvFileUploadBtn- ', mensajeError)
      }
      /* eslint-enable */
    },
    getThumbnail (medias) {
      for (let i = 0; i < medias.length; i++) {
        // eslint-disable-next-line
        MediaPicker.extractThumbnail(medias[i],
          (data) => {
            //  imgs[data.index].src = 'data:image/jpeg;base64,' + data.thumbnailBase64;
            //  imgs[data.index].setAttribute('style', 'transform:rotate(' + data.exifRotate + 'deg)');
            //  Usage example:
            let file = this.dataURLtoFile('data:image/jpeg;base64,' + data.thumbnailBase64, data.name)
            this.fileMobile.push(file)
            this.agregarListaImagen(this.fileMobile)
          },
          function (e) {
            console.log(e)
          }
        )
      }
    },
    dataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      let myBlob = new Blob([u8arr], { type: mime })
      myBlob.name = filename
      return myBlob
    },
    agregarListaImagen (archivo) {
      this.verMenu = false
      if (!archivo.length) {
        this.limpiar()
        return
      }
      if (this.isCollections) {
        this.limpiar()
        let tamanio = archivo.length
        this.modelo = []
        for (let j = 0; j < tamanio; j++) {
          let objMod = {}
          objMod.name = archivo[j].name
          objMod.isNew = true
          objMod.archivo = archivo[j]
          let ex = this.getExtension(archivo[j].name)
          ex = ex.toLowerCase()
          if (ex !== 'jpg' && ex !== 'icon' && ex !== 'jpeg' && ex !== 'png' && ex !== 'gif') {
            if (Extenciones[ex] != null) {
              objMod.url = Extenciones[ex]
            } else {
              objMod.url = Extenciones['null']
            }
          } else {
            objMod.url = URL.createObjectURL(archivo[j])
          }
          this.modelo.push(objMod)
          if (j === tamanio - 1) {
            this.$emit('input', this.modelo)
          }
        }
      } else {
        const objModelo = {}
        objModelo.name = archivo[0].name
        objModelo.isNew = true
        objModelo.archivo = archivo[0]
        let ex = this.getExtension(archivo[0].name)
        ex = ex.toLowerCase()
        if (ex !== 'jpg' && ex !== 'icon' && ex !== 'jpeg' && ex !== 'png' && ex !== 'gif') {
          if (Extenciones[ex] != null) {
            objModelo.url = Extenciones[ex]
          } else {
            objModelo.url = Extenciones['null']
          }
        } else {
          objModelo.url = URL.createObjectURL(archivo[0])
        }
        this.modelo = objModelo
        this.$emit('input', this.modelo)
      }
    },
    eliminarImagen (index) {
      this.modelo.splice(index, 1)
      this.$emit('input', this.modelo)
      this.$forceUpdate()
    },
    usarCamara () {
      if (navigator.camera) {
        navigator.camera.getPicture(this.setPicture, this.error, {
          // eslint-disable-next-line
          destinationType: Camera.DestinationType.DATA_URL
        })
      } else {
      // If the navigator.camera is not available display generic error to the user.
        this.error()
      }
    },
    setPicture (imagePath) {
      let file = 'data:image/jpeg;base64,' + imagePath
      let dateObj = new Date()
      let name =
        dateObj.getYear().toString() +
        dateObj.getMonth().toString() +
        dateObj.getDay().toString() +
        dateObj.getHours().toString() +
        dateObj.getMinutes().toString() +
        dateObj.getSeconds().toString()

      this.urltoFile(file, name + '.jpeg', 'image/jpeg')
        .then((file) => {
          let fileCam = []
          fileCam.push(file)
          this.agregarListaImagen(fileCam)
        })
    },
    urltoFile (url, filename, mimeType) {
      if (mimeType != null) {
        console.log(' ')
      }
      return fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], filename, { type: mimeType });
        });
    },
    error (error) {
      const mensajeError = 'Error al capturar la fotografía, ' + (error != null ? error : ('No se Encontró el Plugin de Camará para ' + this.platform))
      this.$emit('error', mensajeError)
      console.error('DvFileUploadBtn- ', mensajeError)
    },
    getExtension (fileName) {
      if (!fileName) {
        return "";
      }
      if ( fileName.indexOf(".") === -1 ) {
        return 'null'
      }
      return fileName.substring(fileName.lastIndexOf(".") + 1);
    },
    limpiar (urlImg = null) {
      this.$emit('clear')
      let obj = { name: null, url: urlImg ? urlImg : this.img64Default, isCleared: true }
      this.modelo = obj
      this.$emit('input', this.modelo)
    }
  }
}
</script>