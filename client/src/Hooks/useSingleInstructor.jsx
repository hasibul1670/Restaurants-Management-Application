import { useQuery } from "@tanstack/react-query";

const useSingleInstructor = (id) => {
  const {
    data: instructor = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await fetch(
     `https://summer-camp-school-server-sigma.vercel.app/api/v1/instructors/${id}`
      );
      return res.json();
    },
  });



  return [instructor, loading, refetch];
};

export default useSingleInstructor;
