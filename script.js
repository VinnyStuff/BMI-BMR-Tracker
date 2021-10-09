window.onload = function() {
    document.getElementById("buttonCal").onclick = getTheValuesAndCalculate;
};

function getTheValuesAndCalculate(){
    const age = document.getElementById("age").value;
    const heightFirstInput = document.getElementsByClassName("height")[0].value;
    const heightSecondInput = document.getElementsByClassName("height")[1].value;
    const weight = document.getElementById("weight").value;
    const gender = (document.querySelector('input[name="gender"]:checked') != null) ? document.querySelector('input[name="gender"]:checked').value : 0;
    const data = [age, heightFirstInput, heightSecondInput, weight, gender]

    for (let i = 0; i < data.length; i++){
        
    }

    const [bmi, bmiClassification] = bmiCalculation(Number(weight) , Number(heightFirstInput), Number(heightSecondInput));
    console.log(bmi);
    console.log(bmiClassification);

    const bmr = bmrCalculation(Number(age), Number(heightFirstInput), Number(heightSecondInput), Number(weight), gender);
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
