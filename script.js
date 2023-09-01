// Элементы
const rateInput = document.querySelector(".rate__input");
const rateNum = document.querySelectorAll(".rate__num");
const rateBtn = document.querySelector("#rate-btn");
const rateStatusText = document.querySelector(".rate__status-text");
const cashNum = document.querySelector(".cash__num");

// Заблокирована ли панель со ставками
let isBlockRateInput = false;

// Максимальная ставка
const maxNum = 10000;

function gameInit() {
    let rateNumMass = ["50", "100", "500", "1 000", "5 000", "10 000"];
    rateNum.forEach((item, i) => {
        item.textContent = rateNumMass[i];
    });
}

gameInit();

// Запретить менять ставку в инпуте, если панель заблокирована
rateInput.addEventListener("keydown", function(e) {
    if(isBlockRateInput) {
        e.preventDefault();
    }
})

// Разрешить вводить в инпуте только цифры до максимальной ставки
rateInput.addEventListener("input", function(e) {
    let inputVal = this.value.split("");
    for(let i = 0; i < inputVal.length; i++) {
        if(isNaN(+inputVal[i])) {
            inputVal[i] = "";
        }
        if(inputVal[i] === " ") inputVal[i] = "";
        this.value = inputVal.join("")
        if(inputVal.length > 1 && inputVal[0] === "0") inputVal[0] = ""
    }
    if(+this.value > maxNum) this.value = maxNum;
});

// Добавлять ставку при нажатии на кнопку с цифрой
function rateNumFunc() {
    if(isBlockRateInput) return;
    let numValue = +this.textContent.split(" ").join("");
    let inputVal = +rateInput.value;
    rateInput.value = inputVal + numValue;
    if(rateInput.value > maxNum) rateInput.value = maxNum;
}

rateNum.forEach(function(item, i) {
    item.addEventListener("click", rateNumFunc);
});

// При нажатии на кнопку менять ее статус и блокировать панель со ставкой
rateBtn.addEventListener("click", function(e) {
    if(!isBlockRateInput) {
        if(+rateInput.value < 50) {
            rateStatusText.classList.add("error");
            rateStatusText.textContent = "Ставка может быть от 50 до 10 000";
            return;
        }
        if(+cashNum.textContent < +rateInput.value) {
            rateStatusText.classList.add("error");
            rateStatusText.textContent = "Недостаточно средств";
            return;
        }
        rateStatusText.classList.remove("error");
        rateStatusText.classList.add("sucess");
        rateStatusText.textContent = "Ставка сделана";
        isBlockRateInput = true;
        rateInput.disabled = true;
        this.textContent = "Изменить"
        this.classList.add("stop")
    }
    else {
        rateStatusText.classList.remove("error", "sucess");
        rateStatusText.textContent = "";
        isBlockRateInput = false;
        rateInput.disabled = false;
        this.textContent = "ОК";
        this.classList.remove("stop");
    }
});