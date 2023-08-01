/* eslint-disable array-callback-return */

import { useState } from "react";
import { toast } from "react-hot-toast";
import useOrders from "../../Hooks/useOrder";

const PendingOrder = () => {
  const email = localStorage.getItem("email");
  const [order, loading, refetch] = useOrders();
  const orderArray = order?.data;
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = async (status, id) => {
    try {
      const patchData = {
        id: id,
        status: status,
      };
      const response = await fetch("http://localhost:4000/api/v1/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setSelectedStatus(status);
      console.log("Status updated successfully:", status);
      toast.success("Order Status Updated");
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredData = orderArray?.filter(
    (order) => order.status === "preparing"
  );
  let formattedDate;

  const formattedData = filteredData?.map((order) => {
    const originalDateString = order.date;
    const originalDate = new Date(originalDateString);
    formattedDate = originalDate.toISOString().slice(0, 10);
  });

  const calculateTotal = (items) => {
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
    }
    return total;
  };

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
                      <div className="dropdown">
                        <label
                          tabIndex={0}
                          className="btn capitalize btn-info btn-xs m-1"
                        >
                          Change Status
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 mr-5  shadow bg-base-100 rounded-box w-32"
                        >
                          <li>
                            <button
                              onClick={() =>
                                handleStatusChange("served", order._id)
                              }
                            >
                              Served
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleStatusChange("completed", order._id)
                              }
                            >
                              Completed
                            </button>
                          </li>
                        </ul>
                      </div>
                      
                    </div>

                    <p className="text-xs text-cyan-700 font-semibold">
                      {order.items.map((item) => (
                        <div className="p-1 border-dotted  border-2 border-sky-500 m-2">
                          Name: {item.name} <br />
                          Quantity: {item.quantity} <br />
                          Price : {item.price} <br />
                        </div>
                      ))}
                    </p>
                    <div className="flex justify-between">
                      <p className="font-semibold text-sm text-blue-700 ">
                        Table No : {order?.tableNo}
                      </p>
                      <p className="font-semibold text-sm text-blue-700 ">
                        Total Price: {calculateTotal(order.items)}
                      </p>
                    </div>

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

export default PendingOrder;
