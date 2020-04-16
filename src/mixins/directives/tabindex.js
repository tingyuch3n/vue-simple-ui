const taxIndex = {
    bind: function (el, binding, vnode) {
        let index = vnode.elm.tabIndex
        let maxLength = vnode.elm.maxLength

        el.addEventListener('keyup', function (e) {
            if (e.target.value.length === maxLength) {
                if (index !== 3) {
                    if (index === 1) {
                        document.getElementById('month').focus()
                    } else if (index === 2) {
                        document.getElementById('year').focus()
                    }
                }
            }
        })

        el.addEventListener('blur', function (e) {
            if (el.value.length === 1 && maxLength === 2) {
                el.value = 0 + el.value
            }
        }, true)
    }
}

export default taxIndex
