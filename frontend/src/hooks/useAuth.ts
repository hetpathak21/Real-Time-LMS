import { useAppSelector } from "../app/hooks";

export const useAuth = () => {
  const {
    user,
    token,
    loading,
    error,
    isAuthenticated,
  } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
  };
};