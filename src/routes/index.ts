// src/routes/index.ts
import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import userRoutes from './UserRoutes';
import permissionRoutes from './PermissionRoutes';
import permissionModuleRoutes from './PermissionModuleRoutes';
import roleRoutes from './RoleRoutes';
import rolePermissionRoutes from './RolePermissionRoutes';
import userRoleRoutes from './UserRoleRoutes'

const router = express.Router();

// Rotas públicas (fora do middleware de autenticação)
router.use('/user', userRoutes);
router.use('/permission', permissionRoutes);
router.use('/permissionModule', permissionModuleRoutes);
router.use(authMiddleware as any);
router.use('/role', roleRoutes);
router.use('/rolePermission', rolePermissionRoutes);

router.use('/userRole',userRoleRoutes)


// Middleware de autenticação global


// Rotas protegidas pelo middleware de autenticação

export default router;
