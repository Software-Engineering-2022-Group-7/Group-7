function AVL() {
  this._size = 0;
  this._root = null;
}

AVL.prototype.getSize = function() {
  return this._size;
};

AVL.prototype.isEmpty = function() {
  return this._size == 0;
};

AVL.prototype.insert = function(key, value) {
  this._root = this._insertInSubtree(this._root, key, value);
  this._size++;
};

AVL.prototype.update = function(key, value) {
  this._updateInSubtree(this._root, key, value);
};

AVL.prototype.get = function(key) {
  return this._findInSubtree(this._root, key)
};

AVL.prototype.contains = function(key) {
  return this._containsInSubtree(this._root, key);
};

AVL.prototype.remove = function(key) {
  this._root = this._removeFromSubtree(this._root, key);
  this._size--;
};

AVL.prototype.getKeys = function(traversal) {
  let list = this.traverseInOrder();
  if(traversal == 0) {
    list = this.traversePreOrder();
  } else if(traversal == 1) {
    list = this.traversePostOrder();
  } else if(traversal == 2) {
    list = this.traverseInOrder();
  } else if(traversal == 3) {
    list = this.traverseLevelOrder();
  }
  const keys = new Array();
  for(let i = 0; i < list.length; i++){
    keys.push(list[i][0]);
  }
  return keys;
};

AVL.prototype.getItems = function(traversal) {
  let list = this.traverseInOrder()
  if(traversal == 0) {
    list = this.traversePreOrder();
  } else if(traversal == 1) {
    list = this.traversePostOrder();
  } else if(traversal == 2) {
    list = this.traverseInOrder();
  } else if(traversal == 3) {
    list = this.traverseLevelOrder();
  }
  return list;
};

AVL.prototype.getHeight = function() {

};

AVL.prototype.getMaxKey = function() {
  return this._getMaxInSubtree(this._root)[0];
};

AVL.prototype.getMinKey = function() {
  return this._getMinInSubtree(this._root)[0];
};

AVL.prototype.getHeight = function() {

};


AVL.prototype.traversePreOrder = function() {
  const pairList = new Array();
  this._buildPreOrderTraversal(this._root, pairList);
  const list = new Array();
  while(pairList.length != 0) {
    list.push(pairList.pop());
  }
  return list;
};

AVL.prototype.traversePostOrder = function() {
  const pairList = new Array();
  this._buildPostOrderTraversal(this._root, pairList);
  const list = new Array();
  while(pairList.length != 0) {
    list.push(pairList.pop());
  }
  return list;
};

AVL.prototype.traverseInOrder = function() {
  const pairList = new Array();
  this._buildInOrderTraversal(this._root, pairList);
  const list = new Array();
  while(pairList.length != 0) {
    list.push(pairList.pop());
  }
  return list;
};

AVL.prototype.traverseLevelOrder = function() {
  const list = new Array();
  const queue = new Array();
  const nodeCount = this._countNodes(this._root);

  queue.push(this._root);
  while(queue.length > 0) {
    currentNode = queue.shift();
    list.push([currentNode.getKey(), currentNode.getValue()]);
    if(currentNode.getLeft() != null) {
      queue.push(currentNode.getLeft());
    }
    if(currentNode.getRight() != null) {
      queue.push(currentNode.getRight());
    }
  }
  return list;
};

//add source
AVL.prototype.displayTree = function() {
  document.write("Tree:");
  this._displayTree(this._root, 0);
  document.write("<br><br>");
};

AVL.prototype.checkInvariants = function() {
  if(this._countNodes(this._root) != this._size) {
    throw "Problem in BST: Node count doesn't match tree size";
  }
  if(this._root != null) {
    this._verifyKeysBoundedBy(this._root, false, this._root.getKey(), false, this._root.getKey());
  }
};

AVL.prototype._getBalance = function(currentNode) {
  if(currentNode == null){
    return 0;
  }
  const leftHeight = this._getHeightInSubtree(currentNode.getLeft());
  const rightHeight = this._getHeightInSubtree(currentNode.getRight());
  return leftHeight - rightHeight;
};

AVL.prototype._rightRotate = function(currentNode) {
  const leftNode = currentNode.getLeft();
  const rightNode = currentNode.getRight();
  left.setRight(currentNode);
  currentNode.setLeft(right);

  return left;
};

