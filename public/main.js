const carMake = {
    'AC': ['Cobra'],
    'Aixam': ['500'],
    'Alfa Romeo': ['Brera', 'Giulietta', 'GT', 'MiTo', 'Spider', '145', '147', '156', '159'],
    'Aston Martin': ['DB7', 'Other'],
    'Audi': ['2.0TDI 150BHP', '80 Avant', 'A1', 'A3', 'A4', 'A4 Avant', 'A5', 'A6', 'A6 Avant', 'A7', 'A8', 'Allroad', 'Q2', 'Q3', 'Q5', 'Q7', 'Quattro', 'R8', 'RS4', 'RS6', 'S3', 'S5', 'S6', 'S8', 'SQ5', 'TT', '80', '100', 'Other'],
    'Austin': ['Metro', 'Mini', '7'],
    'Bentley': ['Flying Spur'],
    'BMW': ['1 Series', '2 Series', '3 Series', '320i', '4 Series', '5 Series', '6 Series', '7 Series', 'i3', 'i8', 'M2', 'M3', 'M4', 'M5', 'M6', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'Z3', 'Z4', '520', 'Other'],
    'Bugatti': ['Other'],
    'Chevrolet': ['Astra', 'Aveo', 'Camaro', 'Captiva', 'Cruze', 'Epica', 'Kalos', 'Lacetti', 'Matiz', 'Nubira', 'Spark', 'Tacuma', 'Other'],
    'Chrysler': [],
    'Citroen': ['Berlingo', 'Berlingo Multispace', 'C-Crosser', 'C1', 'C2', 'C3', 'C3 Picasso', 'C4', 'C4 Cactus', 'C4 Grand Picasso', 'C4 Picasso', 'C5', 'C8', 'Dispatch', 'DS3', 'DS4', 'DS5', 'Nemo', 'Picasso', 'Relay', 'Saxo', 'Xantia', 'Xsara', 'Xsara Picasso'],
    'Dacia': ['Duster', 'Logan', 'Sandero', 'Sandero Stepway'],
    'Daewoo': ['Kalos', 'Lanos', 'Matiz', 'Rexton'],
    'Daihatsu': ['Cuore', 'Fourtrak', 'Mira', 'Sirion', 'Terios'],
    'Dodge': ['Caliber', 'Nitro'],
    'Ferrari': ['F355'],
    'Fiat': ['500L', '500X', 'Abarth', 'Bravo', 'Coupe', 'Doblo', 'Doblo Cargo', 'Ducato', 'Fiorino', 'Idea', 'Multipla', 'Panda', 'Punto', 'Qubo', 'Scudo', 'Sedici', 'Seicento', 'Spider', 'Stilo', 'Talento', 'Tipo', '500'],
    'Ford': ['B-Max', 'Courier', 'EcoSport', 'Edge', 'Escort', 'Fiesta', 'Focus', 'Focus C-MAX', 'Fusion', 'Galaxy', 'Grand C-Max', 'Ka', 'Kuga', 'Mondeo', 'Mustang', 'Ranger', 'S-Max', 'Sierra', 'Tourneo', 'Tourneo Connect', 'Tourneo Custom', 'Transit', 'Transit Connect', 'TRANSIT COURIER', 'Other'],
    'Great Wall': ['Steed'],
    'Honda': ['Accord', 'Civic', 'CR-V', 'CR-Z', 'Crx', 'Fit', 'FR-V', 'Freed', 'HR-V', 'Insight', 'Integra', 'Jazz', 'Prelude', 'S2000', 'Stream', 'Other'],
    'Hummer': ['H3'],
    'Hyundai': ['Accent', 'Amica', 'Atoz', 'Coupe', 'Elantra', 'Getz', 'i10', 'i20', 'i30', 'i40', 'ix20', 'ix35', 'Lantra', 'Matrix', 'Montana', 'Santa Fe', 'Sonata', 'Trajet', 'Tucson', 'Veloster'],
    'Infiniti': [''],
    'Isuzu': ['D-Max', 'NNR', 'NPR', 'NQR', 'Trooper'],
    'Iveco': ['Daily'],
    'Jaguar': ['E- PACE', 'F- PACE', 'F-Type', 'S-Type', 'X-Type', 'XE', 'XF', 'XJ Series', 'XK Series', 'XKR'],
    'Jeep': ['Cherokee', 'Compass', 'Grand Cherokee', 'Renegade', 'Wrangler'],
    'Kia': ['Carens', 'Carnival', 'ceed', 'Cerato', 'Magentis', 'Niro', 'Optima', 'Picanto', 'Pro Ceed', 'Rio', 'Sedona', 'Sorento', 'Soul', 'Sportage', 'Venga'],
    'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Freelander', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport'],
    'LDV': ['Other'],
    'Lexus': ['CT Hybrid', 'GS', 'GS 300h', 'IS', 'IS 300h', 'LS', 'NX', 'RX', 'RX450h'],
    'Lincoln': ['Other'],
    'Maserati': ['Coupe', 'Ghibli', 'Quattroporte'],
    'Mazda': ['B-Series', 'Bongo', 'CX-3', 'CX-5', 'CX-7', 'Demio', 'MX-3', 'MX-5', 'Premacy', 'RX7', 'RX8', 'Tribute', '2', '3', '5', '6', '121', '323', '626'],
    'Mercedes-Benz': ['A-Class', 'A140', 'AMG', 'Atego', 'B-Class', 'C-Class', 'CL-Class', 'CLA-Class', 'CLC-Class', 'CLK-Class', 'CLS-Class', 'Cube', 'E-Class', 'GL-Class', 'GLA-Class', 'GLC-Class', 'GLE-Class', 'M-Class', 'ML-Class', 'R-Class', 'S-Class', 'SL-Class', 'SLC', 'SLK-Class', 'Sprin', 'V-Class', 'Vaneo', 'Viano', 'Vito', '190', '200', '220', '230', '250', '280', '300', '320', 'Other'],
    'MG': ['MGBGT', 'MGF', 'ZR'],
    'MINI': ['Clubman', 'Convertible', 'Cooper', 'Cooper S', 'COUNTRYMAN', 'First', 'JOHN COOPER WORKS', 'MINI', 'One', 'PACEMAN', 'ROADSTER'],
    'Mitsubishi': ['ASX', 'Canter', 'Carisma', 'Colt', 'FTO', 'Grandis', 'i', 'L200', 'Lancer', 'Mirage', 'Outlander', 'Pajero', 'Shogun', 'Space Star', 'Space Wagon', 'Other'],
    'Morris': ['Minor'],
    'Nissan': ['100 NX', '200 SX', '300 ZX', '350 Z', 'Almera', 'Almera Tino', 'Cabstar', 'Figaro', 'Juke', 'Leaf', 'March', 'Micra', 'Murano', 'Navara', 'NOTE', 'NP300', 'NV200', 'NV200 Combi', 'NV400', 'Pathfinder', 'Patrol', 'Pixo', 'Primastar', 'Primera', 'Pulsar', 'QASHQAI', 'Qashqai+2', 'Serena', 'Silvia', 'Skyline', 'Sunny', 'Terrano', 'Tiida', 'Tino', 'X-Trail', 'Other'],
    'Opel': ['Adam', 'Agila', 'Antara', 'Astra', 'Astravan', 'Combo', 'Corsa', 'Corsavan', 'Frontera', 'Insignia', 'KARL', 'Meriva', 'Mokka', 'Movano', 'Omega', 'Signum', 'Tigra', 'Vectra', 'Vivaro', 'Zafira'], 'Peugeot': ['106', '107', '108', '205', '206', '207', '208', '304', '306', '307', '307 SW', 'Bipper', 'Boxer', 'Expert', 'Partner', 'Partner Tepee', 'RCZ', '308', '406', '407', '508', '607', '807', '1007', '2008', '3008', '5008'],
    'Porsche': ['Boxster', 'Cayenne', 'Cayman', 'Macan', 'Panamera', '356', '911', '924', '944'],
    'Proton': ['Persona'],
    'Renault': ['Captur', 'Clio', 'Espace', 'Fluence', 'Grand Espace', 'Grand Modus', 'Grand Scenic', 'KADJAR', 'Kangoo', 'Koleos', 'Laguna', 'Master', 'Megane', 'Modus', 'Safrane', 'Scenic', 'Trafic', 'Twingo', 'Vel Satis', 'Zoe', '5', '19'],
    'Rover': ['45', '75', '100'],
    'Saab': ['93', '95', '900', '9000'],
    'Seat': ['Alhambra', 'Altea', 'Arosa', 'Ateca', 'Cordoba', 'Cupra', 'Exeo', 'Ibiza', 'Inca', 'Leon', 'Mii', 'Toledo'],
    'Skoda': ['Citigo', 'Fabia', 'Karoq', 'Kodiaq', 'Octavia', 'Rapid', 'Roomster', 'Superb', 'Yeti'],
    'Smart Car': ['City-Coupe', 'ForFour', 'ForTwo', 'Roadster'],
    'Ssangyong': ['Actyon', 'Korando', 'Kyron', 'Rexton', 'Rodius', 'Tivoli'],
    'Subaru': ['BRZ', 'Forester', 'Impreza', 'Justy', 'Legacy', 'Outback', 'Xv'],
    'Suzuki': ['Alto', 'Baleno', 'Cappuccino', 'Celerio', 'Grand Vitara', 'Ignis', 'Jimny', 'Liana', 'SJ', 'Splash', 'Swift', 'SX4', 'SX4 S-Cross', 'Vitara', 'Vitara GL+', 'Vitara GLX', 'Wagon R', 'Other'],
    'Tesla': ['Mdeol S', 'Other'],
    'Toyota': ['Altezza', 'Auris', 'Avensis', 'Avensis Verso', 'AYGO', 'Camry', 'Carina', 'Celica', 'Chaser', 'Corolla', 'Corolla Verso', 'Dyna', 'Estima', 'Glanza', 'GT86', 'HiAce', 'HiLux', 'iQ', 'Landcruiser', 'Levin', 'MR2', 'Paseo', 'Previa', 'Prius', 'Proace', 'Rav4', 'Sprinter', 'Starlet', 'Urban Cruiser', 'Verso', 'Verso-S', 'Vitz', 'Wish', 'Yaris', 'Yaris Verso', 'Other'],
    'Vauxhall': ['Agila', 'Astra', 'Astravan', 'Combo', 'Corsa', 'Insignia', 'Meriva', 'Movano', 'Tigra', 'Vectra', 'Vivaro', 'Zafira', 'Other'],
    'Volkswagen': ['Amarok', 'Beetle', 'Bora', 'Caddy', 'Caddy Life', 'Caddy Maxi', 'Caddy Maxi Life', 'California', 'Caravelle', 'CC', 'Corrado', 'Crafter', 'Eos', 'Fox', 'Golf', 'Golf Plus', 'Golf SV', 'Jetta', 'LT', 'Lupo', 'New Beetle', 'Passat', 'Passat CC', 'Polo', 'Scirocco', 'Sharan', 'Shuttle', 'Tiguan', 'Touareg', 'Touran', 'Transporter', 'Up!', 'Other'],
    'Volvo': ['C30', 'C70', 'S40', 'S60', 'S80', 'S90', 'V40', 'V50', 'V60', 'V70', 'V90', 'XC60', 'XC70', 'XC90', '850', '940', 'Other']
}


