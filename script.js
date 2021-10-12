window.onload = function() {
    document.getElementById("buttonCal").onclick = getTheValuesAndCalculate;

    if (Math.random() > 0.5){ //maybe make different
        document.getElementsByClassName("gender")[0].checked = true;
    }
    else{
        document.getElementsByClassName("gender")[1].checked = true;
    }
}

function getTheValuesAndCalculate(){
    //every input have something?
    const data = document.querySelectorAll("#data > div > input:not(.gender)");

    let leaveTheFunction = false;
    for (let i = 0; i < data.length; i++){
        if (data[i].value.length == 0){
            data[i].classList.add('isNull');
            leaveTheFunction = true;
            //data[i].parentElement.classList.add('isNull');
            data[i].placeholder = '!';
        }
        else{
            data[i].classList.remove('isNull');
        }
    }

    //if input is null
    if (leaveTheFunction == true){
        return;
    }

    //else
    const age = Number(document.getElementById("age").value);
    const heightFirstInput = Number(document.getElementsByClassName("height")[0].value);
    const heightSecondInput = Number(document.getElementsByClassName("height")[1].value);
    const weight = Number(document.getElementById("weight").value);
    const gender = (document.querySelector('input[name="gender"]:checked') != null) ? document.querySelector('input[name="gender"]:checked').value : null;

    const [bmi, bmiClassification] = bmiCalculation(weight , heightFirstInput, heightSecondInput);
    console.log(bmi);
    console.log(bmiClassification);

    const bmr = bmrCalculation(age, heightFirstInput, heightSecondInput, weight, gender);
    console.log(bmr);
}

function bmiCalculation(weight, heightFirstInput, heightSecondInput){
    const height = heightFirstInput + (heightSecondInput * 0.01);

    const bmi = weight / (height * height);

    const classification = () => {
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
    
    return [bmi, classification()];
}

function bmrCalculation(age, heightFirstInput, heightSecondInput, weight, gender){
    height = (heightFirstInput * 100) + heightSecondInput;

    if (gender == "male"){
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
    else if (gender == "female"){  
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
}
