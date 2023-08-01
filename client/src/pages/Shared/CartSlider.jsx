/* eslint-disable react/prop-types */

import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

import { toast } from "react-hot-toast";
import { useGetcartQuery } from "../../redux/features/cart/cartApi";

const CartSlider = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };




  const email = localStorage.getItem("email");
  const { data } = useGetcartQuery(email, {
    refetchOnMountOrArgChange: true,
    pollingInterval:6000
  });
  let totalPrice = 0;
  const cartData = data?.data;
  if (cartData?.length > 0) {
    cartData.forEach((f) => {
      totalPrice += f?.course.price;
    });
  }

  const handleCartItemDelete = (id) => {
    fetch(`https://summer-camp-school-server-sigma.vercel.app/api/v1/cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          toast.success("Successfully  Deleted !");
        }
      });
  };


  return (
    <div className="p-2 shadow-xl">
      <button onClick={handleClose} className="text-xl btn-outline">
        <AiOutlineClose />
      </button>
      <h2 className="text-red-500 text-sm">
        Total Courses: {cartData?.length}
      </h2>
      <div className=" mt-4 gap-5">
        <h1 className="font-bold text-cyan-700">
          Total: {totalPrice?.toFixed(2)}
        </h1>
        {cartData &&
          cartData?.map((cart) => (
            <div key={cart._id} className="border-b-2 border-sky-500 p-5">
              <div className="border-r pr-20 shrink-0">
                <img src={cart?.course.bookImage} alt="" className="h-full" />
              </div>
              <p className="text-cyan-700 font-bold "> {cart.course?.title}</p>
              <p className=" font-bold "> price: {cart?.course?.price} $</p>
              
              <button
                onClick={() => handleCartItemDelete(cart?._id)}
                className="text-2xl btn-outline ml-10"
              >
                <AiFillDelete />
              </button>
            </div>
          ))}

        <p className="text-xl font-bold text-blue-600"></p>
      </div>
    </div>
  );
};

export default CartSlider;