AVL.prototype._leftRotate = function(currentNode) {
  const leftNode = currentNode.getLeft();
  const rightNode = currentNode.getRight();
  right.setLeft(currentNode);
  currentNode.setRight(left);

  return right;
};

AVL.prototype._insertInSubtree = function(currentNode, key, value) {
  if(currentNode == null) {
    const newNode = new Node(key, value);
    return newNode;
  } else if(currentNode.getKey() == key) {
    throw "The key already exists.";
  } else if(key > currentNode.getKey()) {
    currentNode.setRight(this._insertInSubtree(currentNode.getRight(), key, value));
  } else if(key < currentNode.getKey()) {
    currentNode.setLeft(this._insertInSubtree(currentNode.getLeft(), key, value));
  }
  const balance = this._getBalance(currentNode);
  if(balance > 1 && key < currentNode.getLeft().getKey()) {
    return this._rightRotate(currentNode);
  }
  if(balance < -1 && key > currentNode.getLeft().getKey()) {
    return this._leftRotate(currentNode);
  }
  if(balance > 1 && key > currentNode.getLeft().getKey()) {
    currentNode.setLeft(this._leftRotate(currentNode.getLeft()));
    return this._rightRotate(currentNode);
  }
  if(balance < -1 && key < currentNode.getLeft().getKey()) {
    currentNode.setRight(this._rightRotate(currentNode.getRight()));
    return this._lefttRotate(currentNode);
  }

  return currentNode;
};

AVL.prototype._removeFromSubtree = function(currentNode, key) {
  console.log(currentNode.getKey());
  console.log(key);

  if(currentNode == null) {
    throw "The key does not exist.";
  } else if(key > currentNode.getKey()) {
    currentNode.setRight(this._removeFromSubtree(currentNode.getRight(), key));
    return currentNode;
  } else if (key < currentNode.getKey()) {
    currentNode.setLeft(this._removeFromSubtree(currentNode.getLeft(), key));
    return currentNode;
  } else {
    if(currentNode.getLeft() == null && currentNode.getRight() == null) {
      currentNode = null;
      return currentNode;
    } else if(currentNode.getLeft() == null && currentNode.getRight() != null) {
      currentNode = currentNode.getRight();
    } else if(currentNode.getRight() == null && currentNode.getLeft() != null) {
      currentNode = currentNode.getLeft();
    } else {
      const max = this._getMaxInSubtree(currentNode.getLeft());
      currentNode.setLeft(this._removeFromSubtree(currentNode.getLeft(), max[0]));
      currentNode.setKey(max[0]);
      currentNode.setValue(max[1]);
    }
  }

  if(currentNode == null) {
    return currentNode;
  }

  const balance = this._getBalance(currentNode);
  if(balance > 1 && this._getBalance(currentNode.getLeft() >= 0)) {
    return this._rightRotate(currentNode);
  }
  if(balance > 1 && this._getBalance(currentNode.getLeft() < 0)) {
    currentNode.setLeft(this._leftRotate(currentNode.getLeft()));
    return this._rightRotate(currentNode);
  }
  if(balance < -1 && this._getBalance(currentNode.getRight() <= 0)) {
    return this._leftRotate(currentNode);
  }
  if(balance < -1 && this._getBalance(currentNode.getRight() > 0)) {
    currentNode.setRight(this._rightRotate(currentNode.getRight()));
    return this._lefttRotate(currentNode);
  }

  return currentNode;
};

AVL.prototype._findInSubtree = function(currentNode, key) {
  if(currentNode == null) {
    throw "The key is not found.";
  } else if(currentNode.getKey() == key) {
    return currentNode.getValue();
  }

  if(key > currentNode.getKey()) {
    return this._findInSubtree(currentNode.getRight(), key);
  } else {
    return this._findInSubtree(currentNode.getLeft(), key);
  }
};

AVL.prototype._containsInSubtree = function(currentNode, key) {
  if(currentNode == null) {
    return false;
  } else if(currentNode.getKey() == key) {
    return true;
  }

  if(key > currentNode.getKey()) {
    return this._containsInSubtree(currentNode.getRight(), key);
  } else {
    return this._containsInSubtree(currentNode.getLeft(), key);
  }
};

