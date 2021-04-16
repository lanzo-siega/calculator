var calculator = document.querySelector('.calculator');
var keys = document.getElementsByTagName('button');
var answer = document.querySelector('.answer');
var started = false;
var last = '';
var first = '';
var second = '';
let test = (answer.textContent.match(/[\+×\-÷]/g) || []).length;

for(i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', function() {
      let action = this.dataset.action;
      actioner(action, this);
    })
  };

function actioner (act,key) {
    if (
        act === 'add' ||
        act === 'subtract' ||
        act === 'divide' ||
        act === 'multiply'
    ) {if (started === true && (answer.textContent.match(/[\+×\-÷]/g) || []).length < 1) {
        answer.textContent += ` ${key.textContent}`;
    }
    } else if (!act) {
        if (started === false) {
            started = true;
            answer.textContent = key.textContent;
        } else if (started === true) {
            if (Number.isInteger(parseFloat(last)) || answer.textContent.split('').pop().match(/[0-9\.]/g)) {
                answer.textContent += key.textContent;
            } else {
                answer.textContent += ` ${key.textContent}`;
            }
        }
    } else if (act === 'clear') {
        answer.textContent = 0;
        started = false;
        first = '';
        last = '';
    } else if (act === 'delete') {
        if (answer.textContent.length === 1) {
            answer.textContent = 0;
        } else {
            answer.textContent = answer.textContent.slice(0,-1);
        }
    } else if (act === 'decimal') {
        if (answer.textContent == 0) {
            answer.textContent = '0.';
        } else {
            answer.textContent += '.';
        }
    } else if (act === 'calculate') {
        var ops = answer.textContent.split(' ').filter(text => text.match(/[\+×\-÷]/))[0];
        if (ops === '+') {
            answer.textContent = first + second;
        } else if (ops === '-') {
            answer.textContent = first - second;
        } else if (ops === '÷') {
            if (second !== 0) {
                answer.textContent = first / second;
            } else {
                answer.textContent = `${String.fromCodePoint(0x1F914)} Did you divide by zero?`;
                answer.style.fontSize = 'x-large';
            }
        } else if (ops === '×') {
            answer.textContent = first * second;
        }
    }

    var ans = answer.textContent.split(' ').filter(text => text.match(/^((?![\+×\-÷]).)*$/));
    first = parseInt(ans[0]);
    second = parseInt(ans[1]);

    last = key.textContent;
}