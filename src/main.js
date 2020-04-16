import Vue from 'vue'
import App from './App'
import {
    BInput,
    BSelect,
    BCheckbox,
    // BUploader,
    BFormField,
    BDateOfBirth
} from './index'
import Vuelidate from 'vuelidate';

Vue.use(BFormField)
Vue.use(BInput)
Vue.use(BSelect)
Vue.use(BCheckbox)
Vue.use(BDateOfBirth)
// Vue.use(BUploader)
Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
    render: h => h(App)
}).$mount('#app')
