import { Model } from 'mongoose';

export type OrderStatus = 'preparing' | 'served' | 'completed';


// Define the interface for the order data
export type IOrder = {
  id: string;
  orderId: string;

  tableNo: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  status: OrderStatus;
  date: Date;
  time: string;
}

export type OrderModel = Model<IOrder>;
