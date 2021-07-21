// Proxy object is used for intercession in metaprogramming
// Virtualizes another object to provide custom behaviors to that object

// Some vocab
// Handler - object that proxy provides custom behaviors to
// Target - object that contains traps
// Trap - method that provides access to the target's properties (often using Reflect API methods)

// What a proxy looks like
// const proxy = new Proxy(target, handler);

// What a handler looks like
// const handler = {trap_method: (trap_attributes) => return}
// Requires traps (handler functions) to access and customize a target object
// Often mapped to Reflect object methods
// All examples below use get: and/or set trap
// Each trap is passed necessary attributes automatically


// Comment out from here to line 41 if problems in console!

console.log('Result of basic proxy examples:');
// Basic handler - does not use all attributes of handler!
const handler = {
  // Always returns 7 when called
  get: (target, name) => 7,
};

// Using the handler above
const p = new Proxy({}, handler);

// Obvs a doesn't exist but created anyway (both ways shown above)
console.log(`Broken apart proxy result: ${p.a}`);

// Altogether now just to be clear (Still does not use all attributes!)
const pr = new Proxy({}, {
  // Always returns 7 when called
  get: (target, name) => 7,
});

console.log(`All in one proxy result: ${pr.a}`);


// A bit of Reflection
console.log('Result of basic Reflect example:');

const wizard = {
  power: 100,
};

const reflect = Reflect.get(wizard, 'power');
console.log(reflect);


// Detailed explanation of how proxy works
console.log('Result of logAccess examples:');

function logAccess(obj) {
  // Logs access to keys or changes keys
  return new Proxy(obj, {
    // Returns new object with custom behavior when keys accessed
    get(target, key) {
      // These behaviors happen when key accessed in any way
      console.log('Accessed key', key);
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      // These behaviors happen when object value changed
      console.log('Updated key', key, 'to', value);
      return Reflect.set(target, key, value);
    },
  });
}

// Future target object for proxy
const cat = {
  name: 'Shadow',
  age: 4,
};

// Cat as seen above but with custom behaviors added by proxy
const catWithAccess = logAccess(cat);

// This does literally nothing - original object not changed
cat.name;
// Object is not changed, just behaviors
console.log(catWithAccess);

// Custom behavior on!
const initialAge = catWithAccess.age;
console.log(initialAge);
catWithAccess.age = 5;
const newAge = catWithAccess.age;
console.log(newAge);


// No intermediary object necessary for proxy
console.log('Result of observable example:');

function observable(obj, onChange) {
  // Creates observable change in obj when changed
  return new Proxy(obj, {
    // These behaviors happen when object value changed
    set(target, key, value) {
      // Prints string as seen in anonymous function below
      onChange({ key, value });
      // Returns changed object
      return Reflect.set(target, key, value);
    },
  });
}

// Target that will be changed with no intermediary (note: let not const)
let otherCat = {
  name: 'Vader',
  age: 3,
};

otherCat = observable(otherCat, ({ key, value }) => {
  // Passes obj and function to proxy, prints and returns new object
  // This arrow function is onChange() referenced in observable() - fun circular logic
  console.log(`${key} changed to ${value}`);
});

// Same result as changing cat.age
otherCat.age = 4;
