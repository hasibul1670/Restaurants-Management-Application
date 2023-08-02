import { generateOrderId } from '../../../helpers/generateId';
import { IOrder } from './order.interface';
import { Order } from './order.model';
const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const OrderId = await generateOrderId();
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();

  const orderPayload: IOrder = {
    ...payload,
    orderId: OrderId,
    date: currentDate,
    time: currentTime,
  };
  const result = await Order.create(orderPayload);

  return result;
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};
const getSingleOrder = async (id: string) => {
  const result = await Order.find({ id: id });

  return result;
};

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};
const updateOrder = async (
  payload: Partial<IOrder>
): Promise<IOrder | null> => {
  const { id } = payload;
  const result = await Order.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const orderService = {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
};
