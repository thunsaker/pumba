// Typescript Getting Started Demo Final
class Student {
   fullname: string;
   constructor(public first, public middle, public last) {
      this.fullname = first + " " + middle + " " + last;
   }
}

interface Person {
   first: string,
   last: string
}

function greeter(person : Person) {
   return "Hello, " + person.first + " " + person.last;
}

var user = new Student("James", "W", "Howlett");

document.body.innerHTML = greeter(user);
console.log("Huzzah!");
