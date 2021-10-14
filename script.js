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
    const heightFirstInput = Number(document.getElementsByClassName("height")[0].value);
    const heightSecondInput = Number(document.getElementsByClassName("height")[1].value);
    const weight = Number(document.getElementById("weight").value);
    const gender = document.querySelector('.gender:not(.inactive)').value;

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
