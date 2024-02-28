// src/routes/rolePermissionRoutes.ts

import express from 'express';
import * as RolePermissionController from '../controllers/RolePermissionController';

const router = express.Router();

router.post('/', RolePermissionController.createRolePermission);
router.get('/', RolePermissionController.getAllRolePermissions);
router.get('/role/:roleId', RolePermissionController.getPermissionsByRoleId);  // Nova rota para buscar permissões por ID de role
router.put('/:id', RolePermissionController.updateRolePermission);
router.delete('/:id', RolePermissionController.deleteRolePermission);

export default router;
