import bus from './eventbus'

const addressFinder = {
    ready: false,

    initAddressFinder () {
        addressFinder.ready = true
        bus.$emit('afloaded')
    },

    initialise () {
        const script = document.createElement('script')
        script.src = 'https://api.addressfinder.io/assets/v3/widget.js'
        script.async = true
        script.onload = addressFinder.initAddressFinder
        document.body.appendChild(script)
    }
}

export default addressFinder
