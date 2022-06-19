//   *  1. Выбрать поле для игры
//   *  2. Заполнить игровое поле карточками
//   *  3. Сделать клик по карточками
//   *  4. Сделать переворачивание карточек
//   *     4.1 Размещаем картинки под каждой карточкой
//   *     4.2 Показываем картинки
//   *  5. Если выбрано 2 картинки, проверяем на совпадение
//   *      5.1 Если картинки совпадают, то удаляем карточки 
//   *      5.2 Иначе переворачиваем выбранные карточки
//   *  6. Если все карточки удалены, вывести победное окно
//   *  7. При клике на кнопку обновляем страницу



// Создаем переменные (коробки)
var cardsFild = document.querySelector("#cards");
var resetBlock = document.querySelector("#reset");
var resetBtn = document.querySelector("#reset-btn");
var countCards = 16;
var deletedCards = 0;
var pause = false;

// Создаем масивы
var images = [
    1,2,3,4,
    5,6,7,8,
    1,2,3,4,
    5,6,7,8
]; 
var selected = [];

// Перемешивание картинок
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(images);

// Цикл (Повторение одного действия несколько раз)
for(var i = 0; i < countCards; i = i + 1) {
    var li = document.createElement("li");
        li.id = i;
    cardsFild.appendChild(li);
}

// Нажимаем на карточку
cardsFild.onclick = function(event) {
    if(pause == false) {
        var element = event.target;
        // Если условия выполняются то открывается картинка
        if(element.tagName == "LI" && element.className != "active") {
            selected.push(element);
            element.className = "active";
            var img = images[element.id];
            element.style.backgroundImage = "url(images/" + img + ".png";
            // Что бы не открывалось больше 2х картинок
            if(selected.length == 2) {
                pause = true;
                // Если картинки одинаковы - карточки удаляются
                if( images[selected[0].id] == images[selected[1].id] ) {
                    selected[0].style.visibility = "hidden";
                    selected[1].style.visibility = "hidden";
                    deletedCards = deletedCards + 2;
                }
                // Иначе переворачиваюся обратно
                setTimeout(refreshCards, 600);      
            }
        }
    }
    
}

// Функцис обновления (переворачивания) карточек
function refreshCards() {
    for(var i = 0; i < countCards; i = i + 1) {
        cardsFild.children[i].className = "";
        cardsFild.children[i].style.backgroundImage = 'url("images/back.png")';
    }
    // Если все карточки удалены открывается "Поздравительное окно"
    if(deletedCards == countCards) {
        resetBlock.style.display = "block";
    }
    selected = [];
    pause = false;
}

// При нажатии на кнопку окно перезагружается
resetBtn.onclick = function() {
    location.reload();
}