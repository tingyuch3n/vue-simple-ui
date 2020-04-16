const wordcount = {
    inserted (el, binding, vnode) {
        const div = document.createElement('div')
        div.setAttribute('class', 'words')
        div.innerHTML = `<span id="wordslimit" class="limit">${vnode.context.wordlength}</span> words remaining`
        vnode.elm.parentNode.insertBefore(div, vnode.elm.parentNode.childNodes[1])

        el.addEventListener('keydown', (event) => {
            let regex = /\s+/gi
            let wordsLeft
            let len

            if (event.target.value.trim() !== '') {
                len = event.target.value.replace(regex, ' ').split(' ')

                if (len.length > vnode.context.wordlength) {
                    if (event.keyCode === 46 || event.keyCode === 8) { // Allow backspace and delete buttons
                    } else if (event.keyCode < 48 || event.keyCode > 57) { // all other buttons
                        event.preventDefault()
                    }
                }
                wordsLeft = vnode.context.wordlength - len.length
            } else {
                wordsLeft = vnode.context.wordlength
            }

            let wordCount = document.getElementById('wordslimit')
            if (wordsLeft === -1) {
                wordsLeft = 0
            }

            wordCount.innerHTML = wordsLeft
        })
    },
    update (el, binding, vnode) {
        if (el.value === '') {
            let wordCount = document.getElementById('wordslimit')
            wordCount.innerHTML = vnode.context.wordlength
        }
    }
}

export default wordcount
