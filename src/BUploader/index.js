import Progress from '../../node_modules/element-ui/lib/progress'
import Dialog from '../../node_modules/element-ui/lib/dialog'
import Uploader from './Uploader.vue'

const components = [
    Uploader,
    Progress,
    Dialog
]

const BUploader = {
    install: function (Vue) {
        components.map(component => {
            Vue.component(component.name, component)
        })
    }
}

export default BUploader
