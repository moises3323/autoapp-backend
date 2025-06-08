const fileCategory = {
  FORMS: 1,
  COMPLEMENTARY: 2,
  APPLICATION: 3,
};

const contextType = {
  SYSTEM: 1,
  SCHOOL: 2,
  CAMPUS: 3,
  SCHOOL_MAINTAINER: 4,
};

const applicationStatus = {
  LEAD: 1,
  CONTACTED: 2,
  APPLIED: 3,
  DENIED: 4,
  OFFERED: 5,
  WAITING_LIST: 6,
  CONFIRMED: 7,
  DECLINED: 8,
  ENROLLED: 9,
};

const _idsStatus = {
  lead: 1,
  contacted: 2,
  applied: 3,
  denied: 4,
  offered: 5,
  waitingList: 6,
  confirmed: 7,
  declined: 8,
  enrolled: 9,
};

const _namesStatus = {
  lead: "Lead",
  contacted: "Contacted",
  applied: "Applied",
  denied: "Denied",
  offered: "Offered",
  waitingList: "Waiting List",
  confirmed: "Confirmed",
  declined: "Declined",
  enrolled: "Enrolled",
  //just for backend use
  selectedList: "Selected List",
};

const _nameStatusById = {
  1: "Lead",
  2: "Contacted",
  3: "Applied",
  4: "Denied",
  5: "Offered",
  6: "Waiting List",
  7: "Confirmed",
  8: "Declined",
  9: "Enrolled",
};

const rols = {
  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
  ADMINISTRATOR: "Administrator",
  SCHOOL_USER: "School user",
  CAMPUS_USER: "Campus user",
};

const formType = {
  TYPEFORM: 1,
  GOOGLE_FORMS: 2,
};

const emailType = {
  STATUS_CHANGE: 1,
  REMINDER: 2,
  MANUALLY_SENT: 3,
};

module.exports = {
  fileCategory,
  contextType,
  applicationStatus,
  _idsStatus,
  _namesStatus,
  _nameStatusById,
  rols,
  formType,
  emailType,
};
