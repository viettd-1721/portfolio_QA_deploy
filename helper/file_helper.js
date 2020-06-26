const fs = require('fs');

exports.save_json_to_file = function (path, data) {
  fs.writeFileSync('./settings/ssh_info.json', JSON.stringify(data));
}

exports.read_json_from_file = function (path) {
  const content = fs.readFileSync(path).toString();
  return JSON.parse(content)
}
