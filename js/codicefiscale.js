//Generazione codice fiscale

import {getVowals, getConsonants} from "./utils.js";
import {month} from "../data/month.js";
import {comuni} from "../data/comuni.js";
import {control_code, char_odd_value, char_even_value} from "../data/controlcode.js"

//return surname "XXX"
function getSurname(s) {

    const [nc, cons] = getConsonants(s)
    const [nv, vows] = getVowals(s)

    switch(true) {
        case nc >= 3:
            return cons[0] + cons[1] + cons[2]
        case nc === 2:
            if (nv >= 1) {return cons[0] + cons[1] + vows[0]} else {return cons[0] + cons[1] + "X"}
        case nc === 1:
            if (nv >= 2) {return cons[0] + vows[0] + vows[1]} else {return cons[0] + vows[0] + "X"}
    }
    
}

//return Name as "XXX"
function getName(s) {

    const [nc, cons] = getConsonants(s)
    const [nv, vows] = getVowals(s)

    switch(true) {
        case nc >= 4:
            return cons[0] + cons[2] + cons[3]
        case nc === 3:
            return cons[0] + cons[1] + cons[2]
        case nc === 2:
            if (nv >= 1) {return cons[0] + cons[1] + vows[0]} else {return cons[0] + cons[1] + "X"}
        case nc === 1:
            if (nv >= 2) {return cons[0] + vows[0] + vows[1]} else {return cons[0] + vows[0] + "X"}
    }
    
}

//take a Date, return YY
function getYear(d) {

    return String(d.getFullYear()).slice(2)

}

//return a char of month
function getMonthChar(d) {

    return month[d.getMonth()]

}

//input = date(birthday) and gender
function getDay(d, g) {

    if (g === "F") {return d.getUTCDate() + 40} else {return d.getUTCDate()}

}


function getCityCode(city) {
    return comuni[city]
}

function getControlCode(cf) {

    let n = 0;
    let even_ch = [];
    let odd_ch = [];

    for (const ch of cf) {
        if(n%2===0) {even_ch.push(ch)} else {odd_ch.push(ch)}
        n++
    }
    
    let tot = 0;
    for (const ch of odd_ch) {
        if ("0123456789".includes(ch)) {tot += parseInt(ch)} else {tot += parseInt(char_odd_value[ch])}
    }

    for (const ch of even_ch) {
        tot += parseInt(char_even_value[ch])
    }

    return control_code[tot%26]
}


function generateCF(fields) {

    let cf = "";
    cf += getSurname(fields["surname"])
    cf += getName(fields["name"])
    cf += getYear(fields["birthday"])
    cf += getMonthChar(fields["birthday"])
    cf += getDay(fields["birthday"], fields["gender"])
    cf += getCityCode(fields["city"])
    
    if (cf.length !== 15) {return "error"}
    cf += getControlCode(cf)

    return cf
}

export {generateCF}