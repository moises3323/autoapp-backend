export const creating = () => {
  if (!process.env.USERDATA) return { createdBy: 999999, updatedBy: 999999 };
  const userData = JSON.parse(process.env.USERDATA);
  return {
    createdBy: userData.id_user,
    updatedBy: userData.id_user,
  };
};

export const updating = () => {
  if (!process.env.USERDATA) return { createdBy: 999999, updatedBy: 999999 };
  const userData = JSON.parse(process.env.USERDATA);
  return {
    updatedBy: userData.id_user,
  };
};

export const deleting = () => {
  const dateIso = new Date().toISOString();
  if (!process.env.USERDATA)
    return {
      updatedBy: 999999,
      deletedBy: 999999,
      deletedAt: dateIso.substring(0, 10) + " " + dateIso.substring(11, 19),
      deleted: true,
    };
  const userData = JSON.parse(process.env.USERDATA);
  return {
    updatedBy: userData.id_user,
    deletedBy: userData.id_user,
    deletedAt: dateIso.substring(0, 10) + " " + dateIso.substring(11, 19),
    deleted: true,
  };
};