AVL.prototype._updateInSubtree = function(currentNode, key, value) {
  if(currentNode == null) {
    throw "The key is not found.";
  } else if (currentNode.getKey() == key) {
    currentNode.setValue(value);
    return;
  }

  if(key > currentNode.getKey()) {
    return this._updateInSubtree(currentNode.getRight(), key, value);
  } else {
    return this._updateInSubtree(currentNode.getLeft(), key, value);
  }
};

AVL.prototype._getHeightInSubtree = function(currentNode) {
  if(currentNode == null) {
    return -1;
  }
  const leftHeight = this._getHeightInSubtree(currentNode.getLeft()) + 1;
  const rightHeight = this._getHeightInSubtree(currentNode.getRight()) + 1;
  if(leftHeight >= rightHeight) {
    return leftHeight;
  } else {
    return rightHeight;
  }
};

AVL.prototype._getMaxInSubtree = function(currentNode) {
  if(currentNode == null) {
    throw "Tree is empty";
  }
  while(currentNode.getRight() != null) {
    currentNode = currentNode.getRight();
  }
  return new Array(currentNode.getKey(), currentNode.getValue());
};

AVL.prototype._getMinInSubtree = function(currentNode) {
  if(currentNode == null) {
    throw "Tree is empty";
  }
  while(currentNode.getLeft() != null) {
    currentNode = currentNode.getLeft();
  }
  return new Array(currentNode.getKey(), currentNode.getValue());
};

AVL.prototype._buildPreOrderTraversal = function(currentNode, list) {
  node = [currentNode.getKey(), currentNode.getValue()];
  list.unshift(node);
  if(currentNode.getLeft() != null) {
    this._buildPreOrderTraversal(currentNode.getLeft(), list);
  }
  if(currentNode.getRight() != null) {
    this._buildPreOrderTraversal(currentNode.getRight(), list);
  }
};

AVL.prototype._buildPostOrderTraversal = function(currentNode, list) {
  if(currentNode.getLeft() != null) {
    this._buildPostOrderTraversal(currentNode.getLeft(), list);
  }
  if(currentNode.getRight() != null) {
    this._buildPostOrderTraversal(currentNode.getRight(), list);
  }
  node = [currentNode.getKey(), currentNode.getValue()];
  list.unshift(node);
};

AVL.prototype._buildInOrderTraversal = function(currentNode, list) {
  if(currentNode.getLeft() != null) {
    this._buildInOrderTraversal(currentNode.getLeft(), list);
  }
  node = [currentNode.getKey(), currentNode.getValue()];
  list.unshift(node);
  if(currentNode.getRight() != null) {
    this._buildInOrderTraversal(currentNode.getRight(), list);
  }
};

AVL.prototype._countNodes = function(currentNode) {
  if(currentNode == null) {
    return 0;
  } else {
    return this._countNodes(currentNode.getLeft()) + this._countNodes(currentNode.getRight()) + 1;
  }
};

AVL.prototype._displayTree = function(currentNode, space) {
  if(currentNode == null) {
    return;
  }
  space += 10;
  this._displayTree(currentNode.getRight(), space);
  document.write("<br>");
  for(let i = 10; i < space; i++) {
    document.write("&nbsp;&nbsp;");
  }
  document.write(currentNode.getKey() + "\n");
  this._displayTree(currentNode.getLeft(), space);
};

AVL.prototype._verifyKeysBoundedBy = function(currentNode, minApplies, minBound, maxApplies, maxBound) {
  if(minApplies && currentNode.getKey() < minBound) {
    throw "a node has a right descendent with lesser key";
  }
  if(maxApplies && currentNode.getKey() > maxBound) {
    throw "a node has a left descendent with greater key";
  }
  if(currentNode.getLeft() != null) {
    this._verifyKeysBoundedBy(currentNode.getLeft(), minApplies, minBound, true, currentNode.getKey());
  }
  if(currentNode.getRight() != null) {
    this._verifyKeysBoundedBy(currentNode.getRight(), true, currentNode.getKey(), maxApplies, maxBound);
  }
};

function Node(key, value, left, right) {
  this._key = key;
  this._value = value;
  if(left != undefined) {
    this._left = left;
  } else {
    this._left = null;
  }
  if(right != undefined) {
    this._right = right;
  } else {
    this._right = null;
  }
}

Node.prototype.getKey = function() {
  return this._key;
}

Node.prototype.setKey = function(newKey) {
  this._key = newKey;
}

Node.prototype.getValue = function() {
  return this._value;
}

