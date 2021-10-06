window.onload = function() {
    document.getElementById("buttonCal").onclick = calculate;
};

function calculate(){
    const age = Number(document.getElementById("age").value);
    const heightFirstInput = Number(document.getElementsByClassName("height")[0].value);
    const heightSecondInput = Number(document.getElementsByClassName("height")[1].value);
    const weight = Number(document.getElementById("weight").value);
    const gender = (document.querySelector('input[name="gender"]:checked') != null) ? document.querySelector('input[name="gender"]:checked').value : null;

    //BMI or IMC
    const bmiHeight = heightFirstInput + (heightSecondInput * 0.01);
    const bmi = weight / (bmiHeight * bmiHeight);

    console.log(weight);
    console.log(bmiHeight);
    console.log(bmi);
}