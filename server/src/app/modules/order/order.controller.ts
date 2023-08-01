import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import { orderService } from './order.services';

const sendFacultyResponse = (res: Response, message: string, data: any) => {
  sendReponse<IOrder>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...OrderData } = req.body;
  const result = await orderService.createOrder(OrderData);
  sendFacultyResponse(res, 'Order is Created Successfully!', result);
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders();
  sendFacultyResponse(res, 'Orders retrieved successfully !', result);
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await orderService.deleteOrder(id);
  sendFacultyResponse(res, ' Order Deleted successfully !', result);
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await orderService.getSingleOrder(id);
  sendFacultyResponse(res, 'Single Order retrieved successfully !', result);
});
const updateOrder = catchAsync(async (req: Request, res: Response) => {

  const result = await orderService.updateOrder(req.body);
  sendFacultyResponse(res, 'Order Data Is Updated successfully!', result);
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  updateOrder,
};
