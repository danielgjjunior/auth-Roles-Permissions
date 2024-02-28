
import express from 'express';
import * as UserRoleController from '../controllers/UserRoleController';

const router = express.Router();

router.post('/', UserRoleController.createUserRole);
router.get('/', UserRoleController.getAllUserRoles);
router.get('/user/:userId/roles', UserRoleController.getAllRolesByUserId);
router.put('/:id', UserRoleController.updateUserRole);
router.delete('/:id', UserRoleController.deleteUserRole);

export default router;
