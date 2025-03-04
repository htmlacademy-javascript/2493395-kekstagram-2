const checkMeetingTime = (workStartTime, workEndTime, meetingStartTime, meetingDuration) => {

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const meetStart = timeToMinutes(meetingStartTime);
  const meetEnd = timeToMinutes(meetingStartTime) + +meetingDuration;

  return timeToMinutes(workStartTime) <= meetStart && timeToMinutes(workEndTime) >= meetEnd;
}


console.log(checkMeetingTime('8:30', '18:30', '12:00', '60'));
console.log(checkMeetingTime('8:30', '18:30', '12:00', '900'));
console.log(checkMeetingTime('8:30', '18:30', '18:00', '60'));
console.log(checkMeetingTime('8:30', '18:30', '18:00', '30'));