const year = []
const engine = []
const bodyType = ['Cabriolet', 'Camper', 'Commercial', 'Convertible' ,'Coupe', 'Estate', 'Hatchback', 'MPV', 'Saloon', 'SUV', 'Other']
const futureYears = []
const colors = ['Beige', 'Black', 'Blue', 'Brown', 'Gold', 'Green', 'Grey', 'Navy', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Turquoise', 'White', 'Yellow', 'Other']

const fillFormSelect = function(id, array, placeholder){
    const select = document.getElementById(id)
    select.innerHTML = ''

    const option = document.createElement('option')
    option.value = ""
    option.innerHTML = placeholder
    option.selected = 'selected'
    option.disabled = 'disabled'



    select.appendChild(option)

    for (const make of array){
        const option = document.createElement('option')
        option.value = make
        option.innerHTML = make
        select.appendChild(option)
    }
}

let predictFuturePrice = false


const init = function(){
    for (let i = 2018; i > 1990; i--) year.push(i)
    for (let i = 0.6; i < 5.5; i+= 0.1) engine.push(i.toFixed(1))
    for (let i = 2019; i < 2030; i++) futureYears.push(i)
    fillFormSelect('make', Object.keys(carMake), 'Make')
    fillFormSelect('year', year, 'Year')
    fillFormSelect('transmission', ['Automatic', 'Manual'], 'Transmission')
    fillFormSelect('engine', engine, 'Engine')
    fillFormSelect('fuel', ['Petrol', 'Disel'], 'Fuel Type')
    fillFormSelect('body', bodyType, 'Body Type')
    fillFormSelect('color', colors, 'Color')
    fillFormSelect('doors', ['2', '3', '4', '5', '6', '7', '8'], 'Doors')
    fillFormSelect('sellYear', futureYears, 'Year of sale')
}

init()

const getRegistrationNumberInfo = function(){
    var xhr = new XMLHttpRequest();
    const reg = document.getElementById('regNumber').value
    xhr.open("GET", "https://caroney.herokuapp.com/regNumberDetails?reg=" + reg, false);
    xhr.send();

    const obj = JSON.parse(xhr.response)
    console.log(obj)
    document.getElementById('make').value = obj.make
    document.getElementById('year').value = (2018 - obj.age)
    document.getElementById('transmission').value = obj.transmission
    document.getElementById('engine').value = obj.engine
    document.getElementById('fuel').value = obj.fuel
    document.getElementById('body').value = obj.body
    document.getElementById('color').value = obj.color
    document.getElementById('doors').value = obj.doors
    fillFormSelect('model', carMake[obj.make], 'Model')
    document.getElementById('model').value = obj.model


}

const predictPrice = function(){
    var xhr = new XMLHttpRequest();
    var url = "https://caroney.herokuapp.com/predictPrice";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var data = JSON.stringify({
        model: document.getElementById('model').value,
        make: document.getElementById('make').value,
        age: (!predictFuturePrice) ? (2018 - document.getElementById('year').value) : (document.getElementById('sellYear').value - document.getElementById('year').value),
        transmission: document.getElementById('transmission').value,
        engine: document.getElementById('engine').value,
        fuel: document.getElementById('fuel').value,
        body: document.getElementById('body').value,
        color: document.getElementById('color').value,
        doors: document.getElementById('doors').value,
        mileage: document.getElementById('mileage').value

});
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.price)
            document.getElementById('predictedPrice').innerText = json.price
        }
    }
}

