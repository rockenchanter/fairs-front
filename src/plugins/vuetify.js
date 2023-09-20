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
    VTextField: { variant: 'outlined' },
    VFileInput: { variant: 'outlined' },
    VTextarea: { variant: 'outlined' },
    VSelect: { variant: 'outlined' }
  }
})

export default vtfy
