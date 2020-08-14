<template>
  <v-flex
    md12
    xs12
    class="uploadFileReference__container" >
    <v-layout
      align-center
      row
      wrap >
      <v-flex v-if="hasPlugins" >
        <div class="text-xs-center uploadFileReference__menu-container" >
          <v-bottom-sheet
            v-model="verMenu"
            class="uploadFileReference__bottom-shet" >
            <v-list class="uploadFileReference__list" >
              <v-subheader>
                Opciones
              </v-subheader>
              <v-list-tile
                v-if="hasPlugins"
                class="uploadFileReference__list-tile"
                @click="usarCamara()" >
                <v-list-tile-avatar>
                  <v-avatar size="32px" >
                    <v-icon color="blue" >
                      camera_alt
                    </v-icon>
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-title >
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
      </v-flex>
      <v-flex
        v-if="verMiniatura && isVertical"
        md12
        sm12
        xs12 >
        <v-layout>
          <v-spacer />
            <img
              @click="clickHandler()"
              ref=""
              v-if="previewUrl !== ''"
              :src="previewUrl"
              :style="'max-width: ' + size + 'px;max-height: ' + size + 'px;' + (disabled ? 'filter: grayscale(100%)' : '')"
              :onerror="`this.src='${imgError}';`" >
          <v-spacer />
        </v-layout>
      </v-flex>
      <v-flex
        md12
        xs12 >
        <v-text-field
          ref="field"
          v-model="descripcion"
          :append-icon="appendIcon"
          :append-outer-icon="appendOutIcon"
          :autofocus="autofocus"
          :background-color="background"
          :box="box"
          :class="(small ? ' input-small ': ' ') + (appendOuterNoMargin ? 'append-outer-no-margin' : ' ' )"
          :color="color"
          :counter="counter"
          :dark="dark"
          :disabled="disabled"
          :hide-details="hideDetails"
          :hint="hint"
          :label="label"
          :loading="loading"
          :persistent-hint="persistentHint"
          :placeholder="placeholder"
          :prefix="prefix"
          :prepend-icon="prependOutIcon"
          :prepend-inner-icon="prependIcon"
          :outline="outline"
          :required="required"
          :reverse="reverse"
          :rules="reglas"
          :solo="solo"
          :solo-inverted="soloInverted"
          :suffix="suffix"
          readonly
          class="ml-3 fileUp"
          style="cursor:pointer;"
          @click="clickHandler()" >
          <template slot="label" >
            <slot name="label" />
          </template>
          <template :slot="!reverse ? 'prepend' : 'append-outer'" >
            <v-icon
              color="black"
              @click="clickHandler()" >
              {{ attachIcon }}
            </v-icon>
          </template>
          <template slot="append" >
            <v-icon
              v-if="descripcion"
              color="red"
              @click="limpiar()" >
              {{ removeIcon }}
            </v-icon>
          </template>
          <v-fade-transition :slot="!reverse ? 'append-outer' : 'prepend'" v-if="verMiniatura && !isVertical" >
            <v-progress-circular
              v-if="loading"
              size="24"
              color="info"
              indeterminate />
            <v-avatar
              :size="size"
              style="cursor:pointer"
              @click="clickHandler()" >
              <v-icon
                v-if="previewUrl === ''"
                :size="size" >
                broken_image
              </v-icon>
              <img
                ref=""
                v-if="previewUrl !== ''"
                :src="previewUrl"
                :style="'max-width: ' + size + 'px;max-height: ' + size + 'px;' + (disabled ? 'filter: grayscale(100%)' : '')"
                :onerror="`this.src='${imgError}';`" >
            </v-avatar>
          </v-fade-transition>
        </v-text-field>
        <input
          ref="uploadFileReference"
          :id="'uploadFileReference' + uid"
          :multiple="(isCollections) ? true : false"
          type="file"
          :accept="inputAccept"
          style="display: none"
          @change="buscarImagenes" >
      </v-flex>
      <v-flex
        v-if="verMultipleCards"
        xs12
        sm12 >
        <v-card >
          <v-layout
            row
            wrap >
            <v-flex
              v-for="(file, index) in modelo"
              :key="index"
              xs3
              class="pa-1"
              style="border: solid 1px black !important;" >
              <v-img
                :src="file.url"
                aspect-ratio="1"
                class="grey lighten-2" >
                <v-card-title style="padding:0px; margin-top:-10px; margin-right:-20px;" >
                  <v-spacer/>
                  <v-btn
                    dark
                    icon
                    class="mr-3"
                    @click="eliminarImagen(index)" >
                    <v-icon color="red">
                      {{ removeIcon }}
                    </v-icon>
                  </v-btn>
                </v-card-title>
              </v-img>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import { Extenciones } from './utils/extenciones.js'
