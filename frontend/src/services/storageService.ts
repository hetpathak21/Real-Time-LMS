const TOKEN_KEY = "lms_token";
const USER_KEY = "lms_user";

/* -------------------------------------------------------------------------- */
/*                                   TOKEN                                    */
/* -------------------------------------------------------------------------- */

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/* -------------------------------------------------------------------------- */
/*                                   USER                                     */
/* -------------------------------------------------------------------------- */

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
}

export const setUser = (user: StoredUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): StoredUser | null => {
  const data = localStorage.getItem(USER_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as StoredUser;
  } catch {
    return null;
  }
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

/* -------------------------------------------------------------------------- */
/*                                CLEAR ALL                                   */
/* -------------------------------------------------------------------------- */

export const clearStorage = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};