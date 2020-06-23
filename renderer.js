var shell = require('./helper/shell_helper');

shell.exec('cat ~/Projects/portfolio_QA_deploy/bash_script/current_branch.sh |  ssh -T -i ~/Downloads/key/scp_nopass ta.duy.anh@10.0.1.8')

const { ipcRenderer } = require('electron')

ipcRenderer.on('executed-reply', (event, arg) => {
  console.log('ddd')
  console.log(arg)
  update_current_branch(arg.result.data)
})

function update_current_branch(branch_name) {
  document.getElementById('current_branch').innerHTML = branch_name;
}

var deploy_type_element = document.getElementById("deploy_type");

deploy_type_element.addEventListener("change", function() {
  console.log(deploy_type_element.value)
});
