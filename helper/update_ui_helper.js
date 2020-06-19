exports.update_data_id = function(id, value) {
  document.getElementById(id).value = value;
}

exports.append_data_id = function(id, value) {
  document.getElementById(id).value += value;
}