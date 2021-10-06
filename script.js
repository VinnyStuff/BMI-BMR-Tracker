window.onload = function() {
    document.getElementById("buttonCal").onclick = getTheValuesAndCalculate;
};

function getTheValuesAndCalculate(){
    const age = Number(document.getElementById("age").value);
    const heightFirstInput = Number(document.getElementsByClassName("height")[0].value);
    const heightSecondInput = Number(document.getElementsByClassName("height")[1].value);
    const weight = Number(document.getElementById("weight").value);
    const gender = (document.querySelector('input[name="gender"]:checked') != null) ? document.querySelector('input[name="gender"]:checked').value : null;

    bmi(weight , heightFirstInput, heightSecondInput);

    bmr(age, heightFirstInput, heightSecondInput, weight, gender);
}

function bmi(weight, heightFirstInput, heightSecondInput){
    const height = heightFirstInput + (heightSecondInput * 0.01);

    const bmi = weight / (height * height);
    console.log(bmi);
}

function bmr(age, heightFirstInput, heightSecondInput, weight, gender){
    height = (heightFirstInput * 100) + heightSecondInput;
    if (gender == "male"){
        console.log(height);
        const bmr = 66.5 + (13.75 * weight) + (5.0 * height) - (6.8 * age);
        //VER ESSA FORMULA NOVAMENTE
        console.log(bmr);
    }
    else if (gender == "female"){

    }
}
