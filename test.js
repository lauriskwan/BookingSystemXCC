const date = new Date();

let ISOdate = date.toISOString().slice(0, 8).split("-").reverse().join("-");
let localDate = date.toLocaleDateString().slice(2, 10).split("/").join("-")


console.log(ISOdate);
console.log(localDate);