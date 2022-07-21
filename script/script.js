const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [
        [200, '16/04/2021 20:15'],
        [450, '16/04/2021 20:15'],
        [-400, '16/04/2021 20:15'],
        [3000, '16/04/2021 20:15'],
        [-650, '16/04/2021 20:15'],
        [-130, '16/04/2021 20:15'],
        [70, '16/04/2021 20:15'],
        [1300, '16/04/2021 20:15']
    ],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [
        [5000, '16/04/2021 20:15'],
        [3400, '16/04/2021 20:15'],
        [-150, '16/04/2021 20:15'],
        [-790, '16/04/2021 20:15'],
        [-3210, '16/04/2021 20:15'],
        [-1000, '16/04/2021 20:15'],
        [8500, '16/04/2021 20:15'],
        [-30, '16/04/2021 20:15']
    ],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [
        [200, '16/04/2021 20:15'],
        [-200, '16/04/2021 20:15'],
        [340, '16/04/2021 20:15'],
        [-300, '16/04/2021 20:15'],
        [-20, '16/04/2021 20:15'],
        [50, '16/04/2021 20:15'],
        [400, '16/04/2021 20:15'],
        [-460, '16/04/2021 20:15']
    ],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [
        [430, '16/04/2021 20:15'],
        [1000, '16/04/2021 20:15'],
        [700, '16/04/2021 20:15'],
        [50, '16/04/2021 20:15'],
        [90, '16/04/2021 20:15'],
    ],
    interestRate: 1,
    pin: 4444,
};

const account5 = {
    owner: "Okba Allaoua",
    movements: [
        [1000, '16/04/2021 20:15'],
        [1000, '16/04/2021 20:15'],
        [2400, '16/04/2021 20:15'],
        [5000, '16/04/2021 20:15'],
    ],
    interestRate: 1,
    pin: 5555,
};

let accounts = [account1, account2, account3, account4, account5];

const body = document.querySelector("body");
const title = document.querySelector("title");
const loadingDiv = document.querySelector(".loading-screen");
const inputUser = document.querySelector(".form-input-user");
const inputPIN = document.querySelector(".form-input-pin");
const closeInputUser = document.querySelector("#confirm-user");
const closeInputPIN = document.querySelector("#confirm-pin");
const loginBtn = document.querySelector(".submit-input");
const rights = document.querySelector(".rights");
const mainForm = document.querySelector(".main-form");
const introP = document.querySelector(".intro-p");
const introSpan = document.querySelector(".welcome-span");
const movementsCard = document.querySelector(".movements");
const totalValue = document.querySelector(".total-value");
const In = document.querySelector(".in");
const Out = document.querySelector(".out");
const Interst = document.querySelector(".interest");
const sort = document.querySelector(".sort");
const closeBtn = document.querySelector(".close-btn");
const requestBtn = document.querySelector(".request-btn");
const transferBtn = document.querySelector(".transfer-btn");
const amount1Input = document.querySelector("#amount1");
const amount2Input = document.querySelector("#amount2");
const timer = document.querySelector(".timer");
const greeting = document.querySelector(".greeting");
const logo = document.querySelector(".logo");
const closeIntroBtn = document.querySelector(".close-intro-btn");
const introStartDiv = document.querySelector(".introStart");
const transferInput = document.querySelector("#transfer-to");
const main = document.querySelector("main");
const nav = document.querySelector("nav");

let inputsTable = [transferInput, amount1Input, amount2Input, closeInputUser, closeInputPIN, inputUser, inputPIN]

if (window.localStorage.getItem("myTab")) {
    accounts = JSON.parse(window.localStorage.getItem("myTab"));
} else {
    window.localStorage.setItem("myTab", JSON.stringify(accounts));
}

main.style.display = "none";
nav.style.display = "none";
body.style.overflow = "hidden";
inputUser.focus();

function shortName(fullName) {
    return fullName.toLowerCase().split(" ").map(elem => elem[0]).join("");
}
accounts.forEach(acc => {
    acc.shortName = shortName(acc.owner);
})


function checkDigit(val) {
    const length = val.length - val.indexOf('.');
    return ((val.includes('.')) && (length == 1 || length == 2 || length == 3) || (val.indexOf(".") == -1))
}

function concateZero(val) {
    return (val < 10) ? `0${val}` : val;
}

closeIntroBtn.addEventListener("click", function () {
    introStartDiv.style.display = "none";
})

window.addEventListener("load", function () {
    body.style.overflow = "visible";
    loadingDiv.style.display = "none";
    nav.style.display = "flex";
})

window.addEventListener("focus", function () {
    title.textContent = "Bankist | Home";
})
window.addEventListener("blur", function () {
    title.textContent = "Bankist | Come Back";
})


