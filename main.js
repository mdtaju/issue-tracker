document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  totalCalculation();
  e.preventDefault();
}
const totalCalculation = () => {
  const issues = JSON.parse(localStorage.getItem('issues'))
  document.getElementById('total_issues').innerText = issues.length;
  const openIssues = issues.filter(issue => issue.status === 'Open');
  document.getElementById("current_issues").innerText = openIssues ? openIssues.length : 0;
}
const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  console.log(currentIssue)
  currentIssue.status = 'Closed';
  const des = currentIssue.description;
  const currentDes = '<s>'+des+'</s>';
  currentIssue.description = currentDes;
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  totalCalculation()
}
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues()
  totalCalculation()
}
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
