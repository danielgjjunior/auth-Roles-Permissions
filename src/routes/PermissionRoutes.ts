
import express from 'express';
import * as PermissionController from '../controllers/PermissionController';

const router = express.Router();

router.post('/', PermissionController.createPermission);
router.get('/', PermissionController.getAllPermissions);
router.put('/:id', PermissionController.updatePermission);
router.delete('/:id', PermissionController.deletePermission);

export default router;