function refreshSpan(targetSpan) {
    targetSpan.textContent = `${concateZero(new Date().getDate())}/${concateZero(new Date().getMonth() + 1)}/${concateZero(new Date().getFullYear())}, ${concateZero(new Date().getHours())}:${concateZero(new Date().getMinutes())}`;
}

function removeBorderBlur() { //to clear and blur red border when timing ends
    inputsTable.forEach(input => {
        input.classList.remove("redBorder");
        input.blur();
    })
}

function loadDraws(movementsTab) {
    movementsCard.innerHTML = '';
    let cpt = movementsTab.length;
    const mainDiv = Object.assign(document.createElement("div"), {
            classList: "current"
        }),
        currentParagraph = Object.assign(document.createElement("p"), {
            classList: "current-text",
            textContent: "Current balance"
        }),
        asOfText = Object.assign(document.createElement("p"), {
            classList: "as-of-text"
        }),
        dateSpan = Object.assign(document.createElement("span"), {
            classList: "date-format",
            textContent: `${concateZero(new Date().getDate())}/${concateZero(new Date().getMonth() + 1)}/${concateZero(new Date().getFullYear())}, ${concateZero(new Date().getHours())}:${concateZero(new Date().getMinutes())}`
        }),
        asOfTextContent = document.createTextNode("As of ");
    asOfText.append(asOfTextContent, dateSpan);
    mainDiv.append(currentParagraph, asOfText);
    movementsCard.appendChild(mainDiv);
    setInterval(refreshSpan, 1000, dateSpan);
    movementsTab.forEach(mov => {
        let mainDiv = Object.assign(document.createElement("div"), {
                classList: "move"
            }),
            moveDiv = Object.assign(document.createElement("div"), {
                classList: "move-info"
            }),
            moveP = Object.assign(document.createElement("p"), {
                classList: `move-p ${(mov[0]>=0) ? "deposit" : "withdraw"}`,
                textContent: `${cpt} ${(mov[0]>=0) ? "deposit" : "withdraw"}`
            }),
            dateP = Object.assign(document.createElement("p"), {
                classList: "move-date",
                textContent: mov[1]
            }),
            valueP = Object.assign(document.createElement("p"), {
                classList: "value-moved",
                textContent: `${(mov[0]).toFixed(2)}€`
            })
        moveDiv.append(moveP, dateP);
        mainDiv.append(moveDiv, valueP);
        movementsCard.appendChild(mainDiv);
        cpt--;
    })
}

function updateValues(movementsTab, account) {
    let Incomes = movementsTab.filter(elem => elem[0] >= 0).reduce((acc, cur) => acc += cur[0], 0),
        Outcomes = Math.abs(movementsTab.filter(elem => elem[0] < 0).reduce((acc, cur) => acc += cur[0], 0));
    totalValue.textContent = `TOTAL : ${(movementsTab.reduce((acc, cur) => acc += cur[0], 0)).toFixed(2)}€`;
    In.textContent = `${(Incomes).toFixed(2)}€`;
    Out.textContent = `${(Outcomes).toFixed(2)}€`;
    Interst.textContent = `${((Incomes - Outcomes)-((Incomes - Outcomes)*(account.interestRate/100))).toFixed(2)}€`;
    (Number(Interst.textContent.slice(0, -1)) >= 0) ? Interst.style.color = "#66c873": Interst.style.color = "#f5465d";
}

function initializeValues() {
    inputPIN.value = inputUser.value = closeInputUser.value = closeInputPIN.value = transferInput.value = amount1Input.value = amount2Input.value = '';
}

function greetingTime() {
    let morningTime = [6, 7, 8, 9, 10, 11, 12, 13],
        eveneningTime = [14, 15, 16, 17, 18, 19],
        nightTime = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5];
    switch (true) {
        case (morningTime.includes(new Date().getHours())):
            greeting.textContent = 'Good Morning,';
            break;
        case (eveneningTime.includes(new Date().getHours())):
            greeting.textContent = 'Good Evenening,';
            break;
        case (nightTime.includes(new Date().getHours())):
            greeting.textContent = 'Good Night,';
            break;
    }
}

inputsTable.forEach(input => {
    input.addEventListener("keydown", function () {
        if (input.value.length >= 0) {
            input.classList.remove("redBorder");
        }
    })
});

