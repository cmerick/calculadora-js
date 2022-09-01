onload = () => {
    document.querySelector('#bt-7').onclick = () => digito(7);
    document.querySelector('#bt-8').onclick = () => digito(8);
    document.querySelector('#bt-9').onclick = () => digito(9);
    document.querySelector('#bt-4').onclick = () => digito(4);
    document.querySelector('#bt-5').onclick = () => digito(5);
    document.querySelector('#bt-6').onclick = () => digito(6);
    document.querySelector('#bt-1').onclick = () => digito(1);
    document.querySelector('#bt-2').onclick = () => digito(2);
    document.querySelector('#bt-3').onclick = () => digito(3);
    document.querySelector('#bt-0').onclick = () => digito(0);
    document.querySelector('#bt-bar').onclick = () => operators("/");
    document.querySelector('#bt-times').onclick = () => operators("*");
    document.querySelector('#bt-minus').onclick = () => operators("-");
    document.querySelector('#bt-plus').onclick = () => operators("+");
    document.querySelector('#bt-equal').onclick = () => calculate();
    document.querySelector('#bt-delete').onclick = () => displayDelete();
    document.querySelector('#bt-comma').onclick = () => comma();
    document.querySelector('#bt-erase').onclick = () => erase();

}


//variaveis de armazenamento
let sValue = '0'; //valor apresentado no display
let newNumber = true; //indica se a calculadora esta zerada
let beforeValue = '0'; //corresponde ao resultado acumulado da operação anterior
let operatorSelected = null; //ira receber operador matemática em espera

//atualização de visor
const updateDisplay = () => {
    
    let [portion1, portion2] = sValue.split(',');
    let c = 0;
    let screenValue = '';
    if(portion1.length > 13) {
        document.querySelector('#display').innerText = "Err";
        sValue = '0' ;
        newNumber = true;
        return;
    }
    for (let i = portion1.length - 1; i >= 0; i--) {
        if (++c > 3) {
            screenValue = '.' + screenValue;
            c = 1;
        }
        screenValue = portion1[i] + screenValue;
    }
    screenValue = screenValue + (portion2 ? ',' + portion2.substr(0, 10 -screenValue.length) : '');

    document.querySelector('#display').innerText = screenValue;
}

//tratamento do clique nos digitos
const digito = (n) => {
    
        if (newNumber) {
            sValue = '' + n;
            newNumber = false;

            
    
        }
        else {
            sValue += n;

            
        }
        updateDisplay();

    
    

}

//tratamento do clique no botão decimal

const comma = () => {
    if (newNumber) {
        sValue = '0,';
        newNumber = false;
    }
    else if (sValue.indexOf(',') == -1) {
        sValue += ',';
    }
    updateDisplay();
}

//tratamento dos operadores
//converte string para numero real
const actualValue = () => parseFloat(sValue.replace(',', '.'));

//tratamento do clique nos botões de operação
const operators = (op) => {
    calculate();
    beforeValue = actualValue();
    operatorSelected = op;
    newNumber = true;

}

//calcula
const calculate = () => {
    if (operatorSelected != null) {
        let result;
        switch (operatorSelected) {
            case '+': result = beforeValue + actualValue(); break;
            case '-': result = beforeValue - actualValue(); break;
            case '*': result = beforeValue * actualValue(); break;
            case '/': result = beforeValue / actualValue(); break;
        }
        sValue = result.toString().replace('.', ',');
    }
    newNumber = true
    operatorSelected = null;
    beforeValue = 0;
    updateDisplay();
}

//tratamento apagar display

const displayDelete = () => {
    sValue = "0";
    newNumber = true;
    operatorSelected = null;
    beforeValue = 0;
    updateDisplay();
}

//tratamento de apagar o ultimo digito
const erase = () => {
    if (sValue.length > 1) {
        sValue = sValue.slice(0, sValue.length - 1);
        updateDisplay();
    }
    else {
        sValue = "0";
        newNumber = true;
        updateDisplay();
    }
}

//tratamento resultado
