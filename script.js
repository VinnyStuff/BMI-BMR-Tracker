window.onload = function() {
    document.getElementById("female").classList.add('inactive');
    document.body.style.backgroundColor = "#D5F3FE";

    document.getElementById("female").onclick = changeGender;
    document.getElementById("male").onclick = changeGender;

    document.getElementById("age").oninput = getTheValuesAndCalculate;
    document.getElementById("height").oninput = getTheValuesAndCalculate;
    document.getElementById("weight").oninput = getTheValuesAndCalculate;

    document.getElementById("bla").onclick = changeUnitsOfMeasurement;
    document.getElementById("imperialSystem").style.display = "none"
}

function changeUnitsOfMeasurement(){
    const metricSystemDiv = document.getElementById("metricSystem");
    const imperialSystemDiv = document.getElementById("imperialSystem");
    const weight = document.getElementById("measureWeight")

    if (weight.innerText === "kg"){ //active imperial system
        weight.innerText = "lb";
        metricSystemDiv.style.display = "none"
        imperialSystemDiv.style.display = "block"
    }
    else if (weight.innerText === "lb"){ //active metric system
        weight.innerText = "kg";
        metricSystemDiv.style.display = "block"
        imperialSystemDiv.style.display = "none"
    }
}

function currentUnitOfMeasurement(){
    const weight = document.getElementById("measureWeight")

    if (weight.innerText === "kg"){
        return "metricSystem";
    }
    else if (weight.innerText === "lb"){
        return "imperialSystem";
    }
}

function changeGender(e){
    const buttonPressed = e.target;
    if (buttonPressed.value == "male"){
        if (buttonPressed.classList.contains('inactive') == true){
            buttonPressed.classList.remove('inactive');
            document.getElementById("female").classList.add('inactive');
            document.body.style.backgroundColor = "#D5F3FE";
        }
    }
    else if (buttonPressed.value == "female"){
        if (buttonPressed.classList.contains('inactive') == true){
            buttonPressed.classList.remove('inactive');
            document.getElementById("male").classList.add('inactive');
            document.body.style.backgroundColor = "#FFD7EC";
        }
    }
    //clean inputs when gender changes
    const data = document.querySelectorAll("#data > div > input");
    for (let i = 0; i < data.length; i++){
        if (data[i].id === "age"){
            data[i].placeholder = "23";
        }
        else if (data[i].id === "height"){
            data[i].placeholder = "172";
        }
        else if (data[i].id === "weight"){
            data[i].placeholder = "68";
        }
        data[i].classList.remove("inputIsNull")
        data[i].value = "";
    }

    const outputs = document.querySelectorAll(".output > p");
    for (let i = 0; i < outputs.length; i++){
        if (outputs[i].id === "healthyWeights"){
            outputs[i].innerText= "Healthy weight for your height: ";
        }
        else{
            outputs[i].innerText = "-";
        }
    }
}

function getTheValuesAndCalculate(){
    const data = document.querySelectorAll("#data > div > input");

    const outputBmiNumber = document.getElementById("outputBmiNumber");
    const outputBmiClassification = document.getElementById("outputBmiClassification");
    const healthyWeights = document.getElementById("healthyWeights");
    const outputBmr = document.getElementById("outputBmr");

    for (let i = 0; i < data.length; i++){
        if (data[i].value.length > 0){
            data[i].classList.remove("inputIsNull");

            const age = Number(document.getElementById("age").value);
            const weight = () => {
                currentWeight = Number(document.getElementById("weight").value);

                if (currentUnitOfMeasurement() === "metricSystem"){
                    return currentWeight;
                }
                else if (currentUnitOfMeasurement() === "imperialSystem"){
                    return currentWeight / 2.205;
                }
            }
            const height = () => {
                if (currentUnitOfMeasurement() === "metricSystem"){
                    return Number(document.getElementById("height").value);
                }
                else if (currentUnitOfMeasurement() === "imperialSystem"){
                    const feet = Number(document.getElementById("heightImperial1").value);
                    const inches = Number(document.getElementById("heightImperial2").value);

                    const feetInCm = feet * 30.48;
                    const inchesInCm = inches * 2.54;
                    return feetInCm + inchesInCm;
                }
            }
            const gender = document.querySelector('.gender:not(.inactive)').value;
        
            const [bmi, bmiClassification, healthyWeights] = bmiCalculation(weight() , height());
        
            outputBmiNumber.innerText = bmi.toFixed(1);
            outputBmiClassification.innerText = bmiClassification;
            healthyWeights.innerHTML = "Healthy weight for your height: " + healthyWeights[0] +"kg" + " - " + healthyWeights[1] +"kg";
        
            const bmr = bmrCalculation(age, height(), weight(), gender);
            outputBmr.innerText = bmr.toFixed(2) + " kcal";
        }
        else if (data[i].value.length == 0){
            data[i].placeholder = "!"
            data[i].classList.add("inputIsNull");

            outputBmiNumber.innerText = "-";
            outputBmiClassification.innerText = "-";
            healthyWeights.innerHTML = "Healthy weight for your height: ";
            outputBmr.innerText = "-";
        }
    }
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
