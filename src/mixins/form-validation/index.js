/**
 * Check if Date of birth is over 18
 * @param birth
 * @returns {boolean}
 */

export const isOverAge = (dates) => {
    let today = new Date()
    let birthDate = new Date(dates)
    let age = today.getFullYear() - birthDate.getFullYear()
    let m = today.getMonth() - birthDate.getMonth()

    if (isNaN(birthDate)) {
        return false
    } else {
        if (isValid(dates)) {
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--
            }
            return age >= 18
        }
        return false

    }
}

/**
 * Check if Date of birth format is valid
 * @param birth
 * @returns {boolean}
 */
export const isValid = (dates) => {
    const birth = dates.split('-')
    let year = birth[0]
    let month = birth[1]
    let day = birth[2]

    let dateString = `${day}/${month}/${year}`
    let re = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/
    let matchArray = dateString.match(re)

    if (matchArray !== null) {
        if (month < 1 || month > 12) {
            return false
        }

        if (day < 1 || day > 31) {
            return false
        }

        if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
            return false
        }

        if (year < 1900 || year > new Date().getFullYear()) {
            return false
        }

        if (month === 2) { // check for february 29th
            let isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
            if (day > '29' || (day === '29' && !isleap)) {
                return false
            }
        }

        return true
    } else {
        return false
    }
}
