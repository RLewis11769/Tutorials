// Metaprogramming Reflection

// Introspection
// Accesses internal properties/underlying mechanics of code
// Reflect object / Reflect API helps with introspection in ES6

console.log('Result of introspection example:');

const trainer = {
  backpack: ['potion', 'berries'],
  pokemon: 'Charmander',
  health: 100,
};

// Object.keys is part of structure of every object
// Puts keys of trainer object into array
const keys = Object.keys(trainer);

console.log(keys);


// Self-Modification
// Code that changes itself

console.log('Result of self-modification example:');

function grumpySum(a, b) {
  // Function that adds until a > 5 then changes itself to always return 0
  if (a > 5) {
    // Changes definition of function within function
    grumpySum = () => 0;
  }
  return a + b;
}

console.log(grumpySum(1, 1));
console.log(grumpySum(10, 1));
// If statement changes def while running above code so new def shown after
console.log(grumpySum(1, 1));


// Intercession
// Acting or changing things on behalf of something else
// Limited - almost always uses Object.defineProperty()
// Proxy object helps with Intercession in ES6

// Example 1
console.log('Result of intercession example:');

const hero = {
  health: 10,
};

Object.defineProperty(hero, 'status', {
  // Defines temporary new property of object
  // Can also modify existing property of object, and returns object (see below)
  get: () => {
    // Adds status to hero object
    if (hero.health > 50) {
      return 'fit';
    } else {
      return 'badly hurt';
    }
  },
});

console.log(`Hero is ${hero.status}`);
console.log(hero);

// // Example 2
// // Throws an error in strict mode so commented out
// const obj = {};

// Object.defineProperty(obj, 'property1', {
//   // Defines value property in obj as unwritable
//   value: 42,
//   writable: false,
// });

// // Cannot change property
// obj.property1 = 77;

// console.log(obj.property1);
