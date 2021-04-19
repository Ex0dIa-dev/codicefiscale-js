//Funzioni Utili

//get fields value
function getFields() {

    const fields = {
        surname: (document.getElementById("surname").value).toUpperCase(),
        name: (document.getElementById("name").value).toUpperCase(),
        city: (document.getElementById("city").value).toUpperCase(),
        birthday: new Date(document.getElementById("birthday").value),
        gender: document.getElementById("gender").value
    }

    return fields
}

//check if some field value is empty
function checkFields(f) {

    for (const [key,value] of Object.entries(f)) {
        if (value === "") {return true}
    }

    const date = Date.parse(f["birthday"]) || 0
    if (date === 0) {return true}

    const today = new Date()
    if (date > Date.parse(today)) {
        return true
    }
    
    return false
}

//return n_vows and vows
function getVowals(s) {

    let n_vows = s.split("").filter(c => "AEIOU".includes(c)).length;
    let vows = s.split("").filter(c => "AEIOU".includes(c))

    return [n_vows, vows]
}

//return n_cons and cons
function getConsonants(s) {

    let n_cons = s.split("").filter(c => !"AEIOU".includes(c)).length;
    let cons = s.split("").filter(c => !"AEIOU".includes(c))

    return [n_cons, cons]
}



export {getFields, checkFields, getVowals, getConsonants}