import {getFields, checkFields} from "./utils.js";
import {generateCF} from "./codicefiscale.js";

const btn = document.getElementById("btn")
btn.addEventListener('click', main)

function main(e) {
    e.preventDefault()

    const fields = getFields()

    //check if all fields are OK
    if (checkFields(fields)) {alert("Assicurati di aver riempito correttamente tutti i campi!"); return}
    console.log(fields)

    //output to html span#output
    document.getElementById("output").innerHTML = generateCF(fields)
}

