const format = ({ traceId, name, data, total, dtoFunction, msg }) => {
  if (typeof dtoFunction === "function") {
    data = dtoFunction(data);
  }
  return {
    trace: { traceId, name },
    payload: { data, total },
    message: msg
  };
};

module.exports = {
  format,
};
