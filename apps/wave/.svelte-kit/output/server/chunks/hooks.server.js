function handleError({ error, event }) {
  return {
    message: "Whoops!",
    code: error?.code ?? "UNKNOWN"
  };
}
export {
  handleError
};
