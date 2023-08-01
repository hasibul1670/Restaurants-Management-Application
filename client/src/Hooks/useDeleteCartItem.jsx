import { useQuery } from "@tanstack/react-query";

const useDeleteCartItem = (id) => {
  const {
    data: cart = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(
     `https://summer-camp-school-server-sigma.vercel.app/api/v1/courses/cart/${id}`
      );
      return res.json();
    },
  });



  return [cart, loading, refetch];
};

export default useDeleteCartItem;
