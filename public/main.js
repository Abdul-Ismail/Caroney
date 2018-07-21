

const getRegistrationNumberInfo = function(){
    var xhr = new XMLHttpRequest();
    console.log('in here ')

    const reg = document.getElementById('regNumber').value

    xhr.open("GET", "http://localhost:4000/regNumberDetails?reg=" + reg, false);
    xhr.send();
    console.log('got it ')

    const obj = JSON.parse(xhr.response)
    console.log(obj)

    document.getElementById('model').value = obj.model
    document.getElementById('make').value = obj.make
    document.getElementById('year').value = (2018 - obj.age)
    document.getElementById('transmission').value = obj.transmission
    document.getElementById('engine').value = obj.engine
    document.getElementById('fuel').value = obj.fuel
    document.getElementById('body').value = obj.body
    document.getElementById('color').value = obj.color
    document.getElementById('doors').value = obj.doors
}

const predictPrice = function(){
    // console.log('prediction')
    // var xhr = new XMLHttpRequest();
    //
    // xhr.open("POST", "http://localhost:4000/predictPrice", false);
    // xhr.setRequestHeader("Content-Type", "application/json");
    //
    // xhr.send(JSON.stringify({ email: "hello@user.com", response: { name: "Tester" } }));

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:4000/predictPrice";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var data = JSON.stringify({
        model: document.getElementById('model').value,
        make: document.getElementById('make').value,
        age: (2018 - document.getElementById('year').value),
        transmission: document.getElementById('transmission').value,
        engine: document.getElementById('engine').value,
        fuel: document.getElementById('fuel').value,
        body: document.getElementById('body').value,
        color: document.getElementById('color').value,
        doors: document.getElementById('doors').value
    });
    xhr.send(data);


    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.price)
            document.getElementById('predictedPrice').innerText = json.price
        }
    }


    // const obj = JSON.parse(xhr.response)
    // console.log(obj)
}