const updateModels = function() {
    fillFormSelect('model', carMake[document.getElementById('make').value], 'Model')
}

const toggle = function(id){
    document.getElementById('currentPrice').className = 'unclicked'
    document.getElementById('futurePrice').className = 'unclicked'
    document.getElementById(id).className = 'clicked'

    if (id === 'futurePrice'){
        document.getElementById('sellYear').style.display = 'inline-block'
        document.getElementById('mileage').placeholder = 'Estimated mileage on sale'
        document.getElementById('mileage').value = ''
        predictFuturePrice = true

    }else {
        document.getElementById('sellYear').style.display = 'none'
        document.getElementById('mileage').placeholder = 'Current mileage'
        document.getElementById('mileage').value = ''
        predictFuturePrice = false

    }
}

const changeTrafficLight = function(id){
    document.getElementById('red').style.backgroundColor = 'grey'
    document.getElementById('orange').style.backgroundColor = 'grey'
    document.getElementById('green').style.backgroundColor = 'grey'
    document.getElementById(id).style.backgroundColor = id
}

const checkSelectors = function(){
    // const model = document.getElementById('model').value;
    // const make = document.getElementById('make').value;
    // const year = document.getElementById('year').value;
    // const transmission = document.getElementById('transmission').value;
    // const engine = document.getElementById('engine').value;
    // const fuel = document.getElementById('fuel').value;
    // const body = document.getElementById('body').value;
    // const color = document.getElementById('color').value;
    // const doors = document.getElementById('doors').value;
    // const mileage = document.getElementById('mileage').value;
    //
    // if (model !== '' && make !== '' && year !== '' && transmission !== '' && engine !== '' && fuel !== '' && body !== '' && color !== '' && doors && mileage !== '') changeTrafficLight('green')
    // else if (model !== '' && make !== '' && year !== '' && transmission !== '' && engine !== '' && fuel) changeTrafficLight('orange')
    // else changeTrafficLight('red')
}



