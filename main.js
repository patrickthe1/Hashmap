const HashMap = require('./hashMap.js')
const test = new HashMap(16,0.75);

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('lion','Glowing golden')
test.set('moon', 'silver')


console.log(test.length())
console.log(test.capacity);
console.log(test.get('lion'))
console.log(test.has('moon'))
console.log(test.remove('lion'))  
console.log(test.length())    

