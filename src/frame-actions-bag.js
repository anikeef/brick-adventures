export function FrameActionsBag() {
  let actions = {};

  function add(name, callback) {
    actions[name] = callback;
  }

  function remove(name) {
    delete actions[name];
  }

  function executeAll() {
    for (let name in actions) {
      actions[name]();
    }
  }

  function clear() {
    actions = {};
  }

  return { add, remove, executeAll, clear };
}