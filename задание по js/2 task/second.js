"use strict";


// 2
var form = document.createElement('form'),
    inputCols = document.createElement('input'),
    inputRows = document.createElement('input'),
    labelCols = document.createElement('label'),
    labelRows = document.createElement('label'),
    button = document.createElement('button')
    ;


inputCols.type = 'text';
inputCols.id = 'cols';
inputCols.style.display = 'block';

labelCols.innerText = 'Количество столбцов';
labelCols.htmlFor = 'cols';
labelCols.style.display = 'block';

form.appendChild(labelCols);
form.appendChild(inputCols);

inputRows.type = 'text';
inputRows.id = 'rows';
inputRows.style.display = 'block';

labelRows.innerText = 'Количество строк';
labelRows.htmlFor = 'rows';
labelRows.style.display = 'block';

form.appendChild(labelRows);
form.appendChild(inputRows);

button.type = 'button';
button.innerText = 'тест';
button.style.marginTop = '5px';


// По нажатию на кнопку создается таблица (страница не перезагружается). Форму создания таблицы спрятать
button.onclick = () => {
    form.style.display = 'none';
    createTable(
        document.getElementById('cols').value,
        document.getElementById('rows').value,
    );
    createFunctionPanel();
};

form.appendChild(button);
document.body.appendChild(form);

function createTable(cols, rows) {
    let table = document.createElement('table');
    table.style.borderCollapse = 'collapse';

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = createTableCell();
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function createTableCell() {
    let td = document.createElement('td');
    td.style.minWidth = '100px';
    td.style.height = '30px';
    td.style.border = '1px solid black';
    td.onmousemove = () => td.style.backgroundColor = '#cecece';
    td.onmouseout = () => td.style.backgroundColor = 'white';
    td.appendChild(createTableCellContent(td));
    return td;
}

// 3
function createTableCellContent(td) {
    let form = document.createElement('form'),
        textarea = document.createElement('textarea'),
        button = document.createElement('button')
    ;
    button.innerText = 'Сохранить';
    button.type = 'button';
    button.style.display = 'block';
    textarea.cols = 20;
    textarea.rows = 1;
    // После нажатия на «сохранить», эта форма пропадает, а вместо нее появляется введенный пользователем текст.
    button.onclick = () => {
        td.innerText = button.previousSibling.value;
        form.remove();
    };

    form.appendChild(textarea);
    form.appendChild(button);
    return form;
}

// 4. Оформление блока с функцией
function createFunctionPanel() {
    let divWrapper = document.createElement('div')
    ;
    divWrapper.className = 'function_container';
    divWrapper.appendChild(borderChanger());
    document.body.appendChild(divWrapper);
}

function createFunction(functionName) {
    let div = document.createElement('div'),
        p = document.createElement('p')
    ;
    p.innerText = functionName;
    div.className = 'function';
    div.appendChild(p);
    return div;
}

// 5. добавить элемент “Изменить границы таблицы”
function borderChanger() {
    let div = createFunction('Изменить границы таблицы');

    let form = document.createElement('form'),
        select = document.createElement('select'),
        inputBorderWidth = document.createElement('input'),
        button = document.createElement('button'),
        option = document.createElement('option')
    ;

    inputBorderWidth.type = 'text';
    inputBorderWidth.style.width = '140px';

    button.type = 'button';
    button.style.display = 'block';
    button.style.maxWidth = '144px';
    button.innerText = 'Применить';

    select.style.width = '144px';

    option.innerText = 'Выберите стиль рамки';
    select.appendChild(option);

    getBorderOptions().forEach((option) =>
        select.appendChild(option)
    );

    inputBorderWidth.onchange = () => {
        button.innerText = 'Применить' + ' ' + inputBorderWidth.value + ' px ';
        if (select.value !== '') {
            button.innerText += ' и рамка ' + select.value;
        }
    };

    select.onchange = () => {
        if (inputBorderWidth.value !== '') {
            button.innerText = button.innerText = 'Применить' + ' ' + inputBorderWidth.value + ' px ' +
                'и рамка ' + select.value;
        } else {
            button.innerText = 'Применить' + ' ' + 'рамка ' + select.value;
        }
    };

    button.onclick = () => {
        let tdList = document.querySelectorAll('td');
        tdList.forEach((td) =>
            td.style.border = `${inputBorderWidth.value}px ${select.value}`
        );
    };

    form.appendChild(select);
    form.appendChild(inputBorderWidth);
    form.appendChild(button);
    div.appendChild(form);
    return div;
}

function getBorderOptions() {
    let borderOptions = [];
    ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].forEach(
        (borderStyle) => {
            let option = document.createElement('option');
            option.innerText = borderStyle;
            borderOptions.push(option);
        }
    );
    return borderOptions;
}







