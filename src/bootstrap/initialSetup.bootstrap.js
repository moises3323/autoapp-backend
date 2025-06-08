const Models = require("../models");
const { printLog } = require("../shared/helpers");

export const createRoles = async () => {
  const { Role, ContextType } = Models;

  try {
    const rolenames = [
      {
        name: "SuperAdmin",
        id_context_type: 1,
        description: "Super admin rol",
        createdBy: 1,
        updatedBy: 1,
      },
      {
        name: "Admin",
        id_context_type: 1,
        description: "Admin rol",
        createdBy: 1,
        updatedBy: 1,
      },
      {
        name: "School User",
        description: "Rol for school administration.",
        id_context_type: 2,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        name: "Campus User",
        description: "Rol for campus administration",
        id_context_type: 3,
        createdBy: 1,
        updatedBy: 1,
      },
    ];
    const ContextTypes = [
      { name: "System", createdBy: 1, updatedBy: 1 },
      { name: "School", createdBy: 1, updatedBy: 1 },
      { name: "Campus", createdBy: 1, updatedBy: 1 }
    ];
    await Promise.all(
      ContextTypes.map((contextType) =>
        ContextType.findOrCreate({
          where: { name: contextType.name },
          defaults: contextType,
        })
      )
    );
    await Promise.all(
      rolenames.map((role) =>
        Role.findOrCreate({ where: { name: role.name }, defaults: role })
      )
    );
    printLog.info("Inital setup");
  } catch (error) {
    printLog.error(`Create Roles error ${error}`);
  }
};