import { defaultImages } from './utils/defaultImages.js'
import { Plugins } from '@capacitor/core'
export default {
  name: 'dv-file-upload',
  model: {
    prop: 'files',
    event: 'input'
  },
  props: {
    appendIcon: {
      type: String,
      default: ''
    },
    appendOutIcon: {
      type: String,
      default: ''
    },
    appendOuterNoMargin: {
      type: Boolean,
      default: false
    },
    attachIcon: {
      type: String,
      default: 'attach_file'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
    },
    box: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    counter: {
      type: [Number, String, Boolean],
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /* eslint-disable */
    files: {
      type: [Array, Object, String] | null,
      required: true
    },
    /* eslint-enable */
    hideDetails: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    },
    imgDefault: {
      type: String,
      default: 'image'
    },
    isCollections: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Seleccione un Archivo'
    },
    loading: {
      type: Boolean,
      default: false
    },
    maxMb: {
      type: [Number, String],
      default: 4
    },
    persistentHint: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ' '
    },
    prefix: {
      type: String,
      default: ''
    },
    prependIcon: {
      type: String,
      default: ''
    },
    prependOutIcon: {
      type: String,
      default: ''
    },
    previewSize: {
      type: [Number, String],
      default: '50'
    },
    outline: {
      type: Boolean,
      default: false
    },
    removeIcon: {
      type: String,
      default: 'highlight_off'
    },
    required: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: function () { return [] }
    },
    small: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    soloInverted: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: String,
      default: ''
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    inputAccept: {
      type: String,
      default: '*'
    }
  },
  data () {
    return {
      verMiniatura: true,
      verMultipleCards: false,
      hasPlugins: true,
      modelo: [],
      reglas: [],
      fileMobile: [],
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
      verMenu: false, // bandera para el menu plegable version mobile
      imgError: defaultImages['error-file'],
      previewUrl: null,
      descripcion: null,
      size: (typeof this.previewSize === 'undefined' ? 80 : this.previewSize),
      img64Default: '',
      descFile: null
    }
  },
  watch: {
    files: {
      handler () {
        this.modelo = this.files
        this.previewHandler()
      },
      deep: true,
      inmediate: true
    },
    previewSize () {
      this.size = this.previewSize ? this.previewSize : 50
    }
  },
  async created () {
    this.checkPlatform()
    this.modelo = this.files
    this.reglas = this.rules
    if (this.required && this.rules.length === 0) {
      this.reglas = [
        v => !!v || 'Campo Requerido'
      ]
    }
    this.img64Default = defaultImages[this.imgDefault]
    this.previewUrl = this.img64Default
  },
  mounted () {
    this.previewHandler()
  },
  methods: {
    async checkPlatform () {
      const { Device } = Plugins;
      const info = await Device.getInfo();
      if (info.platform === 'web') {
        this.hasPlugins = false
      } else {
        this.hasPlugins = true
      }
    },
    previewHandler () {
      if (this.modelo != null && (this.modelo.url != null || (this.modelo.length && this.modelo.length === 1))) {
        this.verMiniatura = true
        this.verMultipleCards = false
        if (this.modelo.url != null) {
          this.setMiniatura(this.modelo)
        } else if (this.modelo.length) {
          this.setMiniatura(this.modelo[0])
        }
      } else if (this.modelo != null && this.modelo.length && this.modelo.url == null) {
        this.verMiniatura = false
        this.verMultipleCards = true
      }
      this.$forceUpdate()
    },
    setMiniatura (objMiniatura) {
      // console.log('set Min')
      this.descripcion = objMiniatura.name ? objMiniatura.name : ''
      this.previewUrl = objMiniatura.url ? objMiniatura.url : this.imgError
      this.$forceUpdate()
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
    focus () {
      if (this.$refs.field) {
        this.$refs.field.focus()
      }
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
        if (tamanio > 1) {
          this.descripcion = tamanio + ' Archivos Adjuntos'
        }
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
      const mensajeError = 'Error al capturar la fotografía, ' + (error != null ? error : ('No se Encontró el Plugin de Camará '))
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
<style>
.fileUp.v-input div.v-input__prepend-outer  {
  align-self: center;
}
.fileUp.v-input div.v-input__control  {
  align-self: center;
}
.fileUp.v-input div.v-input__control div.v-input__slot div.v-text-field__slot input {
  cursor: pointer;
}
</style>
