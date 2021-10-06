document.getElementById("buttonCal").onclick = calculate;

function calculate(){
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const gender = (document.querySelector('input[name="gender"]:checked') != null) ? document.querySelector('input[name="gender"]:checked').value : null;

    console.log(age);
    console.log(height);
    console.log(weight);
    console.log(gender);
}