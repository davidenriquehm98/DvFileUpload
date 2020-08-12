<template>
  <v-layout row wrap>
    <v-flex md6 xs12 >
      <dv-file-upload
        v-if="!isButton"
        v-model="modelo"
        input-accept="image/*"
        :is-mobile="isMobile ? true : false"
        :platform="plataforma"
        :is-collections="isMultiple ? true : false"
        :is-vertical="isVertical ? true : false" >
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
        :platform="plataforma"
        :is-mobile="isMobile ? true : false"
        :is-collections="isMultiple ? true : false" >
        <v-btn
          color="green"
          class="white--text" >
          Adjunat archivos
          <v-icon right dark>attach_file</v-icon>
        </v-btn>
      </dv-file-upload-btn>
      <br>
      <span>
        {{ modelo }}
      </span>
    </v-flex>
    <v-flex md6 xs12 >
      <dv-switch
        small
        label
        color="blue"
        v-model="isButton"
        item_value="valor"
        :items="opcionesTipo"
        @input="emitChange()" />
      <dv-switch
        small
        label
        color="green"
        v-model="isMobile"
        item_value="valor"
        :items="opcionesMobile"
        @input="emitChange()" />
      <dv-switch
        small
        label
        color="red"
        v-model="isMultiple"
        item_value="valor"
        :items="opcionesCantidad"
        @input="emitChange()" />
      <dv-switch
        small
        label
        color="brown"
        v-model="plataforma"
        item_value="valor"
        :items="opcionesPlataforma"
        @input="emitChange()" />
      <dv-switch
        v-if="!isButton"
        small
        label
        v-model="isVertical"
        item_value="valor"
        :items="opcionesVertical"
        @input="emitChange()" />
    </v-flex>
  </v-layout>
</template>
<script>
import dedent from 'dedent'
export default {
  data () {
    return {
      modelo: null,
      isButton: 0,
      isMobile: 0,
      isAndroid: 0,
      isMultiple: 0,
      plataforma: 'web',
      isVertical: 0,
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
      opcionesMobile: [
        {
          texto: 'Desktop',
          valor: 0,
          text_color: 'white'
        },
        {
          texto: 'Mobile',
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
      opcionesPlataforma: [
        {
          texto: 'Web',
          valor: 'web',
          text_color: 'white'
        },
        {
          texto: 'Android/iOS',
          valor: 'android',
          text_color: 'white'
        }
      ]
    }
  },
  methods: {
    emitChange () {
      this.$emit('change')
    },
    getTemplate () {
      const singlePicker = dedent`<dv-file-upload
        v-model="modelo" ${this.isMobile ? `
        is-mobile `: ''}${this.isMultiple ? `
        is-collections `: ''}${this.plataforma !== 'web' ? `
        platform="${this.plataforma}" `: ''}${this.isVertical ? `
        is-vertical `: ''}>
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
      </dv-file-upload>`
      const pickerButton = dedent`<dv-file-upload-btn
        v-model="modelo" ${this.isMobile ? `
        is-mobile `: ''}${this.isMultiple ? `
        is-collections `: ''}${this.plataforma !== 'web' ? `
        platform="${this.plataforma}" `: ''}>
        <v-btn
          color="green"
          class="white--text" >
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