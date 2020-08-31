<template>
  <v-layout row wrap>
    <v-flex md6 xs12 >
      <dv-file-upload
        v-if="!isButton"
        v-model="modelo"
        :input-accept="tipoArchivo"
        :preview-size="previewSize"
        :disabled="isDisable ? true : false"
        :is-collections="isMultiple ? true : false"
        :is-vertical="isVertical ? true : false"
        @error="errorDv" >
        <template slot="label" >
          <span
            class="font-weight-bold green--text" >
            Seleccione un Archivo
          </span>
          <v-icon
            color="blue"
            class="font-weight-bold" >
            attach_file
          </v-icon>
        </template>
      </dv-file-upload>
      <dv-file-upload-btn
        v-if="isButton"
        v-model="modelo"
        :disabled="isDisable ? true : false"
        :input-accept="tipoArchivo"
        :is-collections="isMultiple ? true : false"
        @error="errorDv" >
        <v-btn
          color="green"
          class="white--text"
          :disabled="isDisable" >
          Adjunat archivos
          <v-icon right dark>attach_file</v-icon>
        </v-btn>
      </dv-file-upload-btn>
      <br>
      <strong>Modelo:</strong>
      <br>
      <span>
        {{ modelo }}
      </span>
    </v-flex>
    <v-flex md6 xs12 >
      <v-layout row wrap align-center >
        <v-flex md4 sm2 xs4 class="text-truncate font-weight-bold" >
          Tipo Componente
        </v-flex>
        <v-flex md8 sm10 xs8 >
          <dv-switch
            small
            label
            color="blue"
            v-model="isButton"
            item_value="valor"
            :items="opcionesTipo"
            @input="emitChange()" />
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center >
        <v-flex md4 sm2 xs4 class="text-truncate font-weight-bold" >
          Cantidad Archivos
        </v-flex>
        <v-flex md8 sm10 xs8 >
          <dv-switch
            small
            label
            color="red"
            v-model="isMultiple"
            item_value="valor"
            :items="opcionesCantidad"
            @input="emitChange()" />
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center v-if="!isButton" >
        <v-flex md4 sm2 xs4 class="text-truncate font-weight-bold" >
          Posición Preview
        </v-flex>
        <v-flex md8 sm10 xs8 >
          <dv-switch
            small
            label
            v-model="isVertical"
            item_value="valor"
            :items="opcionesVertical"
            @input="emitChange()" />
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center >
        <v-flex md4 sm2 xs4 class="text-truncate font-weight-bold" >
          Estado
        </v-flex>
        <v-flex md8 sm10 xs8 >
          <dv-switch
            small
            label
            color="green"
            v-model="isDisable"
            item_value="valor"
            :items="opcionesActivo"
            @input="emitChange()" />
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center >
         <v-autocomplete
          color="blue-grey lighten-2"
          :items="listTiposArchivos"
          item-text="value"
          item-value="value"
          v-model="tipoArchivo"
          label="Archivos Acepta"
          @input="emitChange()" />
      </v-layout>
      <v-layout row wrap align-center v-if="!isButton" >
        <v-slider
          label="Preview Size"
          thumb-label="always"
          color="brown"
          step="5"
          min="40"
          max="250"
          v-model="previewSize"
          @input="emitChange()" />
      </v-layout>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :timeout="5000"
      top
      color="red"
    >
      {{ errorMensaje }}
    </v-snackbar>
  </v-layout>
</template>
<script>
import dedent from 'dedent'
export default {
  data () {
    return {
      previewSize: 50,
      tipoArchivo: '*',
      listTiposArchivos: [{value:'*'}, {value:'image/*'}, {value:'application/pdf'}, {value:'video/*'}, {value:'.png'}, {value:'.doc'}],
      errorMensaje: '',
      snackbar: false,
      modelo: {
        name: 'fox.jpg',
        url: 'https://cdn.pixabay.com/photo/2020/04/14/11/21/fox-5042242_1280.jpg'
      },
      isButton: 0,
      isMobile: 0,
      isAndroid: 0,
      isMultiple: 0,
      isVertical: 0,
      isDisable: 0,
      opcionesTipo: [
        {
          texto: 'Picker',
          valor: 0,
          text_color: 'white'
        },
        {
          texto: 'button',
          valor: 1,
          text_color: 'white'
        }
      ],
      opcionesVertical: [
        {
          texto: 'Horizontal',
          valor: 0,
          text_color: 'white'
        },
        {
          texto: 'Vertical',
          valor: 1,
          text_color: 'white'
        }
      ],
      opcionesCantidad: [
        {
          texto: 'Archivo único',
          valor: 0,
          text_color: 'white'
        },
        {
          texto: 'Multiples Archivos',
          valor: 1,
          text_color: 'white'
        }
      ],
      opcionesActivo: [
        {
          texto: 'Activo',
          valor: 0,
          text_color: 'white'
        },
        {
          texto: 'Inactivo',
          valor: 1,
          text_color: 'white'
        }
      ]
    }
  },
  methods: {
    errorDv (mensaje) {
      this.errorMensaje = mensaje
      this.snackbar = true
    },
    emitChange () {
      this.$emit('change')
    },
    getTemplate () {
      const singlePicker = dedent`<dv-file-upload
        v-model="modelo"${this.isDisable ? `
        disabled `: ''}${this.tipoArchivo !== '*' ? `
        input-accept="${this.tipoArchivo}" `: ''}${this.isMultiple ? `
        is-collections `: ''}${this.isVertical ? `
        is-vertical `: ''}${this.previewSize !== 50 ? `
        preview-size="${this.previewSize}" `: ''}
        @error="mostrarMensajeError">
        <template slot="label">
          <span
            class="font-weight-bold green--text">
            Seleccione un Archivo
          </span>
          <v-icon
            color="blue"
            class="font-weight-bold">
            attach_file
          </v-icon>
        </template>
      </dv-file-upload>`
      const pickerButton = dedent`<dv-file-upload-btn
        v-model="modelo"${this.isDisable ? `
        disabled `: ''}${this.tipoArchivo !== '*' ? `
        input-accept="${this.tipoArchivo}" `: ''}${this.isMultiple ? `
        is-collections `: ''}
        @error="mostrarMensajeError">
        <v-btn${this.isDisable ? `
          disabled `: ''}
          color="green"
          class="white--text">
          Adjunat archivos
          <v-icon right dark>attach_file</v-icon>
        </v-btn>
      </dv-file-upload-btn>`
      if (this.isButton) {
        return pickerButton
      } else {
        return singlePicker
      }
    }
  }
}
</script>
<style>
.myTb a.v-tabs__item {
  padding: 0;
}
</style>