Node.prototype.setValue = function(newValue) {
  this._value = newValue;
}

Node.prototype.getLeft = function() {
  return this._left;
}

Node.prototype.setLeft = function(newLeft) {
  this._left = newLeft;
}

Node.prototype.getRight = function() {
  return this._right;
}

Node.prototype.setRight = function(newRight) {
  this._right = newRight;
}

/** ------------ TESTS ------------*/

//       6
//     /  \
//    2    7
//   / \    \
//  1   4    9
//     /
//   3
function makeExampleAVL() {
  const tree = new AVL();
  tree.insert("6", 6);
  tree.insert("2", 2);
  tree.insert("7", 7);
  tree.insert("1", 1);
  tree.insert("4", 4);
  tree.insert("9", 9);
  tree.insert("3", 3);
  tree.checkInvariants();
  tree.displayTree();
  return tree;
}

/** emptyAVL */
// const tree = new AVL();
// size = (tree.getSize() == 0);
// empty = (tree.isEmpty() == true);
// console.log(size && empty);
// tree.checkInvariants();

/** exampleAVL */
// const tree = makeExampleAVL();
// for (let i = 1; i <= 9; i++) {
//   if (i != 5 && i != 8) {
//     console.log(String(i) == tree.get(i));
//   }
// }

/** exampleAVLSize */
// const tree = makeExampleAVL();
// console.log(7 == tree.getSize());
// console.log(!tree.isEmpty());

/** update */
// const tree = makeExampleAVL();
// tree.update("1", 3);
// console.log(3 == tree.get("1"));

/** contains */
// const tree = makeExampleAVL();
// console.log(true == tree.contains("1"));
// console.log(false == tree.contains("10"));

/** remove */
// const tree = makeExampleAVL();
// tree.remove("6");
// console.log(false == tree.contains("6"));
// tree.displayTree();

/** getKeys */
// const tree = makeExampleAVL();
// const realKeys = tree.getKeys(0);
// const expectedKeys = ["6", "2", "1", "4", "3", "7", "9"];
// console.log(expectedKeys.length == realKeys.length);
// for(let i = 0; i < expectedKeys.length; i++){
//   console.log(expectedKeys[i] == realKeys[i]);
// }

/** getItems */
// const tree = makeExampleAVL();
// const realItems = tree.getItems(0);
// const expectedItems = [["6", 6], ["2", 2], ["1", 1], ["4", 4], ["3", 3], ["7", 7], ["9", 9]];
// console.log(expectedItems.length == realItems.length);
// for(let i = 0; i < expectedItems.length; i++){
//   console.log(expectedItems[i][0] == realItems[i][0] && expectedItems[i][1] == realItems[i][1]);
// }

/** ExamplePreOrderTraversal */
// const tree = makeExampleAVL();
// const realTraversal = tree.getKeys(0);
// const expectedTraversal = ["6", "2", "1", "4", "3", "7", "9"];
// console.log(expectedTraversal.length == realTraversal.length);
// for(let i = 0; i < expectedTraversal.length; i++){
//   console.log(expectedTraversal[i] == realTraversal[i]);
// }

/** ExamplePostOrderTraversal */
// const tree = makeExampleAVL();
// const realTraversal = tree.getKeys(1);
// const expectedTraversal = ["1", "3", "4", "2", "9", "7", "6"];
// console.log(expectedTraversal.length == realTraversal.length);
// for(let i = 0; i < expectedTraversal.length; i++){
//   console.log(expectedTraversal[i] == realTraversal[i]);
// }

/** ExampleInOrderTraversal */
// const tree = makeExampleAVL();
// const realTraversal = tree.getKeys(2);
// const expectedTraversal = ["1", "2", "3", "4", "6", "7", "9"];
// console.log(expectedTraversal.length == realTraversal.length);
// for(let i = 0; i < expectedTraversal.length; i++){
//   console.log(expectedTraversal[i] == realTraversal[i]);
// }

/** ExampleLevelOrderTraversal */
// const tree = makeExampleAVL();
// const realTraversal = tree.getKeys(3);
// const expectedTraversal = ["6", "2", "7", "1", "4", "9", "3"];
// console.log(expectedTraversal.length == realTraversal.length);
// for(let i = 0; i < expectedTraversal.length; i++){
//   console.log(expectedTraversal[i] == realTraversal[i]);
// }
