export const token = {
  getAccess() {
    const token = localStorage.getItem("accessToken");
    return token ? token.trim() : null;
  },
  getRefresh: () => localStorage.getItem("refreshToken"),

  setAccess: (t: string) => localStorage.setItem("accessToken", t),
  setRefresh: (t: string) => localStorage.setItem("refreshToken", t),

  clear: () => localStorage.clear(),
};
