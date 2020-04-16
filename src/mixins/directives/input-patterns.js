const replacement = ''
const string = []
const input = {
    BACKSPACE: 8,
    BACKSPACE_SAFARI: 127,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    INSERT: 45,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38,
    X: 88,
    CONTROL: 17,
    ARROWUP: 38,
    ARROWDOWN: 40,
    ARROWLEFT: 37,
    ARROWRIGHT: 39,
    CAPSLOCK: 20
}

function event (name) {
    const evt = document.createEvent('Event')
    evt.initEvent(name, true, true)
    return evt
}
const patterns = {
    inserted (el, binding) {
        const regex = binding.value
        el.addEventListener('beforeinput', (e) => {
            if (!regex.test(e.data)) {
                e.preventDefault()
            }
        })
    }
}

export default patterns
