const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  
  
  
  class node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class queue {
    constructor() {
      this.items = [];
      this.frontIndex = 0;
      this.backIndex = 0;
      this.size = 0;
    }
  
    enqueue(item) {
      this.items[this.backIndex] = item;
      this.backIndex++;
      this.size++;
    }
  
    dequeue() {
      let temp = this.items[this.frontIndex];
      this.frontIndex++;
      this.size--;
      return temp;
  
    }
  }
  
  class tree {
    constructor(array) {
      this.array = array;
      this.root = this.buildTree(0, array.length - 1);
    }
  
    buildTree(start, end, array = this.array) {
      // base case
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
  
      // console.log(arr[mid]);
      const newNode = new node(array[mid]);
  
  
      // recursively
      newNode.left = this.buildTree(start, mid - 1, array);
      newNode.right = this.buildTree(mid + 1, end, array);
  
      return newNode;
    }
  
    insert(data) {
      this.recursiveInsert(this.root, data);
    }
  
    recursiveInsert(root, data) {
  
      if (root == null) return new node(data);
  
      if (data < root.data) {
        root.left = this.recursiveInsert(root.left, data);
      } else if (data > root.data) {
        root.right = this.recursiveInsert(root.right, data);
      }
      return root;
    }
  
    delete(data) {
      this.recursiveDelete(this.root, data);
    }
  
    recursiveDelete(root, data) {
      if (root == null) return root;
  
      if (root.data > data) {
        root.left = this.recursiveDelete(root.left, data);
        return root;
      } else if (root.data < data) {
        root.right = this.recursiveDelete(root.right, data);
        return root;
      }
  
      // case 1, one empty child
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }
  
      // case 2, if both children exist
      else {
        let succParent = root;
        let succ = root.right;
  
        // find successor
        while (succ.left != null) {
          succParent = succ;
          succ = succ.left;
        }
  
        // rearrange the nodes
        if (succParent != root) {
          succParent.left = succ.right;
        } else {
          succParent.right = succ.right;
  
        }
        root.data = succ.data;
        return root;
      }
    }
  
    // find value
    find(data) {
      return this.recursiveFind(this.root, data);
    }
  
    recursiveFind(root, data) {
  
      // base case
      if (root == null) {
        return null;
      }
  
      // comparison
      if (data < root.data) {
        return this.recursiveFind(root.left, data);
      } else if (data > root.data) {
        return this.recursiveFind(root.right, data);
      }
      return root;
    }
  
    levelOrder(callback) {
      this.recursiveLevelOrder(this.root, callback);
    }
  
    recursiveLevelOrder(root, callback) {
      // create queue
      const fifo = new queue();
      fifo.enqueue(this.root);
      while (fifo.size) {
        let curr = fifo.dequeue();
  
        if (curr.left != null) fifo.enqueue(curr.left);
        if (curr.right != null) fifo.enqueue(curr.right);
  
        callback(curr);
      }
    }
  
  
    inOrder(root = this.root, callback, arr=[]) {
      if (root == null) return [];    
      this.inOrder(root.left, callback, arr);
      if (callback) {
        callback(root);
      } else {      
        arr.push(root.data);
      }
      this.inOrder(root.right, callback, arr);
      
      return arr;
    }
  
    preOrder(root, callback, arr=[]) {
      if (root == null) return;
  
      //callback(root)
      if (callback) {
        callback(root);
      } else {
        arr.push(root.data);
      }
  
      this.preOrder(root.left, callback, arr);
      this.preOrder(root.right, callback, arr);
  
      return arr;
    }
  
    postOrder(root, callback, arr=[]) {
      if (root == null) return [];
  
      this.postOrder(root.left, callback, arr);
      this.postOrder(root.right, callback, arr);
      if (callback) {
        callback(root);
      } else {
        arr.push(root.data);
      }
      return arr;
    }
  
    height(node) {
      // hitting a null
      if (node == null) return 0;
      if (node.left == null && node.right == null) return 0;
  
      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  
    depth(node) {
      return this.recursiveDepth(this.root, node);
    }
  
    recursiveDepth(root, node) {
      // base case
      if (root == null) return -1;
  
      if (node.data == root.data) return 0;
  
      if (node.data < root.data) {
        return 1 + this.recursiveDepth(root.left, node);
      } else if (node.data > root.data) {
        return 1 + this.recursiveDepth(root.right, node);
      } 
    }
  
    isBalanced(root = this.root) {
      
      if (root == null) return true;
  
      const leftHeight = this.height(root.left);
      const rightHeight = this.height(root.right);
  
      const difference = Math.abs(leftHeight - rightHeight);
      
      if (difference > 1) {
        return false;
      } 
      return this.isBalanced(root.left) && this.isBalanced(root.right);
    }
  
    rebalance() {
      const newArray = this.inOrder(this.root);
      console.log(newArray);
      this.root = this.buildTree(0, newArray.length - 1, newArray);
    }
  }
  
  
  // driver script
  function generateArray(newArray = [], start = 0) {
      newArray = [];
      for (let i = 0; i < 60; i++) {
        const newNumber = Math.floor(Math.random() * 1000);
        if (!newArray.includes(newNumber)) newArray.push(Number(newNumber));
      }
  
      newArray.sort((a, b)=>{
        if (Number(a) - Number(b) > 0) {
            return 1;
        } else if (Number(a) - Number(b) < 0) {
          return -1 ;
        }
      });
      console.log(newArray);
      return newArray;
  }
  
  function addMoreNodes(tree) {
    for (let i = 0; i < 100; i++) {
      tree.insert(Math.floor(Math.random() * 800));
    }
  }
  
  const firstArray = generateArray();
  const newTree = new tree(firstArray);
  prettyPrint(newTree.root);
  console.log(newTree.isBalanced());
  addMoreNodes(newTree);
  prettyPrint(newTree.root);
  console.log(newTree.isBalanced());
  newTree.rebalance();
  prettyPrint(newTree.root);
  console.log(newTree.isBalanced());
  
  
  
  
  
  
  
  