//Problem 1
const employees = [
    { firstName: 'Sam', department: 'Tech', designation: 'Manager', salary: 40000, raiseEligible: true },
    { firstName: 'Mary', department: 'Finance', designation: 'Trainee', salary: 18500, raiseEligible: true },
    { firstName: 'Bill', department: 'HR', designation: 'Executive', salary: 21200, raiseEligible: false }
];

console.log('Problem 1 - Employees:', employees);

//Problem 2
const company = {
    companyName: 'Tech Stars',
    website: 'www.techstars.site',
    employees: employees
};

console.log('Problem 2 - Company:', company);

//Problem 3
const newEmployee = { firstName: 'Anna', department: 'Tech', designation: 'Executive', salary: 25600, raiseEligible: false };
company.employees.push(newEmployee);

console.log('Problem 3 - Updated Company:', company);

//Problem 4
let totalSalary = 0;

for (let i = 0; i < employees.length; i++) {
    totalSalary += employees[i].salary;
}

console.log('Problem 4 - Total Salary for all company employees:', totalSalary);

//Problem 5
function giveRaiseAndUpdate(employee) {
    if (employee.raiseEligible) {
        employee.salary *= 1.1;
        employee.raiseEligible = false;
    }
}

company.employees.forEach(giveRaiseAndUpdate);
console.log('Problem 5 - Company after giving raises:', company);

//Problem 6
const workingFromHome = ['Anna', 'Sam'];
company.employees.forEach(employee => {
    employee.wfh = workingFromHome.includes(employee.firstName);
});

console.log('Problem 6 - Company after updating WFH status:', company);