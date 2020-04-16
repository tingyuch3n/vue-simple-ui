/**
 * Textarea attributes
 */
const MATCH = /\s+/g
const REPLACE = /['";:,.?¿\-!¡]+/g

const count = (value) => {
    return (value.replace(REPLACE, ' ').match(MATCH) || []).length
}

const wordsRemaining = (maxlength, value) => {
    if (value) {
        if (value.trim()) {
            return maxlength - count(value) - 1
        }
    } else {
        return maxlength
    }
}

export default (self) => {
    const maxlength = self.wordlength ? self.wordlength : self.$attrs.maxlength
    let input
    let directives
    if (maxlength) {
        input = (e) => {
            self.$emit('remaining', wordsRemaining(maxlength, e.target.value))
            self.updateValue(e.target.value)
        }

        directives = [
            {
                name: 'wordcountlimit'
            }
        ]
    } else {
        input = (e) => {
            self.updateValue(e.target.value)
        }
        directives = []
    }

    return {
        attrs: self.$attrs,
        domProps: {
            value: self.value
        },
        props: {
            wordlength: self.wordlength ? self.wordlength : undefined
        },
        on: { input },
        directives
    }
}
