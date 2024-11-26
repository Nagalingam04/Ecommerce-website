import { formatCurrency } from "../../scripts/utils/money.js";

console.log("test suite : formatCurrency")

console.log("Converts cents into dollars")

if(formatCurrency(2095) === '20.95'){
  console.log('Passed');
}
else{
  console.log('failed');
}

console.log("Working with Zero")

if(formatCurrency(0) === '0.00'){
  console.log('Passed');
}
else{
  console.log('failed');
}

console.log('Rounding to the nearest value')

if(formatCurrency(2000.5) === '20.01'){
  console.log('Passed');
}
else{
  console.log('failed');
}

