import { useQuery } from "@tanstack/react-query";

const useOrders = () => {
  const {
    data: order = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await fetch(
        "https://resturent-management-app.vercel.app/api/v1/orders"
      );
      return res.json();
    },
  });

  return [order, loading, refetch];
};

export default useOrders;
