'use strict';

const title = document.getElementsByClassName('h1')[0],
    mainControlsViews = document.querySelector('.main-controls__views'),
    startBtn = document.getElementsByClassName('handler_btn')[0],
    resetBtn = document.getElementsByClassName('handler_btn')[1],
    buttonPlus = document.querySelector('.screen-btn'),
    percentItems = document.querySelectorAll('.other-items.percent'),
    numberItems = document.querySelectorAll('.other-items.number'),
    inputRange = document.querySelector('input[type=range]');


const total = document.getElementsByClassName('total-input')[0],
    totalCountInput = document.getElementsByClassName('total-input')[1],
    totalCountOtherInput = document.getElementsByClassName('total-input')[2],
    totalFullCountInput = document.getElementsByClassName('total-input')[3],
    totalCountRollbackInput = document.getElementsByClassName('total-input')[4],
    cmsItem = document.querySelector('#cms-open'),
    cmsSelect = document.querySelector('.hidden-cms-variants'),
    cmsSelectItems = cmsSelect.querySelector('#cms-select'),
    cmsInputItems = cmsSelect.querySelector('.main-controls__input');

let screens = document.querySelectorAll('.screen');
let inputRangeValue = document.querySelector('.rollback').querySelector('.range-value');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    isEmpty: false,
    cms: 1,
    init: function () {
        buttonPlus.addEventListener('click', addScreenBlock);
        inputRange.addEventListener('input', getRollback);
        startBtn.addEventListener('click', startRes);
    }
}

function startRes() {
    screens = document.querySelectorAll('.screen');
    let screensInps = document.querySelectorAll('.screen input');
    let screensSelects = document.querySelectorAll('.screen select');
    let trueScreensInp = 0;
    let trueScreensSelect = 0;

    //Проверка select на пустое значение
    screensSelects.forEach(el => {
        if(el.value == "") {
            return;
        } else {
            trueScreensSelect += 1;
        }
    })
    //Проверка input на пустое значение
    screens.forEach(el => {
        if(el.querySelector('input').value == ""){
            return;
        } else {
            trueScreensInp += 1;
        }
    }) 
    // Если количество не пустых input будет равно кол-ву input
    // И если количество не пустых select будет равно кол-ву select
    if(trueScreensInp == screensInps.length && trueScreensSelect == screensSelects.length) {
        // Расчет результатов
        pricePercentRes();
        priceNumRes();
        getScreens();
        getRes();
    }
    
}

function getRes() {
    total.value = appData.screenPrice;
    totalCountInput.value = appData.screens;
    totalCountOtherInput.value = (total.value * appData.servicePricesPercent / 100 + appData.servicePricesNumber).toFixed(0);
    totalFullCountInput.value = Number(total.value) + Number(totalCountOtherInput.value);
    totalCountRollbackInput.value = totalFullCountInput.value - (totalFullCountInput.value * appData.rollback / 100);
}

function addScreenBlock() {
    screens.forEach(item => {
        let formScreen = item.cloneNode(true);
        mainControlsViews.insertBefore(formScreen, buttonPlus);
        formScreen.querySelector('.main-controls__input').querySelector('input').value = '';

        //     let closeControls = document.createElement('button');
        //     closeControls.classList.add('close-btn');
        //     closeControls.innerHTML = '-';
        //     formScreen.querySelector('.main-controls__input').querySelector('input').appendChild(closeControls);
        // })
        // // При клике удаляет форму
        // closeControls.addEventListener('click', ()=> {
        //     formScreen.remove();
    })




}

function getRollback() {
    // Онлайн значение input range
    inputRangeValue.innerHTML = `${inputRange.value}%`;
    appData.rollback = inputRange.value;
}

function pricePercentRes() {
    percentItems.forEach(num => {
        const checkbox = num.querySelector('input[type=checkbox]');
        const price = num.querySelector('input[type=text]');
        if (checkbox.checked) {
            appData.servicePricesPercent += Number(price.value);
        }
    })
}

function priceNumRes() {
    numberItems.forEach(num => {
        const checkbox = num.querySelector('input[type=checkbox]');
        const price = num.querySelector('input[type=text]');
        if (checkbox.checked) {
            appData.servicePricesNumber += Number(price.value);
        }
    })
}

function getScreens() {
    screens.forEach(num => {
        let contScreen = num.querySelector('.main-controls__input').querySelector('input').value;
        let contScreenSelect = num.querySelector('.main-controls__select').querySelector('select').value;
        appData.screens += contScreen;
        appData.screenPrice += contScreen * contScreenSelect;
    })
}

appData.init();