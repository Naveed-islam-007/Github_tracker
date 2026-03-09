1. VAR- It is function scoped so it can be redeclared aand reassigned.
   let- It is block scoped so it can be reassigned but not redeclared 
   const- It is also block scoped but it can neither be redeclred nor reassigned 




2.The job of spread operator is is to expaand array or objects where it is applied. For e.g.- const person = {
name: "John",
age: 25
};

const newPerson = {
...person,
city: "Dhaka"
};

Result

{name:"John", age:25, city:"Dhaka"}


3.Map() transforms the array/object and returns a new one 
filter() selects specific items from the array and returns the values which satisfies the conditions provided.
forEach() loops through the array but does not return anything.


4.Arrow funnctions are shorter and easier and way to write a function 
For e.g.-
const add = (a,b) => a+b;
Wrote in one line.

5.Template literals allow string interpolation using backticks (``) thus making it easier to deal with strings. 
