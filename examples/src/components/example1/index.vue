<template>
  <div>
    <v-tabs
      v-model="active"
      @change="refreshAll()"
      color="cyan"
      slider-color="yellow"
      style="border:solid 1px black; min-height:50px" >
      <v-tab ripple >
        <span class="font-weight-bold text-capitalize" >Builder</span>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <example ref="example" @change="refreshCode()" /> 
        </v-card>
      </v-tab-item>
      <v-tab ripple >
        <span class="font-weight-bold text-capitalize" >Component Result</span>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-btn
            :color="copiado ? 'green' : 'white'"
            :dark="copiado ? true : false"
            small
            absolute
            top
            right
            fab
            v-clipboard:copy="codeTemplate"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            <v-icon>file_copy</v-icon>
          </v-btn>
          <codemirror
            ref="cmTemplateE1"
            :value="codeTemplate" 
            :options="cmOptions" />
        </v-card>
      </v-tab-item>
      <v-tab ripple >
        <span class="font-weight-bold text-capitalize" >Sript</span>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-btn
            :color="copiado ? 'green' : 'white'"
            :dark="copiado ? true : false"
            small
            absolute
            top
            right
            fab
            v-clipboard:copy="codeScript"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            <v-icon>file_copy</v-icon>
          </v-btn>
          <codemirror
            ref="cmScriptE1"
            :value="codeScript" 
            :options="scriptOptions" />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import example from './example.vue'
import dedent from 'dedent'
export default {
  components: {
    example
  },
  data () {
    return {
      data: [{ items: [], title: 'Fotos' }],
      copiado: false,
      cmOptions: {
        tabSize: 2,
        smartIndent: true,
        mode: 'text/x-vue',
        theme: 'monokai',
        lineNumbers: true,
        line: true
      },
      scriptOptions: {
        smartIndent: true,
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'dracula',
        lineNumbers: true,
        line: true
      },
      active: null,
      codeTemplate: dedent`<dv-file-upload
      v-model="modelo"
      @error="mostrarMensajeError">
      <template slot="label">
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
    </dv-file-upload>`,
      codeScript: dedent` export default {
   data () {
     return {
       modelo: {
         name: 'fox.jpg',
         url: 'https://cdn.pixabay.com/photo/2020/04/14/11/21/fox-5042242_1280.jpg'
       }
     }
   },
   methods: {
     mostrarMensajeError (mensaje) {
       alert(mensaje)
     }
   }
 }`
    }
  },
  methods: {
    refreshCode () {
      if (this.$refs.example) {
        this.codeTemplate = this.$refs.example.getTemplate()
      }
    },
    async refreshAll () {
      await this.$sleep(150)
      this.$refs.cmTemplateE1.refresh()
      this.$refs.cmScriptE1.refresh()
    },
    async onCopy () {
      this.copiado = true
      await this.$sleep(1500)
      this.copiado = false
    },
    async onError () {
      alert('Failed to copy texts')
    }
  }
}
</script>