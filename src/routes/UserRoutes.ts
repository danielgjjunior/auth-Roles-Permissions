// src/routes/UserRoutes.ts
import express from 'express';
import UserController from '../controllers/UserController';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
});

router.get('/', UserController.getAllUsers);
router.put('/:userId', UserController.editUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/uploadUserPhoto/:userId', upload.single('photo'), UserController.uploadUserPhoto);
router.delete('/deleteUserPhoto/:userId', UserController.deleteUserPhoto);
router.get('/getPhotoIdByUserID/:userId', UserController.getPhotoIdByUserID);


export default router;
