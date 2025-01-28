// /**
//  * HashSet class implementation
//  * A HashSet is a data structure that stores unique keys using a hash function
//  * to map keys to array indices for efficient access.
//  */

// Class for the HashSet
class HashSet {
    /**
     * @param {number} initialCapacity - Initial size of the storage array
     * @param {number} loadFactor - Ratio threshold that determines when to resize the HashSet
     */
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        // The storage array where keys will be stored
        this.storage = new Array(initialCapacity);
        
        // Current number of elements in the HashSet
        this.size = 0;
        
        // Maximum capacity of the storage array
        this.capacity = initialCapacity;
        
        // Load factor determines when to resize the HashSet
        this.loadFactor = loadFactor;
    }

    /**
     * Generates a hash code for a given key
     * @param {string} key - The key to hash
     * @returns {number} - The calculated hash code
     */
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    /**
     * Converts a hash code into an array index within the storage capacity
     * @param {number} hashCode - The hash code to convert
     * @returns {number} - An index within the bounds of the storage array
     */
    _getIndex(hashCode) {
        return Math.abs(hashCode) % this.capacity;
    }

    /**
     * Checks if the HashSet needs to be resized based on load factor
     * @returns {boolean} - True if resize is needed
     */
    _shouldResize() {
        return (this.size / this.capacity) > this.loadFactor;
    }

    /**
     * Doubles the size of the storage array and rehashes all entries
     * @private
     */
    _resize() {
        const oldKeys = this.keys();
        this.capacity *= 2;
        this.storage = new Array(this.capacity);
        this.size = 0;

        for (const key of oldKeys) {
            this.add(key);
        }
    }

    /**
     * Adds a key to the HashSet
     * @param {string} key - The key to add
     */
    add(key) {
        const index = this._getIndex(this.hash(key));

        // If the bucket is empty, create a new entry
        if (!this.storage[index]) {
            this.storage[index] = new Set(); // Using a Set to handle collisions
        }

        // Check if the key already exists
        if (!this.storage[index].has(key)) {
            this.storage[index].add(key);
            this.size++;
        }

        // Check if we need to resize after adding new entry
        if (this._shouldResize()) {
            this._resize();
        }
    }

    /**
     * Checks if the HashSet contains a key
     * @param {string} key - The key to check
     * @returns {boolean} - True if the key exists, false otherwise
     */
    has(key) {
        const index = this._getIndex(this.hash(key));
        return this.storage[index] ? this.storage[index].has(key) : false;
    }

    /**
     * Removes a key from the HashSet
     * @param {string} key - The key to remove
     * @returns {boolean} - True if the key was found and removed, false otherwise
     */
    remove(key) {
        const index = this._getIndex(this.hash(key));
        if (this.storage[index] && this.storage[index].has(key)) {
            this.storage[index].delete(key);
            this.size--;
            return true;
        }
        return false;
    }

    /**
     * Returns the number of stored keys in the HashSet
     * @returns {number} - Number of keys in the HashSet
     */
    length() {
        return this.size;
    }

    /**
     * Returns an array containing all the keys in the HashSet
     * @returns {Array} - Array of all keys
     */
    keys() {
        const allKeys = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.storage[i]) {
                allKeys.push(...this.storage[i]);
            }
        }
        return allKeys;
    }

    /**
     * Removes all entries in the HashSet
     */
    clear() {
        this.storage = new Array(this.capacity);
        this.size = 0;
    }
}

module.exports = HashSet; 