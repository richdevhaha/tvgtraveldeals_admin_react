const sessionKey = "tvg-admin-session";
const permissionsKey = "tvg-admin-permissions";

export const setAuthToken = (token: string): void => {
  localStorage.setItem(sessionKey, token);
};

export const getAuthToken = (): string => localStorage.getItem(sessionKey) || "";

export const removeAuthToken = (): void => {
  localStorage.removeItem(sessionKey);
};

export const setPermissions = (permissions: string[]): void => {
  localStorage.setItem(permissionsKey, permissions.join(","));
};

export const getPermissoins = (): string[] => {
  const stringPermissions = localStorage.getItem(permissionsKey);
  return stringPermissions ? stringPermissions.split(",") : [];
};

export const remotePermissions = (): void => {
  localStorage.removeItem(permissionsKey);
};
