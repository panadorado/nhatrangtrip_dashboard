var wifi = $("input[name='wifi']");
var ship = $("input[name='ship']");
var fans = $("input[name='fans']");
var fparking = $("input[name='fparking']");
var groups = $("input[name='groups']");
var enableOther = $("input[name='enableOther']");

(function () {
  function parseBool(value) {
    if (['true', true, 1, '1', 'yes'].includes(value)) {
      return true;
    }

    ['false', false, 0, '0', 'no'].includes(value);
    return false;
  }

  function changeTypeName(value) {
    value.prop('type', 'checkbox');
    value.prop('checked', parseBool(value.val()));
    return value;
  }
  changeTypeName(wifi);
  changeTypeName(ship);
  changeTypeName(fans);
  changeTypeName(fparking);
  changeTypeName(groups);
  changeTypeName(enableOther);
})();
