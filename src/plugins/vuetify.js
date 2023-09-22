import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, md } from 'vuetify/iconsets/md'

const vtfy = createVuetify({
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md
    }
  },
  defaults: {
    VTextField: { density: 'compact', variant: 'outlined' },
    VFileInput: { density: 'compact', variant: 'outlined' },
    VTextarea: { density: 'compact', variant: 'outlined' },
    VSelect: { density: 'compact', variant: 'outlined' },
    VSwitch: { density: 'compact', variant: 'outlined' }
  }
})

export default vtfy