function checkUser(e) {
    e.preventDefault();
    let m = 10,
        s = 0;
    accounts.forEach(acc => {
        if ((inputUser.value.toLowerCase() == acc.shortName) && (inputPIN.value == acc.pin)) {

            let sortedTable = [...acc.movements].sort((a, b) => {
                if (a[0] < b[0]) return 1;
                if (a[0] > b[0]) return -1;
                return 0;
            });

            const timing = setInterval(timerStart, 1000);

            function timerStart() {
                if (s == 0) {
                    m--;
                    s = 59;
                } else {
                    s--
                }
                if (s < 10) {
                    timer.textContent = `0${m}:0${s}`;
                } else {
                    timer.textContent = `0${m}:${s}`;
                }
                if (s == 0 && m == 0) {
                    main.style.display = "none";
                    introP.style.display = "none";
                    mainForm.style.display = "flex";
                    introStartDiv.style.display = "flex";
                    rights.classList.remove("rightsLogged");
                    removeBorderBlur();
                    clearInterval(timing);
                }
            };
            initializeValues();
            greetingTime();
            logo.classList.add("logo-active");
            introStartDiv.style.display = "none";
            introP.style.display = "flex";
            introSpan.textContent = `${acc.owner.split(" ")[0]}!`;
            main.style.display = "flex";
            rights.classList.add("rightsLogged");
            mainForm.style.display = "none";
            introP.style.display = "flex";
            loadDraws(acc.movements);
            updateValues(acc.movements, acc);
            sort.addEventListener("click", function () {
                if (sort.textContent.includes("↓")) {
                    sort.textContent = "SORT↑";
                    loadDraws(sortedTable);
                } else {
                    sort.textContent = "SORT↓";
                    loadDraws(acc.movements);
                }
            });
            transferBtn.addEventListener("click", function (e) {
                e.preventDefault();
                let transferCounter = 0;
                accounts.forEach(account => {
                    if ((transferInput.value) && (checkDigit(amount1Input.value)) && (transferInput.value.toLowerCase() == account.shortName) && (transferInput.value != acc.shortName) && (amount1Input.value >= 0) && (amount1Input.value <= 250000) && (amount1Input.value <= parseFloat(totalValue.textContent.slice(8, -1)))) {
                        acc.movements.unshift([parseFloat(`-${amount1Input.value}`), `${concateZero(new Date().getDate())}/${concateZero(new Date().getMonth() + 1)}/${concateZero(new Date().getFullYear())}, ${concateZero(new Date().getHours())}:${concateZero(new Date().getMinutes())}`]);
                        loadDraws(acc.movements);
                        updateValues(acc.movements, acc);
                        account.movements.unshift([parseFloat(amount1Input.value), `${concateZero(new Date().getDate())}/${concateZero(new Date().getMonth() + 1)}/${concateZero(new Date().getFullYear())}, ${concateZero(new Date().getHours())}:${concateZero(new Date().getMinutes())}`]);
                        window.localStorage.setItem("myTab", JSON.stringify(accounts));
                        transferInput.blur();
                        amount1Input.blur();
                        sortedTable = [...acc.movements].sort((a, b) => {
                            if (a[0] < b[0]) return 1;
                            if (a[0] > b[0]) return -1;
                            return 0;
                        });
                        transferCounter++;
                    }
                })
                if (transferCounter == 0) {
                    amount1Input.classList.add("redBorder");
                    transferInput.classList.add("redBorder");
                }
                transferInput.value = amount1Input.value = '';
            });

            requestBtn.addEventListener("click", function (e) {
                e.preventDefault();
                if ((amount2Input.value > 0) && (checkDigit(amount2Input.value)) && (amount2Input.value <= 250000) && (amount2Input.value)) {
                    acc.movements.unshift([parseFloat(amount2Input.value), `${concateZero(new Date().getDate())}/${concateZero(new Date().getMonth() + 1)}/${concateZero(new Date().getFullYear())}, ${concateZero(new Date().getHours())}:${concateZero(new Date().getMinutes())}`]);
                    loadDraws(acc.movements);
                    updateValues(acc.movements, acc);
                    sortedTable = [...acc.movements].sort((a, b) => {
                        if (a[0] < b[0]) return 1;
                        if (a[0] > b[0]) return -1;
                        return 0;
                    });
                    amount2Input.blur();
                    window.localStorage.setItem("myTab", JSON.stringify(accounts));
                } else {
                    amount2Input.classList.add("redBorder");
                }
                amount2Input.value = '';
            });


            closeBtn.addEventListener("click", function (e) {
                e.preventDefault();
                if ((closeInputUser.value.toLowerCase() == acc.shortName) && (closeInputPIN.value == acc.pin)) {
                    main.style.display = "none";
                    introP.style.display = "none";
                    mainForm.style.display = "flex";
                    rights.classList.remove("rightsLogged");
                    introStartDiv.style.display = "flex";
                    removeBorderBlur();
                    logo.classList.remove("logo-active");
                    clearInterval(timing);
                } else {
                    closeInputPIN.classList.add("redBorder");
                    closeInputUser.classList.add("redBorder");
                }
                closeInputUser.value = closeInputPIN.value = '';
            })
        } else {
            inputUser.classList.add("redBorder");
            inputPIN.classList.add("redBorder");
        }
    })
    inputPIN.value = inputUser.value = '';
}

loginBtn.addEventListener("click", checkUser);