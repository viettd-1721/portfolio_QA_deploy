const file_helper = require('../../helper/file_helper')

var submit_password = document.getElementById('submit_password')
var input_password = document.getElementById('input_password')

update_password();

submit_password.addEventListener('click', function () {
  var ssh_data = file_helper.read_json_from_file('./settings/ssh_info.json')
  ssh_data.password = input_password.value;

  file_helper.save_json_to_file('./settings/ssh_info.json', ssh_data)
  update_password();
})

function update_password() {
  input_password.value = file_helper.read_json_from_file('./settings/ssh_info.json').password;
}