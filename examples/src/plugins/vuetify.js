import Vue from 'vue'

import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import colors from 'vuetify/es5/util/colors'
import { Ripple, Scroll, ClickOutside } from 'vuetify/es5/directives'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#12491D',
    accent: colors.grey.darken3,
    secondary: '#8A322C',
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.lightGreen.darken4,
    update: '#2196F3',
    accent1: '#62737D',
    accent2: '#2E2D2E',
    base: '#12491D',
    sombra1: '#115746',
    sombra2: '#136139',
    sombra3: '#1B6113',
    sombra4: '#315711',
    complementarioa: '#4FE36D',
    complementario1: '#359648',
    complementariob: '#39A34E',
    complementarioc: '#E30B28',
    complementario2: '#96081C',
    complementariod: '#A3081D'
  },
  directives: {
    Ripple, Scroll, ClickOutside
  },
  options: {
    minifyTheme (css) {
      return css.replace(/[\s|\r\n|\r|\n]/g, '')
    }
  }
})
