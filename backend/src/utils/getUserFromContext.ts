export const getUserFromContext = (context): { id: string | number; email: string } =>
  context.state.auth?.credentials || {};
