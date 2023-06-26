const CALCULATOR_CONTAINER = document.getElementById('main-content');
const TABLE = document.querySelector('table');
const BTN_ADD_PRODUCT = document.getElementById('btn-add-product');
const BTN_OPEN_CALCULATOR = document.getElementById('open-calculator-btn');
let i = 2;
let activeProductIndex = -1;
let activeRow = -1;
let tableClasses = ['product-input', 'weight-input', 'proteins-output', 
                    'fats-output', 'carbohydratess-output', 'kilocalories-output'];

// значения белка, жира, углеводов и килокалорий для 100 граммов
let potato = new Map();
potato.set('название', 'картофель');
potato.set('бел', 2.00);
potato.set('жир', 0.40);
potato.set('угл', 16.10);
potato.set('килокал', 76.00);

let cabbage = new Map();
cabbage.set('название', 'капуста цветная');
cabbage.set('бел', 2.50);
cabbage.set('жир', 0.30);
cabbage.set('угл', 5.40);
cabbage.set('килокал', 30.00);

let carrot = new Map();
carrot.set('название', 'морковь');
carrot.set('бел', 1.30);
carrot.set('жир', 0.10);
carrot.set('угл', 6.90);
carrot.set('килокал', 32.00);

let chicken = new Map();
chicken.set('название', 'курица');
chicken.set('бел', 16.00);
chicken.set('жир', 14.00);
chicken.set('угл', 0.00);
chicken.set('килокал', 190.00);

let cucumber = new Map();
cucumber.set('название', 'огурец');
cucumber.set('бел', 0.80);
cucumber.set('жир', 0.10);
cucumber.set('угл', 2.80);
cucumber.set('килокал', 15.00);

let tomato = new Map();
tomato.set('название', 'помидор');
tomato.set('бел', 1.10);
tomato.set('жир', 0.20);
tomato.set('угл', 3.70);
tomato.set('килокал', 20.00);

let wheatBread = new Map();
wheatBread.set('название', 'хлеб пшеничный');
wheatBread.set('бел', 8.10);
wheatBread.set('жир', 1.00);
wheatBread.set('угл', 48.80);
wheatBread.set('килокал', 242.00);

let meatPancakes = new Map();
meatPancakes.set('название', 'блинчики с мясом');
meatPancakes.set('бел', 8.70);
meatPancakes.set('жир', 11.20);
meatPancakes.set('угл', 14.70);
meatPancakes.set('килокал', 194.00);

let wheatFlour = new Map();
wheatFlour.set('название', 'мука пшеничная');
wheatFlour.set('бел', 9.20);
wheatFlour.set('жир', 1.20);
wheatFlour.set('угл', 74.90);
wheatFlour.set('килокал', 342.00);

let doctorSausage = new Map();
doctorSausage.set('название', 'колбаса вареная докторская');
doctorSausage.set('бел', 12.80);
doctorSausage.set('жир', 22.20);
doctorSausage.set('угл', 1.50);
doctorSausage.set('килокал', 257.00);

let products = [potato, cabbage, carrot, chicken, cucumber, tomato, wheatBread, meatPancakes, wheatFlour, doctorSausage];




BTN_ADD_PRODUCT.addEventListener('click', function AddRow(){
    let newRow = TABLE.insertRow(index = i);
    
    // Создание клетки с номером
    let j = 0;
    let newCell = newRow.insertCell(j);
    let newElement = document.createTextNode(i);
    newCell.setAttribute('class', 'number');
    newCell.appendChild(newElement);
    
    // Создание клетки с продуктом
    j++;
    newCell = newRow.insertCell(j);
    newElement = document.createElement("input");
    newElement.setAttribute('type', 'text');
    newElement.setAttribute('size', '40px');
    
    // добавляет к концу id номер ряда
    // в клетках есть клетка с номером, а в классах класса номера нет,
    // поэтому нужно при обращении к классам отнять 1
    newElement.setAttribute('id', tableClasses[j - 1] + i); 
    newElement.setAttribute('list', 'products');
    newElement.setAttribute('onkeyup', 'Calculate(' + i + ');');
    newCell.appendChild(newElement);
    console.log(newElement.id); //

    // Создание клетки с весом
    j++;
    newCell = newRow.insertCell(j)
    newElement = document.createElement("input");
    newElement.setAttribute('type', 'text');
    newElement.setAttribute('size', '4px');
    newElement.setAttribute('id', tableClasses[j - 1] + i);
    newElement.setAttribute('class', 'weight-input');
    newElement.setAttribute('onkeyup', 'Calculate(' + i + ');');
    newCell.appendChild(newElement);

    // Создание клеток белка, жира, углеводов и килокалорий
    for (j = 3; j < 7; j++){
        newCell = newRow.insertCell(j)
        newElement = document.createTextNode('0.00');
        newCell.setAttribute('id', tableClasses[j - 1] + i); 
        newCell.appendChild(newElement);                     
    }
    i++;
});

