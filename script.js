window.onload = function() {
    document.getElementById("buttonCal").onclick = getTheValuesAndCalculate;
};

function getTheValuesAndCalculate(){
    const age = Number(document.getElementById("age").value);
    const heightFirstInput = Number(document.getElementsByClassName("height")[0].value);
    const heightSecondInput = Number(document.getElementsByClassName("height")[1].value);
    const weight = Number(document.getElementById("weight").value);
    const gender = (document.querySelector('input[name="gender"]:checked') != null) ? document.querySelector('input[name="gender"]:checked').value : null;
    const data = [age, heightFirstInput, heightSecondInput, weight, gender];

    for (let i = 0; i < data.length; i++){
        
    }

    bmi(weight , heightFirstInput, heightSecondInput);

    bmr(age, heightFirstInput, heightSecondInput, weight, gender);
}

function bmi(weight, heightFirstInput, heightSecondInput){
    const height = heightFirstInput + (heightSecondInput * 0.01);

    const bmi = weight / (height * height);

    const classification = function (){
        if (bmi < 18.5){
            return "Underweight";
        }
        else if (bmi > 18.5 && bmi < 24.9){
            return "Normal weight";
        }
        else if (bmi > 25.0 && bmi < 29.9){
            return "Pre-obesity";
        }
        else if (bmi > 30.0 && bmi < 34.9){
            return "Obesity class I";
        }
        else if (bmi > 35.0 && bmi < 39.9){
            return "Obesity class II";
        }
        else if (bmi > 40.0){
            return "Obesity class III";
        }
    }

    //console.log(bmi);
    //console.log(classification());
}

function bmr(age, heightFirstInput, heightSecondInput, weight, gender){
    height = (heightFirstInput * 100) + heightSecondInput;
    if (gender == "male"){

    }
    else if (gender == "female"){  

    }
}
