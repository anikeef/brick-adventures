export const LocalStorage = (function() {
  function getRecord() {
    return window.localStorage.getItem('record');
  }

  function setRecord(value) {
    window.localStorage.setItem('record', value);
  }

  return { getRecord, setRecord };
})()