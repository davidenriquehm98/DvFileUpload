<template>
  <div class="dv-fub-main" @click="clickHandler()" >
    <slot name="default" />
    <input
      ref="uploadFileReference"
      :id="'uploadFileReference' + uid"
      :multiple="(isCollections) ? true : false"
      :accept="inputAccept"
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
          v-if="hasPlugins"
          class="dv-fub__list-tile"
          @click="usarCamara()" >
          <v-list-tile-avatar>
            <v-avatar size="32px" >
              <v-icon color="blue" >
                camera_alt
              </v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>
            Camara
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          class="uploadFileReference__list-tile"
          @click="clickHandler()" >
          <v-list-tile-avatar>
            <v-avatar size="32px" >
              <v-icon color="blue" >
                collections
              </v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title
            style="cursor:pointer;" >
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
import { Plugins } from '@capacitor/core'
export default {
  name: 'dv-file-upload-btn',
  model: {
    prop: 'files',
    event: 'input'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    files: {
      /* eslint-disable */
      type: [Array, Object, String] | null,
      required: true
      /* eslint-enable */
    },
    isCollections: {
      type: Boolean,
      default: false
    },
    previewSize: {
      type: [Number, String],
      default: '50'
    },
    maxMb: {
      type: [Number, String],
      default: 4
    },
    inputAccept: {
      type: String,
      default: '*'
    }
  },
  data () {
    return {
      modelo: [],
      hasPlugins: true,
      uid: String(Math.floor(Math.random() * 1000)),
      cameraOptions: {
        // Whether to allow the user to crop or make small edits (platform specific)
        allowEditing: true,
        // Whether to automatically rotate the image "up" to correct for orientation in portrait mode Default: true
        correctOrientation: true,
        // The quality of image to return as JPEG, from 0-100
        quality: 75,
        // How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported
        resultType: 'DataUrl',
        // Whether to save the photo to the gallery. If the photo was picked from the gallery, it will only be saved if edited. Default: false
        saveToGallery: true,
        source: 'CAMERA'
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
    }
  },
  created () {
    this.checkPlatform()
    this.modelo = this.files
    this.img64Default = defaultImages[this.imgDefault]
    this.previewUrl = this.img64Default
  },
  methods: {
    checkTipoArchivo: (me, archivo) => new Promise(resolve => {
      if (me.inputAccept != null && me.inputAccept !== '*' && !archivo.type.match(me.inputAccept)) {
        const mensajeTipoError = `Archivo de tipo ${archivo.type} no es aceptado por ${me.inputAccept}.`
        me.$emit('error', mensajeTipoError)
        console.error(`DvFileUpload-${mensajeTipoError}`)
        if (!me.isCollections) {
          me.limpiar(defaultImages['error-file'])
        }
        resolve(false)
      }
      resolve(true)
    }),
    checkMaxMb: (me, archivo) => new Promise(resolve => {
      const mbFile = archivo.size / 1024 / 1024
      const maxPermitido = me.maxMb ? me.maxMb : 5
      if (mbFile > maxPermitido) {
        const mensajeError = 'No se puede subir el archivo, ha excedido el limite de ' + maxPermitido + ' mb.'
        me.$emit('error', mensajeError)
        console.error('DvFileUpload-', mensajeError)
        if (!me.isCollections) {
          me.limpiar(defaultImages['error-file'])
        }
        resolve(false)
      }
      resolve(true)
    }),
    normalizarNombre (name) {
      //se quita cualquier caracter especial que pueda tener el nombre de la imagen
      let nombreTmp = name
      nombreTmp = nombreTmp.replace(/æ/g, 'ae');
      nombreTmp = nombreTmp.replace(/œ/g, 'oe');
      nombreTmp = nombreTmp.replace(/ñ/g, 'n');
      nombreTmp = nombreTmp.replace(/Ñ/g, 'N');
      nombreTmp = nombreTmp.replace(/ü/g, 'u');
      nombreTmp = nombreTmp.replace(/Ü/g, 'U');
      nombreTmp = nombreTmp.replace(/ /g, '_');
      nombreTmp = nombreTmp.replace(/#/g, '');
      nombreTmp = nombreTmp.replace(/%/g, '');
      const nombreNormal = nombreTmp.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return nombreNormal
    },
    async checkPlatform () {
      const { Device } = Plugins;
      const info = await Device.getInfo();
      if (info.platform === 'web') {
        this.hasPlugins = false
      } else {
        this.hasPlugins = true
      }
    },
    clickHandler () {
      this.$emit('click')
      if (this.disabled) {
        return
      }
      if (!this.hasPlugins) {
        this.seleccionarArchivo()
      } else {
        if (this.verMenu) {
          this.seleccionarArchivo()
        } else {
          this.verMenu = true
        }
      }
    },
    seleccionarArchivo () {
      let id = 'uploadFileReference' + this.uid
      document.getElementById(id.toString()).click()
    },
    openMenu () {
      this.verMenu = true
    },
    buscarImagenes (event) {
      const archivo = event.target.files || event.dataTransfer.files
      this.agregarListaImagen(archivo)
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
    async agregarListaImagen (archivo) {
      this.verMenu = false
      if (!archivo.length) {
        this.limpiar()
        return
      }
      if (this.isCollections) {
        let tamanio = archivo.length
        this.modelo = []
        for (let i = 0; i < tamanio; i++) {
          let tipoValido = false
          tipoValido = await this.checkTipoArchivo(this, archivo[i])
          if (tipoValido) {
            let pesoValido = false
            pesoValido = await this.checkMaxMb(this, archivo[i])
            if (pesoValido) {
              const nombreNormal = this.normalizarNombre(archivo[i].name)
              let objMod = {}
              objMod.name = nombreNormal
              objMod.isNew = true
              objMod.archivo = archivo[i]
              let ex = this.getExtension(archivo[i].name)
              ex = ex.toLowerCase()
              if (ex !== 'jpg' && ex !== 'icon' && ex !== 'jpeg' && ex !== 'png' && ex !== 'gif') {
                if (Extenciones[ex] != null) {
                  objMod.url = Extenciones[ex]
                } else {
                  objMod.url = Extenciones['null']
                }
              } else {
                objMod.url = URL.createObjectURL(archivo[i])
              }
              this.modelo.push(objMod)
            }
          }
          if (i === tamanio - 1) {
            this.$emit('input', this.modelo)
          }
        }
      } else {
        let tipoValidoSingle = false
        tipoValidoSingle = await this.checkTipoArchivo(this, archivo[0])
        if (!tipoValidoSingle) {
          return
        }
        let pesoValidoSingle = false
        pesoValidoSingle = await this.checkMaxMb(this, archivo[0])
        if (!pesoValidoSingle) {
          return
        }
        const nombreNormal = this.normalizarNombre(archivo[0].name)
        const objModelo = {}
        objModelo.name = nombreNormal
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
        this.modelo = { ...objModelo }
        this.$emit('input', this.modelo)
      }
    },
    eliminarImagen (index) {
      if (this.disabled) {
        return
      }
      this.modelo.splice(index, 1)
      this.$emit('input', this.modelo)
      this.$forceUpdate()
    },
    async usarCamara () {
      if (Plugins.Camera) {
        try {
          const cameraResult = await Plugins.Camera.getPhoto(this.cameraOptions)
          console.log('cameraResult', cameraResult)
          this.setPicture(cameraResult.dataUrl)
        } catch (error) {
          this.error(error)
        }
      } else {
      // If the navigator.camera is not available display generic error to the user.
        this.error()
      }
    },
    setPicture (imagePath) {
      let file = imagePath
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
      const mensajeError = 'Error al capturar la fotografía, ' + (error != null ? error : ('No se Encontró el Plugin de Camará'))
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
      if (this.disabled) {
        return
      }
      this.$emit('clear')
      let obj = { name: null, url: urlImg ? urlImg : this.img64Default, isCleared: true }
      this.modelo = obj
      this.$emit('input', this.modelo)
    }
  }
}
</script>