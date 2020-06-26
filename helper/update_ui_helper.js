exports.update_value_id = function(id, value) {
  document.getElementById(id).value = value;
}

exports.append_value_id = function(id, value) {
  document.getElementById(id).value += value;
}

exports.update_view_id = function(id, value) {
  document.getElementById(id).innerText = value;
}

exports.update_background_id = function (id, color) {
  document.getElementById(id).style.background = color;
}