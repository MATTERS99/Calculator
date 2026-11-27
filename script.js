const y = document.querySelector(".disp")
const ab = document.querySelectorAll(".function div");
const A = Array.from(ab)
A.forEach(item => {
  item.addEventListener("click", () => operation(item))
})
document.addEventListener("keydown", (event) => {
  let k = event.key
  if (k === "Backspace") {
    event.preventDefault()
    k = "DEL"
  }
  if (k === "Escape") k = "AC"
  if (k === "Enter") k = "="
  if (k === "*") k = "×"
  if (k === "/") k = "÷"
  let item = A.find(item => item.textContent === k)
  if (item) operation(item)
})
let s = ""
let B = "";
let error = false;
let R = ".0123456789"
let T = ".×01÷23456789"
let W = "+×-÷"

function calculate(r) {
  let t = op(s)
  s = String(t) + r
  display(s)
}

function showError() {
  error = true
  setTimeout(() => {
    y.textContent = "Error"
  }, 100)
}

function display(i) {
  let V = i.split('')
  if (V.length > 16 && !isNaN(Number(i))) {
    let b = Number(i).toExponential(4)
    y.textContent = b
    y.style.fontSize = "60px"
  } else if (V.length <= 16 && !isNaN(Number(i))) {
    y.textContent = i || 0
    y.style.fontSize = "60px"
  } else if (V.length > 16 && V.length <= 27) {
    y.textContent = i
    y.style.fontSize = "35px"
  } else if (V.length > 27) {
    y.style.fontSize = "35px"
    y.textContent = i.slice(0, 20) + "..."
  }
  else {
    y.textContent = i
    y.style.fontSize = "60px"
  }
}

function op(s) {
  let L = [];
  let temp = "";
  for (let i of s) {
    if (i === '+' || i === '-' || i === '×' || i === '÷') {
      L.push(temp);
      L.push(i);
      temp = "";
    }
    else {
      temp += i;
    }
  } L.push(temp)
  if ((L.includes("")) && (L[1] === "-" || L[1] === "+")) {
    L.splice(0, 1)
    L[0] = L[0] + L[1]
    L.splice(1, 1)
  }
  if ((L[3] === "-" || L[3] === "+")) {
    L.splice(2, 1)
    L[2] = L[2] + L[3]
    L.splice(3, 1)
  }
  let [V, J, H] = L
  return operate(Number(V), J, Number(H));
}

function operate(a, w, b) {
  if (w === "+") return add(a, b);
  if (w === "-") return subtract(a, b);
  if (w === "×") return multiply(a, b);
  if (w === "÷") return divide(a, b);
}

function add(a, b) {
  return String(a + b)
}

function subtract(a, b) {
  return String(a - b)
}

function multiply(a, b) {
  let s = a * b;
  s = String(s)
  return s;
}

function divide(a, b) {
  if (b === 0) {
    error = true
    return y.textContent = "Error:Divsion by zero"
  } else {
    let d = a / b;
    d = String(d)
    return d;
  }
}

function operation(ope) {
  let r = ope.textContent;
  if (error && ("+-×÷.%±").includes(r)) return;
  if (error && !isNaN(Number(r))) {
    s = ""
    error = false
    s += r
    display(s)
  }
  else if (!isNaN(Number(r))) {
    if (B === "=") {
      s += r
      display(s)
      console.log(s)
    }
    else {
      if ((s[0] === "-" || s[0] === "+") && (s.at(-1) === "+" || s.at(-1) === "-")) {
        s += r
        display(s)
      } else {
        s += r
        display(s)
      }
    }
  }

  if (r === "+" || r === "-" || r === "×" || r === "÷") {
    let Q = s.split('')
    let P = "%."
    if (s.includes("+") || s.includes("-") || s.includes("×") || s.includes("÷")) {
      if (Q[0] === '+' || Q[0] === '-') {
        if (!isNaN(s)) {
          s += r;
          display(s)
        } else {
          calculate(r)
        }
      }
      else {
        if (W.includes(Q.at(-1))) {
          s = s.replace(Q.at(-1), r)
          display(s)
        } else if (!(Q.every(ope => (P.includes(ope))))) {
          let t = op(s);
          s = String(t) + r;
          display(s)
        } else if ((!(Q.at(-1) === ".")) && !(Q.includes("%"))) {
          calculate(r)
        }
        else {
          display(s);
          showError()
        }
      }
    } else if (s === '') {
      s = "0" + r
      display(s)
    }
    else {
      s += r;
      display(s)
    }
  }

  if (r === "±") {
    let M = s.split('')
    let x = M.lastIndexOf('+');
    let q = M.lastIndexOf('-');
    if (x === -1 && q === -1 && M.every(ope => T.includes(ope))) {
      if (s.includes("×")) {
        let x = s.lastIndexOf('×')
        s = s.slice(0, x + 1) + '-' + s.slice(x + 1)
        display(s)
      }
      else {
        let x = s.lastIndexOf('÷')
        s = s.slice(0, x + 1) + '-' + s.slice(x + 1)
        display(s)
      }
    } else if (x === -1 && q === -1 && !(M.every(ope => (W.includes(ope))))) {
      s = '-' + s
      display(s)
    }
    else if (x === -1) {
      M[q] = '+'
      s = M.join('')
      display(s)
    }
    else if (q === -1) {
      M[x] = '-'
      s = M.join('')
      display(s)
    }
    else if (x > q) {
      M[x] = '-'
      s = M.join('')
      display(s)
    } else if (q > x) {
      M[q] = '+'
      s = M.join('')
      display(s)
    } else {
      alert("Invalid")
    }
  }

  if (r === '%') {
    let T = s.split('')
    if (T.length === 1 && T[0] === ".") {
      s += r
      display(s);
      showError()
    }
    else if (!isNaN(Number(s))) {
      s = String(s / 100)
      display(s)
    } else {
      s += r
      display(s);
      showError()
    }
  }

  if (r === ".") {
    let W = s.split('')
    if (s === "") {
      s = "0" + r
      display(s);
    }
    else if (!(W.includes("."))) {
      s += r
      display(s)
    }
    else if (W.includes(".") && isNaN(Number(s)) && !isNaN(Number(W.at(-1)))) {
      s+=r
      display(s);
    }
    else if (W.includes(".")) {
      display(s)
    }
    else if (W.every(ope => R.includes(ope))) {
      display(s)
    }
    else {
      display(s)
    }
  }

  if (r === "DEL") {
    s = s.slice(0, -1)
    display(s);
  }

  if (r === "AC") {
    s = "";
    B=""
    display(s);
    error = false
  }

  if (r === "=") {
    let Q = s.split('')
    if (Q.every(ope => R.includes(ope))) {
      display(s)
    } else if (W.includes(Q.at(-1))) {
      display(s)
    } else if (!isNaN(Number(s)) && (Q.at(0) === "-" || Q.at(0) === "+")) {
      display(s)
    }
    else {
      let D = s.split('')
      let G = "%"
      if (D.every(ope => !(G.includes(ope))) && D.at(-1) !== ".") {
        let n = op(s);
        s = String(n)
        display(s)
      }
      else {
        showError()
      }
    }
  }
  B = r;
}
