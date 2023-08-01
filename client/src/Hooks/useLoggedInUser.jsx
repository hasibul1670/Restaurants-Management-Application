import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useLoggedInUser = () => {
  const { user } = useAuth();
  const email = user?.email;

  const { data: loggedInUser = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        `https://summer-camp-school-server-sigma.vercel.app/api/v1/students/${email}`
      );
      const data = await response.json();
      return data;
    },
  });

  return [loggedInUser, refetch];
};

export default useLoggedInUser;
