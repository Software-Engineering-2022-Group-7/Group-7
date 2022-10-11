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

};

AVL.prototype.get = function(key) {
  return this._findInSubtree(this._root, key)
};

AVL.prototype.contains = function(key) {

};

AVL.prototype.remove = function(key) {

};

AVL.prototype.getKeys = function() {

};

AVL.prototype.getItems = function() {

};

AVL.prototype.getHeight = function() {

};

AVL.prototype.getMaxKey = function() {

};

AVL.prototype.getMinKey = function() {

};

AVL.prototype.getHeight = function() {

};

AVL.prototype.traverseInOrder = function() {

};

AVL.prototype.traverseLevelOrder = function() {

};

AVL.prototype.traversePreOrder = function() {

};

AVL.prototype.traversePostOrder = function() {

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

};

AVL.prototype._updateInSubtree = function(currentNode, key, value) {

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

AVL.prototype._getMinInSubtree = function(currentNode) {

};

AVL.prototype._getMaxInSubtree = function(currentNode) {

};

AVL.prototype._buildInOrderTraversal = function() {

};

AVL.prototype._buildLevelOrderTraversal = function() {

};

AVL.prototype._buildPreOrderTraversal = function() {

};

AVL.prototype._buildPostOrderTraversal = function() {

};

AVL.prototype._countNodes = function(currentNode) {
  if(currentNode == null) {
    return 0;
  } else {
    return this._countNodes(currentNode.getLeft()) + this._countNodes(currentNode.getRight()) + 1;
  }
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

// function makeExampleAVL() {
//   const tree = new AVL();
//   tree.insert(6, "6");
//   tree.insert(2, "2");
//   tree.insert(7, "7");
//   tree.insert(1, "1");
//   tree.insert(4, "4");
//   tree.insert(9, "9");
//   tree.insert(3, "3");
//   tree.checkInvariants();
//   return tree;
// }

/** emptyAVL */
// const tree = new AVL();
// size = (tree.getSize() == 0);
// empty = (tree.isEmpty() == true);
// console.log(size && empty);
// console.log(tree.checkInvariants());

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
