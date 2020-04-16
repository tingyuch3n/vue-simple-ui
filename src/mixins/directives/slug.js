import Vue from 'vue'

let component = null

const slug = {

    inserted (el, binding, vnode) {

        let field = vnode.componentInstance.$parent.$refs[vnode.componentOptions.propsData.getRef]
        let fieldId = document.getElementById(field.id)

        fieldId.addEventListener('blur', (e) => {

            // el.value = e.target.value
        })

        // let span = document.createElement('span')

        // el.onfocus = (e) => {
        //     el.blur = false
        //     if (e.target.value.length !== 0) {
        //         el.nextElementSibling.classList.add('v-reset-input-active')
        //     }
        // }
        // el.onblur = (e) => {
        //     el.blur = true
        //     if (e.target.value.length !== 0) {
        //         el.nextElementSibling.classList.remove('v-reset-input-active')
        //     }
        // }

    },
    update (el, binding, vnode) {
        if (el.value && !el.blur) {
            el.nextElementSibling.classList.add('v-reset-input-active')
        } else {
            el.nextElementSibling.classList.remove('v-reset-input-active')
        }
    }
}

export default slug