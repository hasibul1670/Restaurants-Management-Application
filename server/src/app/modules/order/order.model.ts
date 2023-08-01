import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const menuItemSchema = new Schema<IOrder>({
  id: {
    type: String,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const OrderSchema = new Schema(
  {
    tableNo: { type: String },
    orderId: { type: String },
    items: [menuItemSchema],
    status: { type: String, enum: ['served', 'preparing', 'completed'] },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
