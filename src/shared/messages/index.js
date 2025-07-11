const ERROR_TECNICO = "Technical error.";
const NON_EXISTENT_RECORD = "Record not found.";

const AutoMessages = {
  success: {
    CREATE: "Auto creado.",
    UPDATE: "Auto actualizado.",
    DELETE: "Auto eliminado.",
    GET_ALL: "Todas los Autos",
    GET_ONE: "Los Auto",
  },
  error: {
    CREATE: "Error al crear el Auto",
    GET: "Error al obtener el Auto",
    GET_ALL: "Error al obtener el Auto",
    UPDATE: "Error al actualizar el Auto",
    DELETE: "Error al eliminar el Auto",
  },
};

module.exports = {
  ERROR_TECNICO,
  NON_EXISTENT_RECORD,
  AutoMessages,
};
