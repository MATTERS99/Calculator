const y = document.querySelector(".disp")
const ab = document.querySelectorAll(".function div");
let s = ""
ab.forEach(item => {
  item.addEventListener("click", () => {
    let r = item.textContent;
    console.log(r)
    
    if (r != '+' && r != '×' && r != '%' && r != '÷' && r != '−' && r != '=' && r != '±') {
      s += r
    }
    if (r === "=") {
      let n = op(s);
      y.textContent = n
      s = String(n)
    }
    if (r === "+" || r === "−" || r === "×" || r === "÷") {
      if (s.includes("+") || s.includes("−") || s.includes("×") || s.includes("÷")) {
        let t = op(s);
        s = String(t) + r;
      }
      else {
        s += r;
      }
    }
    y.textContent=s
  })
});


function op(s) {
  let L = [];
  let temp = "";

  for (let i of s) {
    if (i === '+' || i === '−' || i === '×' || i === '÷') {
      L.push(temp);
      L.push(i);
      temp = "";
    }
    else {
      temp += i;
    }
  }
  L.push(temp);

  let [e, v, d] = L
  return operate(Number(e), v, Number(d));

}

function operate(a, w, b) {
  if (w === "+") return add(a, b);
  if (w === "−") return subtract(a, b);
  if (w === "×") return multiply(a, b);
  if (w === "÷") return divide(a, b);
}
function add(a, b) {
  let e = a + b;
  y.textContent = e
  e = String(e)
  return e;
}
function subtract(a, b) {
  let r = a - b;
  y.textContent = r
  r = String(r)
  return r;
}

function multiply(a, b) {
  let s = a * b;
  y.textContent = s
  s = String(s)
  return s;
}

function divide(a, b) {
  let d = a / b;
  y.textContent = d
  d = String(d)
  return d;
}





