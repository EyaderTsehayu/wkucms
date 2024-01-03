export const ROLES = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  STAFF: "STAFF",
  HEAD: "HEAD", // Additional privilege for some staff
  OFFICER:"OFFICER"
};

export const STUDENTSTEPS=["HEAD", "COLLEGEDEAN", "DORMITARY","APPROVED"];
export const STAFFSTEPS=["HR", "BOOKCERCULATION", "FINANCE","APPROVED"];
export const CollegeData = [
  { id: "1", name: "College of Computing and Informatics" },
  { id: "2", name: "Engineering" },
  { id: "3", name: "Social sciences and Humanities" },
  { id: "4", name: "College of behavioral science" },
];

export const DepartmentData = [
  { id: "1", name: "Software Engineering" },
  { id: "2", name: "English" },
  { id: "3", name: "Psychology" },
  { id: "4", name: "Nursing" },
];

//for privilege
export const privilegeData = [
  { id: "1", name: "DEAN" },
  { id: "2", name: "HEAD" },
  { id: "3", name: "LIBRARIAN" },
  { id: "4", name: "CAFTERIA" },
  { id: "5", name: "HR" },
];