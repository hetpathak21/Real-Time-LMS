export const token = {
  getAccess() {
    const token = localStorage.getItem("token");
    return token ? token.trim() : null;
  },
  getRefresh: () => localStorage.getItem("refresh-token"),

  setAccess: (t: string) => localStorage.setItem("token", t),
  setRefresh: (t: string) => localStorage.setItem("refresh-token", t),

  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
  },
};
