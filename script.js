window.onload = function() {
    //document.getElementById("buttonCal").onclick = getTheValuesAndCalculate;

    document.getElementById("female").classList.add('inactive');
    document.body.style.backgroundColor = "#D5F3FE";
    //buttonCal.style.backgroundColor = "#3C99DC";

    document.getElementById("female").onclick = changeGender;
    document.getElementById("male").onclick = changeGender;
}

function changeGender(e){
    const buttonPressed = e.target;
    if (buttonPressed.value == "male"){
        if (buttonPressed.classList.contains('inactive') == true){
            buttonPressed.classList.remove('inactive');
            document.getElementById("female").classList.add('inactive');
            document.body.style.backgroundColor = "#D5F3FE";
            //buttonCal.style.backgroundColor = "#3C99DC";
        }
    }
    else if (buttonPressed.value == "female"){
        if (buttonPressed.classList.contains('inactive') == true){
            buttonPressed.classList.remove('inactive');
            document.getElementById("male").classList.add('inactive');
            document.body.style.backgroundColor = "#FFD7EC";
            //buttonCal.style.backgroundColor = "#FF78BD";
        }
    }
}

function getTheValuesAndCalculate(){
    document.getElementById("healthyWeights").innerText = "Healthy weight for your height: "//gambiarra
    const data = document.querySelectorAll("#data > div > input");

    let leaveTheFunction = false;
    for (let i = 0; i < data.length; i++){
        if (data[i].value.length == 0){
            console.log(data[i].placeholder)
            data[i].placeholder = "!"
            console.log(data[i].placeholder)
        }
        else{

        }
    }

    if (leaveTheFunction == true){
        return;
    }
    
    const age = Number(document.getElementById("age").value);
    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);
    const gender = document.querySelector('.gender:not(.inactive)').value;

    const [bmi, bmiClassification, healthyWeights] = bmiCalculation(weight , height);

    document.getElementById("outputBmiNumber").innerText = bmi.toFixed(1);
    document.getElementById("outputBmiClassification").innerText = bmiClassification;
    document.getElementById("healthyWeights").textContent += healthyWeights[0] +"kg" + " - " + healthyWeights[1] +"kg";

    const bmr = bmrCalculation(age, height, weight, gender);
    document.getElementById("outputBmr").innerText = bmr + " kcal";
}

function bmiCalculation(weight, height){
    height = height * 0.01;

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

    const healthyWeights = () => {
        let minHealthyWeight = 0;
        let maxHealthyWeight = 0;
    
        let minHealthyWeightFind = false;
        let maxHealthyWeightFind = false;
    
        for (let i = 0; i < (height * 100); i++){
            let currentBMI = i / (height * height)

            if (currentBMI >= 18.5 && minHealthyWeightFind == false){
                minHealthyWeightFind = true;
                minHealthyWeight = i;
            }
            else if (currentBMI >= 24.9 && maxHealthyWeightFind == false){
                maxHealthyWeightFind = true;
                maxHealthyWeight = i;
                break;
            }
        }
        
        return [minHealthyWeight, maxHealthyWeight];
    }

    return [bmi, classification(), healthyWeights()];
}

function bmrCalculation(age, height, weight, gender){
    if (gender == "male"){
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
    else if (gender == "female"){  
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
}
