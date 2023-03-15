const isTeacher = "isTeacher";
const isStudent = "isStudent";
const isAdministrator = "isAdministrator";
const isParent = "isParent";

const announcementPermissions = ["Announcement: Create", "Announcement: Read"];

const adminPermissions = ["Admin: Create", "Admin: Read"];
const assessmentPermissions = ["Assessment: Create", "Assessment: Read"];
const assignmentPermissions = ["Assignment: Create", "Assignment: Read"];
const lessonPermissions = ["Lesson: Create", "Lesson: Read"];
const parentPermissions = ["Parent: Create", "Parent: Read"];
const studentPermissions = ["Student: Create", "Student: Read"];
const teacherPermissions = ["Teacher: Create", "Teacher: Read"];
const subjectPermissions = ["Subject: Create", "Subject: Read"];
const unitPermissions = ["Unit: Create", "Unit: Read"];

const otherPermissions = [
  ...announcementPermissions,
  ...assessmentPermissions,
  ...assignmentPermissions,
  ...lessonPermissions,
  ...parentPermissions,
  ...studentPermissions,
  ...teacherPermissions,
  ...subjectPermissions,
  ...unitPermissions,
];

const userPermissions = [isTeacher, isStudent, isAdministrator, isParent];

const permitTeacher = [...lessonPermissions, isTeacher];
const permitStudent = [isStudent];

const permitStudentTeacher = [...permitStudent, ...permitTeacher];

const permitAdministrator = [
  // ...adminPermissions,
  // ...otherPermissions,
  isAdministrator,
];

const permitUser = [...userPermissions, ...otherPermissions];

module.exports = {
  permitAdministrator,
  permitUser,
  permitTeacher,
  permitStudent,
  permitStudentTeacher,
};
