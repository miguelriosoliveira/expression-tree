const assert = require('assert');

function Node(operator, value, left, right) {
  function result() {
    const switcher = new Proxy(
      {
        '+': () => left.result() + right.result(),
        '-': () => left.result() - right.result(),
        x: () => left.result() * right.result(),
        '÷': () => left.result() / right.result(),
      },
      {
        get: (target, key) => target[key] || (() => value),
      },
    );

    return switcher[operator]();
  }

  function toString() {
    const validOperators = ['+', '-', 'x', '÷'];
    return validOperators.includes(operator)
      ? `(${left.toString()} ${operator} ${right.toString()})`
      : value.toString();
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
