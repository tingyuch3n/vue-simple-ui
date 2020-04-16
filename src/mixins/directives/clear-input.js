import Vue from 'vue'

let component = null

const clearinput = {
    inserted (el, binding, vnode) {

        let span = document.createElement('span')

        el.onfocus = (e) => {
            el.blur = false
            if (e.target.value.length !== 0) {
                el.nextElementSibling.classList.add('v-reset-input-active')
            }
        }
        el.onblur = (e) => {
            el.blur = true
            if (e.target.value.length !== 0) {
                el.nextElementSibling.classList.remove('v-reset-input-active')
            }
        }

        let clickHandler = () => {
            el.value = ''
            el.dispatchEvent(new Event('input'))
            el.focus()
        }

        let inputReset = Vue.extend({
            render (h) {
                return h('span', {
                    on: { click: clickHandler },
                    domProps: { innerHTML: '&#10006' },
                    class: { 'v-reset-input': true },
                    style: { position: 'absolute', cursor: 'default' }
                })
            }
        })

        el.after(span)
        component = new inputReset().$mount(span)
    },
    update (el, binding, vnode) {
        if (el.value && !el.blur) {
            el.nextElementSibling.classList.add('v-reset-input-active')
        } else {
            el.nextElementSibling.classList.remove('v-reset-input-active')
        }
    }
}

export default clearinput
