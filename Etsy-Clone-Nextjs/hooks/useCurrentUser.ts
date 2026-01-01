import { useAppStore } from "@/store/store";
import { useEffect } from "react";

export const useCurrentUser = () => {
  const user = useAppStore((state) => state.user);
  const isLoadingUser = useAppStore((state) => state.isLoadingUser);
  const error = useAppStore((state) => state.error);
  const fetchUser = useAppStore((state) => state.fetchUser);
  const logout = useAppStore((state) => state.logout);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    isLoadingUser,
    error,
    fetchUser,
    logout,
  };
};

export default useCurrentUser;