function Calculate(tableRow){
    inputProduct = document.getElementById('product-input' + tableRow).value;
    inputWeight = document.getElementById('weight-input' + tableRow).value;
    j = 2;
    proteinsCell = document.getElementById(tableClasses[j] + tableRow);
    j++;
    fatsCell = document.getElementById(tableClasses[j] + tableRow);
    j++;
    carbohydratesCell = document.getElementById(tableClasses[j] + tableRow);
    j++;
    kilocaloriesCell = document.getElementById(tableClasses[j] + tableRow);

    for (let k = 0; k < products.length; k++){
        if (products[k].get('название') == inputProduct.toLowerCase() && inputWeight > 0){
            activeProductIndex = k;
            activeRow = tableRow;
            break;
        }
    };

    if (activeProductIndex >= 0 && inputWeight > 0 && activeRow == tableRow){
        proteinsCell.innerHTML = (products[activeProductIndex].get('бел')/100 * inputWeight).toFixed(2);
        fatsCell.innerHTML = (products[activeProductIndex].get('жир')/100 * inputWeight).toFixed(2);
        carbohydratesCell.innerHTML = (products[activeProductIndex].get('угл')/100 * inputWeight).toFixed(2);
        kilocaloriesCell.innerHTML = (products[activeProductIndex].get('килокал')/100 * inputWeight).toFixed(2);
    }
    else{
        proteinsCell.innerHTML = '0.00';
        fatsCell.innerHTML = '0.00';
        carbohydratesCell.innerHTML = '0.00';
        kilocaloriesCell.innerHTML = '0.00';
    }
    CalculateTotal();
};

function CalculateTotal(){
    let totalWeight = 0;
    let totalProteins = 0;
    let totalFats = 0;
    let totalCarbohydrates = 0;
    let totalKilocalories = 0;
    let k = 0;
    let weightRatio = 1;
    // i всегда указывает на номер строки, которая будет создана, поэтому
    // k < i означает, что цикл всегда будет идти до последней строки с данными
    for (k = 1; k < i; k++){
        inputWeight = document.getElementById('weight-input' + k).value;

        if (inputWeight && inputWeight >= 0){
            // выбор клеток с протеином, жирами, углеводами и килокалориями
            j = 2;
            proteinsCell = document.getElementById(tableClasses[j] + k);
            j++;
            fatsCell = document.getElementById(tableClasses[j] + k);
            j++;
            carbohydratesCell = document.getElementById(tableClasses[j] + k);
            j++;
            kilocaloriesCell = document.getElementById(tableClasses[j] + k);

            totalWeight = totalWeight + Number(inputWeight);
            totalProteins = totalProteins + Number(proteinsCell.innerHTML);
            totalFats = totalFats + Number(fatsCell.innerHTML);
            totalCarbohydrates = totalCarbohydrates + Number(carbohydratesCell.innerHTML);
            totalKilocalories = totalKilocalories + Number(kilocaloriesCell.innerHTML);
        }
    }
    // Заполнение строки "Итого"
    document.getElementById('total-weight-cell').innerHTML = totalWeight.toFixed(2);
    document.getElementById('total-proteins-cell').innerHTML = totalProteins.toFixed(2);
    document.getElementById('total-fats-cell').innerHTML = totalFats.toFixed(2);
    document.getElementById('total-carbohydrates-cell').innerHTML = totalCarbohydrates.toFixed(2);
    document.getElementById('total-kilocalories-cell').innerHTML = totalKilocalories.toFixed(2);

    // Если весь ввод веса неверный или отсутствует, то условие предотвращает деление на 0
    if (totalWeight > 0){
        weightRatio = totalWeight/100;
    }

    // Заполнение строки "Итого на 100 грамм"
        document.getElementById('total-100grams-proteins-cell').innerHTML = (totalProteins/weightRatio).toFixed(2);
        document.getElementById('total-100grams-fats-cell').innerHTML = (totalFats/weightRatio).toFixed(2);
        document.getElementById('total-100grams-carbohydrates-cell').innerHTML = (totalCarbohydrates/weightRatio).toFixed(2);
        document.getElementById('total-100grams-kilocalories-cell').innerHTML = (totalKilocalories/weightRatio).toFixed(2);
}

BTN_OPEN_CALCULATOR.addEventListener('click', () => CALCULATOR_CONTAINER.classList.toggle('hidden'));
