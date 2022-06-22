const assert = require('assert');

function Node(operator, value, left, right) {
  function result() {
    switch (operator) {
      case '+':
        return left.result() + right.result();
      case '-':
        return left.result() - right.result();
      case 'x':
        return left.result() * right.result();
      case '÷':
        return left.result() / right.result();
      default:
        return value;
    }
  }

  function toString() {
    switch (operator) {
      case '+':
        return `(${left.toString()} + ${right.toString()})`;
      case '-':
        return `(${left.toString()} - ${right.toString()})`;
      case 'x':
        return `(${left.toString()} x ${right.toString()})`;
      case '÷':
        return `(${left.toString()} ÷ ${right.toString()})`;
      default:
        return value.toString();
    }
  }

  return { result, toString };
}

const tree = Node(
  '÷',
  null,
  Node(
    '+',
    null,
    Node('', 7, null, null),
    Node(
      'x',
      null,
      Node('-', null, Node('', 3, null, null), Node('', 2, null, null)),
      Node('', 5, null, null),
    ),
  ),
  Node('', 6, null, null),
);

assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', tree.toString());
assert.strictEqual(2, tree.result());
