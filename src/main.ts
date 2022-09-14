import { createApp } from 'vue'
import './style.css'
import './assets/icon.scss'
import App from './App.vue'

import SuButton from './components/button/index.vue'
import SuRadio from './components/radio/index.vue'
import SuRadioGroup from './components/radio/group.vue'
import SuCheckbox from './components/checkbox/index.vue'
import SuCheckboxGroup from './components/checkbox/group.vue'

const components = [
  SuButton,
  SuRadio,
  SuRadioGroup,
  SuCheckbox,
  SuCheckboxGroup,
]

const app = createApp(App)

const install = (app: any) => {
  components.forEach(i => app.use(i))
}

install(app)

app.mount('#app')
