const typeFormToObject = ({ form, fieldsMap }) => {
  const formFields = form.form_response?.definition?.fields || [];
  const formAnswers = form.form_response?.answers || [];

  return formFields.reduce((acc, formField) => {
    if (Object.keys(fieldsMap).includes(formField.title.trim())) {
      const formAnswer = formAnswers.find(
        (answer) => answer.field.id == formField.id
      );
      let obj = {};
      switch (formAnswer.type) {
        case "choice":
          obj = {
            [fieldsMap[formField.title.trim()]]: formAnswer.choice.label,
          };
          break;
        default:
          obj = {
            [fieldsMap[formField.title.trim()]]: formAnswer[formAnswer.type],
          };
          break;
      }

      Object.assign(acc, obj);
    }
    return acc;
  }, {});
};

const googleFormToObject = ({ form, fieldsMap }) => {
  return Object.keys(form).reduce((acc, formFieldKey) => {
    formFieldKey = formFieldKey.trim();
    if (Object.keys(fieldsMap).includes(formFieldKey)) {
      let value = form[formFieldKey];
      if (Array.isArray(form[formFieldKey]) && form[formFieldKey].length) {
        let yesNoAnswers = ["Yes", "No"];
        value = form[formFieldKey][0];
        /* if is yes/no answer convert to boolean value */
        if(yesNoAnswers.includes(value)){
          value = value == "Yes";
        }
      }
      Object.assign(acc, { [fieldsMap[formFieldKey]]: value });
    }
    return acc;
  }, {});
};

const personalInformationFormMap = {
  Priority: "priority_item",
  "First name": "firstName",
  "Last name": "lastName",
  Email: "email",
  "Phone number": "phoneNumber",
  Grade: "grade",
  "Event date": "event_date",
  "Event preference": "event_preference",
};

const contactedFormApplicantMap = {
  "Date of birth": "dateOfBirth",
  Address: "address",
  "Current school": "actualSchool",
  Photo: "photo",
  "Guardian's relation": "guradian_type",
  "Guardian's name": "guardianName",
  "Guardian's phone": "guardianPhoneNumber",
  "Guardian's email": "guardianEmail",
  "Guardian's date of Birth": "guardianDateOfBirth",
  "Guardian's address": "guardianAddress",
  "Guardian's occupation": "guardianOccupation",
};

const contactedFormApplicantionMap = {
  Priority: "priority_item",
  "Application ID": "correlative",
  Grade: "grade",
};

module.exports = {
  typeFormToObject,
  googleFormToObject,
  personalInformationFormMap,
  contactedFormApplicantMap,
  contactedFormApplicantionMap,
};