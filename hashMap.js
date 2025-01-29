class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    /**
     * @param {number} initialCapacity - Initial size of the storage array
     * @param {number} loadFactor - Ratio threshold that determines when to resize the hashmap
     */
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        // The storage array where key-value pairs will be stored
        this.storage = new Array(initialCapacity);
        
        // Current number of elements in the hashmap
        this.size = 0;
        
        // Maximum capacity of the storage array
        this.capacity = initialCapacity;
        
        // Load factor determines when to resize the hashmap
        // If (size / capacity) exceeds loadFactor, the hashmap will be resized
        this.loadFactor = loadFactor;
    }

    /**
     * Generates a hash code for a given key
     * @param {string} key - The key to hash
     * @returns {number} - The calculated hash code
     * 
     * This implementation uses the polynomial rolling hash function:
     * - Uses prime number 31 (commonly used in Java's String.hashCode())
     * - Iterates through each character in the key
     * - Multiplies the running total by 31 and adds the character code
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
        // Use modulo to ensure the index is within array bounds
        // Math.abs handles negative hash codes
        return Math.abs(hashCode) % this.capacity;
    }

    /**
     * Checks if the HashMap needs to be resized based on load factor
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
        // Store old entries
        const oldEntries = this.entries();
        
        // Double the capacity
        this.capacity *= 2;
        
        // Reset storage and size
        this.storage = new Array(this.capacity);
        this.size = 0;
        
        // Rehash all entries into new storage
        for (const [key, value] of oldEntries) {
            this.set(key, value);
        }
    }

    /**
     * Sets a key-value pair in the hash map using Linked List chaining
     * @param {string} key - The key to store the value under
     * @param {*} value - The value to store
     */
    set(key, value) {
        const index = this._getIndex(this.hash(key));
        
        // Create new node
        const newNode = new Node(key, value);
        
        // If bucket is empty, create new Linked List
        if (!this.storage[index]) {
            this.storage[index] = newNode;
            this.size++;
        } else {
            // If bucket has nodes, traverse the Linked List
            let current = this.storage[index];
            
            // If first node has our key, update value
            if (current.key === key) {
                current.value = value;
                return;
            }
            
            // Check remaining nodes
            while (current.next) {
                if (current.next.key === key) {
                    current.next.value = value;
                    return;
                }
                current = current.next;
            }
            
            // Key not found, add to end of list
            current.next = newNode;
            this.size++;
        }
    
        // Check if we need to resize after adding new entry
        if (this._shouldResize()) {
            this._resize();
        }
    }

    /**
     * Retrieves the value associated with a given key
     * @param {string} key - The key to look up 
     * @returns {*} - The value associated with the key
     */
    get(key) {
        // Get the index where the key would be stored
        const index = this._getIndex(this.hash(key));

        // If bucket is empty, key doesn't exist
        if (!this.storage[index]) {
            return null;
        }

        // Traverse the linked list in this bucket 
        let current = this.storage[index];

        // Check each node for our key
        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }

        // Key wasn't found in the chain
        return null;
    }

    /**
     * Returns true or false after checking whether the bucket contains a key
     * @param {string} key - The key to look up 
     * @returns {boolean} - True or false 
     */
    has(key) {
        // Get the index where the key would be stored
        const index = this._getIndex(this.hash(key));

        // If bucket is empty, key doesn't exist
        if (!this.storage[index]) {
            return false;
        }

        // Traverse the linked list in the bucket
        let current = this.storage[index];

        // Check each node for our key
        while (current) {
            if (current.key === key) {
                return true;
            }
            current = current.next;
        }
        
        // Key wasn't found in the chain 
        return false;
    }

    /**
     * Removes an entry with the given key from the hash map
     * @param {string} key - The key to remove
     * @returns {boolean} - True if key was found and removed, false otherwise
     */
    remove(key) {
        // Get the index where the key would be stored
        const index = this._getIndex(this.hash(key));
        
        // If bucket is empty, key doesn't exist
        if (!this.storage[index]) {
            return false;
        }
        
        // If first node has our key
        if (this.storage[index].key === key) {
            this.storage[index] = this.storage[index].next;
            this.size--;

            return true;
        }
        
        // Traverse the linked list to find the key
        let current = this.storage[index];
        while (current.next) {
            // If next node has our key
            if (current.next.key === key) {
                // Remove the node by updating the next pointer
                current.next = current.next.next;
                this.size--;
                return true;
            }
            current = current.next;
        }
        
        // Key wasn't found
        return false;
    }

    /**
     * Returns the number of stored keys in the hash map
     * @returns {number} - Number of key-value pairs in the hash map
     */
    length() {
        return this.size;
    }

    /**
     * Removes all entries in the hash map
     * Resets the storage array and size counter
     */
    clear() {
        // Reset storage to empty array with initial capacity
        this.storage = new Array(this.capacity);
        // Reset size counter to 0
        this.size = 0;
    }

    /**
     * Returns an array containing all the keys in the hash map
     * @returns {Array} - Array of all keys
     */
    keys() {
        const allKeys = [];
        
        // Iterate through all buckets
        for (let i = 0; i < this.capacity; i++) {
            // Skip empty buckets
            if (this.storage[i]) {
                // Traverse the linked list in this bucket
                let current = this.storage[i];
                while (current) {
                    allKeys.push(current.key);
                    current = current.next;
                }
            }
        }
        
        return allKeys;
    }

    /**
     * Returns an array containing all the values in the hash map
     * @returns {Array} - Array of all values
     */
    values() {
        const allValues = [];

        // Iterate through all buckets
        for (let i = 0; i < this.capacity; i++) {
            // Skip empty buckets
            if (this.storage[i]) {
                // Traverse the linked list in the bucket
                let current = this.storage[i];
                while (current) {
                    allValues.push(current.value);
                    current = current.next;
                }
            }
        }
        return allValues;
    }

    /**
     * Returns an array containing all key-value pairs in the hash map
     * @returns {Array} - Array of [key, value] pairs
     */
    entries() {
        const allEntries = [];
        
        // Iterate through all buckets
        for (let i = 0; i < this.capacity; i++) {
            // Skip empty buckets
            if (this.storage[i]) {
                // Traverse the linked list in this bucket
                let current = this.storage[i];
                while (current) {
                    allEntries.push([current.key, current.value]);
                    current = current.next;
                }
            }
        }
        
        return allEntries;
    }
}

module.exports = HashMap;