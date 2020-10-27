/* Your Code Here */
function createEmployeeRecord(empData){
    return {
        firstName: empData[0],
        familyName: empData[1],
        title: empData[2],
        payPerHour: empData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(empsData){
    return empsData.map(eData=> createEmployeeRecord(eData));
}

function createTimeInEvent(dateStamp){
    let date, time;
    [date, time] = dateStamp.split(" "); //without this semicolon stuff doesn't work oddly enough
    const clockInTime = this.timeInEvents;
    clockInTime.push({
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    });
    return this;
}
function createTimeOutEvent(dateStamp){
    let date, time;
    [date, time] = dateStamp.split(" "); //without this semicolon stuff doesn't work oddly enough
    const clockOutTime = this.timeOutEvents;
    clockOutTime.push({
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(reqDateStamp){
    let inEvent = this.timeInEvents.find(clockIn => clockIn.date === reqDateStamp);
    let outEvent = this.timeOutEvents.find(clockOut => clockOut.date === reqDateStamp);
    return Math.abs(inEvent.hour - outEvent.hour)/100;
}

function wagesEarnedOnDate(dateStamp){
    return parseFloat(this.payPerHour * hoursWorkedOnDate.call(this, dateStamp));
}

function findEmployeeByFirstName(fname){
    this.find(eData => eData.firstName===fname);
}

function calculatePayroll(){
    const eligibleDates = this.timeInEvents.map(obj => obj.date);

    let payable = eligibleDates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);

    return payable;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}