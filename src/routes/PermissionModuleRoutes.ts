// src/routes/permissionModuleRoutes.ts

import express from 'express';
import * as PermissionModuleController from '../controllers/PermissionModuleController';

const router = express.Router();

router.post('/', PermissionModuleController.createPermissionModule);
router.get('/', PermissionModuleController.getPermissionModules);
router.get('/with-permissions', PermissionModuleController.getAllModulesWithPermissions);
router.get('/:id', PermissionModuleController.getPermissionModuleById);
router.put('/:id', PermissionModuleController.updatePermissionModule);
router.delete('/:id', PermissionModuleController.deletePermissionModule);
router.get('/permissions/:id', PermissionModuleController.getPermissionsByModuleId);



export default router;
