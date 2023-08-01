import express from 'express';

import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CartRoutes } from '../modules/cart/cart.routes';
import { InstructorRoutes } from '../modules/instructor/instructor.route';
import { OrderRoutes } from '../modules/order/order.routes';
import { StudentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/instructors',
    route: InstructorRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
];

moduleRoutes.forEach(r => router.use(r.path, r.route));

export default router;
