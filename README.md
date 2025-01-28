# HashMap and HashSet Implementation

This repository contains implementations of a `HashMap` and a `HashSet` in JavaScript. Both data structures are designed to store key-value pairs (in the case of `HashMap`) and unique keys (in the case of `HashSet`) efficiently using hashing.

## Table of Contents

- [HashMap](#hashmap)
  - [Features](#features)
  - [Methods](#methods)
  - [Usage Example](#usage-example)
- [HashSet](#hashset)
  - [Features](#features-1)
  - [Methods](#methods-1)
  - [Usage Example](#usage-example-1)
- [Installation](#installation)
- [License](#license)

## HashMap

### Features

- Stores key-value pairs.
- Handles collisions using linked lists.
- Automatically resizes when the load factor exceeds a specified threshold.
- Provides efficient retrieval, insertion, and deletion operations.

### Methods

- `set(key, value)`: Adds a key-value pair to the map.
- `get(key)`: Retrieves the value associated with a given key.
- `has(key)`: Checks if a key exists in the map.
- `remove(key)`: Removes a key-value pair from the map.
- `length()`: Returns the number of stored keys.
- `clear()`: Removes all entries in the map.
- `keys()`: Returns an array of all keys in the map.
- `values()`: Returns an array of all values in the map.
- `entries()`: Returns an array of all key-value pairs.

### Usage Example

```javascript
const HashMap = require('./hashMap.js');

const map = new HashMap();
map.set("name", "John");
map.set("age", 25);
console.log(map.get("name")); // Output: John
console.log(map.has("age")); // Output: true
console.log(map.length()); // Output: 2
map.remove("age");
console.log(map.length()); // Output: 1
console.log(map.entries()); // Output: [["name", "John"]]
```

## HashSet

### Features

- Stores unique keys without associated values.
- Automatically resizes when the load factor exceeds a specified threshold.
- Provides efficient insertion, existence checking, and deletion operations.

### Methods

- `add(key)`: Adds a key to the set.
- `has(key)`: Checks if a key exists in the set.
- `remove(key)`: Removes a key from the set.
- `length()`: Returns the number of stored keys.
- `clear()`: Removes all entries in the set.
- `keys()`: Returns an array of all keys in the set.

### Usage Example

```javascript
const HashSet = require('./hashSet.js');

const mySet = new HashSet();
mySet.add("apple");
mySet.add("banana");
console.log(mySet.has("apple")); // Output: true
console.log(mySet.length()); // Output: 2
mySet.remove("apple");
console.log(mySet.has("apple")); // Output: false
console.log(mySet.keys()); // Output: ["banana"]
mySet.clear();
console.log(mySet.length()); // Output: 0
```

## Installation

To use the `HashMap` and `HashSet` classes, clone this repository and include the respective files in your project. You can then require or import them as shown in the usage examples.

```bash
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
