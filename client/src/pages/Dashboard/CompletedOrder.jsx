import { toast } from "react-hot-toast";

import { AiFillDelete } from "react-icons/ai";
import useOrders from "../../Hooks/useOrder";

const CompletedOrder = () => {
  const email = localStorage.getItem("email");
  const [order, loading, refetch] = useOrders();
  const orderArray = order?.data;

  const handleCartItemDelete = async (id) => {
    fetch(`https://resturent-management-app.vercel.app/api/v1/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          console.log('Hello',data);
          toast.success("Successfully  Deleted !");
          refetch();
        }
      });
  };

  const filteredData = orderArray?.filter(
    (order) => order.status === "completed"
  );

  let formattedDate;
  const formattedData = filteredData?.map((order) => {
    const originalDateString = order.date;
    const originalDate = new Date(originalDateString);
    formattedDate = originalDate.toISOString().slice(0, 10);
  });

  return (
    <div className="flex flex-col w-full lg:flex-row">
      <div className="grid flex-grow justify-center h-96 card  b  rounded-box place-items-center  overflow-y-auto">
        <div className="container mx-auto w-full">
          <div className="grid  mt-4 md:grid-cols-2 lg:grid-cols-2  gap-5">
            {filteredData &&
              filteredData.map((order) => (
                <div
                  key={order._id}
                  className="bg-white card w-96  rounded-lg p-5 shadow-md"
                >
                  <>
                    <div className="flex justify-between">
                      <p className="mt-1 text-blue-700 text-sm font-semibold">
                        {order?.orderId}
                      </p>
                      <button
                        onClick={() => handleCartItemDelete(order?._id)}
                        className="text-2xl text-red-600 text btn-outline ml-10"
                      >
                        <AiFillDelete />
                      </button>
                    </div>

                    <h1 className="text-xs text-cyan-700 font-semibold">
                      {order.items.map((item) => (
                        <div className="p-1 border-dotted  border-2 border-sky-500 m-2">
                          Name: {item.name} <br />
                          Quantity: {item.quantity} <br />
                          Price : {item.price}
                        </div>
                      ))}
                    </h1>
                    <p className="font-semibold text-sm text-blue-700 ">
                      Table No : {order?.tableNo}
                    </p>
                    <h1 className="font-semibold text-sm text-red-700 ">
                      Status: {order?.status}
                    </h1>
                    <p className="mb-2 text-xs font-semibold text-black">
                      Time & Date: {order?.time} @ {formattedDate}
                    </p>
                  </>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrder;
