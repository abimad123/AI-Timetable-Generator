// src/services/geneticEngine.js
const isSlotAvailable = (schedule, day, time, room, teacher) => {
  return !schedule.some(slot => 
    slot.day === day && 
    slot.time === time && 
    (slot.room === room || slot.teacher === teacher)
  );
};

export const generateTimetable = (teachers, rooms, subjects) => {
  const schedule = [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM"
  ];

  const subjectTeacherMap = {};
  subjects.forEach((subject) => {
    const teacher = teachers.find(t => t.subject === subject.code);
    subjectTeacherMap[subject.code] = teacher ? teacher.name : "TBD";
  });

  subjects.forEach((subject) => {
    let classesScheduled = 0;
    let attempts = 0;

    const requiredCapacity = subject.studentCount || 30; 

    const validRooms = rooms.filter(r => r.capacity >= requiredCapacity);

    if (validRooms.length === 0) {
      console.warn(`No room large enough for ${subject.name} (${requiredCapacity} students)`);
      return;
    }

    while (classesScheduled < subject.weeklyHours && attempts < 100) {
      const randomDay = days[Math.floor(Math.random() * days.length)];
      const randomTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
      
      const randomRoom = validRooms[Math.floor(Math.random() * validRooms.length)];
      
      const assignedTeacher = subjectTeacherMap[subject.code];

      if (assignedTeacher !== "TBD" && isSlotAvailable(schedule, randomDay, randomTime, randomRoom.name, assignedTeacher)) {
        schedule.push({
          id: schedule.length + 1,
          day: randomDay,
          time: randomTime,
          subject: subject.name,
          teacher: assignedTeacher,
          room: randomRoom.name,
          sortTime: parseInt(randomTime.split(":")[0]) + (randomTime.includes("PM") && !randomTime.startsWith("12") ? 12 : 0)
        });
        classesScheduled++;
      }
      attempts++;
    }
  });

  return schedule;
};