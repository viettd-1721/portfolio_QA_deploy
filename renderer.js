var shell = require('./helper/shell_helper');

shell.exec('cat ~/Projects/portfolio_QA_deploy/bash_script/current_branch.sh |  ssh -T -i ~/Downloads/key/scp_nopass ta.duy.anh@10.0.1.8')

const { ipcRenderer } = require('electron')

ipcRenderer.on('executed-reply', (event, arg) => {
  update_current_branch(arg.result.data)
})

function update_current_branch(branch_name) {
  document.getElementById('current_branch').innerHTML = branch_name;
}

var deploy_type_element = document.getElementById("deploy_type");
var deploy_value_element = document.getElementById("deploy_value");
var deploy_type_info_element = document.getElementById("deploy_type_info");
var submit_deploy_element = document.getElementById("submit_deploy");

var deploy_type = deploy_type_element.value
deploy_type_element.addEventListener("change", function() {
  deploy_type = deploy_type_element.value;

  if(deploy_type == 'pr_id') {
    deploy_type_info_element.innerText = 'PR id'
  }
  else{
    deploy_type_info_element.innerText = 'Branch name'
  }
});

var deploy_value = deploy_value_element.value;

deploy_value_element.addEventListener("input", function () {

  deploy_value = deploy_value_element.value;
  if(isBlank(deploy_value)){
    submit_deploy_element.disabled = true;
  }else {
    submit_deploy_element.disabled = false;
  }
})
