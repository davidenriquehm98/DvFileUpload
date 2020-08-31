<template>
  <v-app style="background:transparent" >
    <v-container
      fill-height >
      <v-layout
        justify-center
        wrap
        v-touch="{
          down: () => swipe()
        }" >
        <v-btn
          id="btnRefresh"
          absolute
          fab
          top
          small
        >
          <v-icon color="blue" large >refresh</v-icon>
        </v-btn>
        <v-flex
          xs12
          md10
          offset-md-1
          style="background: white;" >
          <span class="display-1" >
            Development File Upload
            <v-chip
              label
              outline
              color="red" >
              <strong>
                dv-file-upload
              </strong>
            </v-chip>
            <v-chip
              label
              outline
              color="red" >
              <strong>
                dv-file-upload-btn
              </strong>
            </v-chip>
          </span>
          <br>
          <slot name="head-line" />
          <example1 ref="ex1" />
          <v-card class="px-2" >
            <span class="font-weight-medium" style="color: #cfcdcd;" >
              > API
            </span>
            <dv-data-list :data="data" />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import { Api } from './API'
import Example1 from './components/example1/index.vue'
export default {
  name: 'App',
  components: {
    Example1
  },
  data () {
    return {
      data: [ ...Api ]
    }
  },
  methods: {
    async swipe () {
      const myScrollY = window.scrollY
      if (myScrollY < 10) {
        let boxOne = document.getElementById('btnRefresh')
        boxOne.classList.add('verticalTranslate')
        await this.$sleep(1500)
        boxOne.classList.remove('verticalTranslate')
      }
    }
  }
}
</script>
<style>
  body {
    background-color: #072d1a;
    background-image: url("https://www.entropiacreatividad.com/wp-content/uploads/2017/12/fondo-web-entropia-1920x1200-grisoscuro3-1200x900.png");
    background-repeat: repeat;
    font-family: 'Varela Round', sans-serif;
  }
  .container.grid-list-xl .layout:only-child {
    margin: unset;
  }
  .container.grid-list-xl *:not(:only-child) .layout:last-child {
    margin: unset;
  }
  .container.grid-list-xl .layout .flex {
    padding: unset;
  }
  #btnRefresh {
    -webkit-transition: 2s;
    -moz-transition: 2s;
    -ms-transition: 2s;
    -o-transition: 2s;
    transition: 2s;
    top: -75px;
  }
  #btnRefresh.verticalTranslate {
    -webkit-transition: 2s;
    -moz-transition: 2s;
    -ms-transition: 2s;
    -o-transition: 2s;
    transition: 2s;
    top: 25px;
  }
  @keyframes rotate360 {
    to {
      transform: rotate(360deg);
    }
  }
  #btnRefresh {
    animation: 1s rotate360 infinite linear;
  }
</style>
