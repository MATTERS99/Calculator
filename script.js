function add(a, b) {
  const e = a + b;
  return e;
}
function subtract(a, b) {
  const r = a - b;
  return r;
}
function multiply(a, b) {
  const s = a * b;
  return s;
}
function divide(a, b) {
  const d = a / b;
  return d;
}

function operate(a, b) {
  if (w === "+") add(a, b);
  if (w === "-") subtract(a, b);
  if (w === "*") multiply(a, b);
  if (w === "/") divide(a, b);
}
