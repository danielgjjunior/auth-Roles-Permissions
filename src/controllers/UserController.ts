// src/controllers/UserController.ts
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import * as UserRoleService from '../services/UserRoleService';
import * as RolePermissionService from '../services/RolePermissionService';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';


const UserController = {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async editUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId, 10);
      const { name, shortName, email, active, admin } = req.body;

      const updatedUser = await UserService.editUser(userId, { name, shortName, email, active, admin });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, shortName, email, password, active, admin } = req.body;
      const user = await UserService.createUser({ name, shortName, email, password, active, admin });
      const token = await UserService.generateToken(user.id); // Gera token ao registrar
      res.status(201).json({ user, token });
    } catch (error: any) {
      console.error(error);
  
      if (error.status && error.error) {
        res.status(error.status).json({ error: error.error });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },

  // UserController
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await UserService.authenticateUser(email, password);
  
      if (user) {
        const token = await UserService.generateToken(user.id);
        const userRoles = await UserRoleService.getAllRolesByUserId(user.id);
  
        // Mapeia os roles para obter as permissões
        const rolesWithPermissions = await Promise.all(
          userRoles.map(async (userRole) => {
            const permissions = await RolePermissionService.getPermissionsByRoleId(userRole.role_id);
            return { ...userRole.role, permissions };
          })
        );
  
        // Cria o objeto de resposta combinando as informações do usuário e roles simplificados
        const responseObj = {
          id: user.id,
          name: user.name,
          shortName: user.shortName,
          email: user.email,
          password: user.password,
          photoId:user.photoId,
          active: user.active,
          admin: user.admin,
          created_at: user.created_at,
          updated_at: user.updated_at,
          roles: rolesWithPermissions,
          token,
        };
  
        // Retorna o objeto de resposta junto com o token
        res.status(200).json(responseObj);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async uploadUserPhoto(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const userPhoto = req.file; // Use `req.file` para acessar o arquivo

      console.log(req.params); // Verifique os parâmetros de rota
      console.log(req.body);   // Verifique os dados do corpo da requisição
      console.log(req.file);   // Verifique os arquivos enviados

      if (!userId || !userPhoto) {
        res.status(400).json({ error: 'Missing user ID or photo in the request' });
        return;
      }

      // Verificar se o usuário existe
      const existingUser = await UserService.getUserById(parseInt(userId, 10));

      if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Se o usuário já tiver uma foto, excluir a foto antiga
      if (existingUser.photoId) {
        const oldPhotoPath = path.join(__dirname, '../../uploads', existingUser.photoId);
        await fs.unlink(oldPhotoPath);
      }

      // Preservar a extensão original da imagem
      const fileExtension = path.extname(userPhoto.originalname);
      const photoId = uuidv4() + fileExtension;
      const newPhotoPath = path.join(__dirname, '../../uploads', photoId);

      // Use o método fs.writeFile para gravar o conteúdo do arquivo
      await fs.writeFile(newPhotoPath, userPhoto?.buffer || Buffer.from(''), 'binary');

      // Atualizar o ID da foto no banco de dados
      await UserService.updateUserPhotoId(parseInt(userId, 10), photoId);

      res.status(200).json({ message: 'Photo uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteUserPhoto(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      if (!userId) {
        res.status(400).json({ error: 'Missing user ID in the request' });
        return;
      }

      // Verificar se o usuário existe
      const existingUser = await UserService.getUserById(parseInt(userId, 10));

      if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Se o usuário tiver uma foto, excluir a foto
      if (existingUser.photoId) {
        const photoPath = path.join(__dirname, '../../uploads', `${existingUser.photoId}`);
        
        // Excluir a foto do diretório
        await fs.unlink(photoPath);

        // Atualizar o ID da foto no banco de dados para null
        await UserService.updateUserPhotoId(parseInt(userId, 10), null);

        res.status(200).json({ message: 'Photo deleted successfully' });
      } else {
        res.status(404).json({ error: 'User does not have a photo' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getPhotoIdByUserID(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
  
      // Verificar se o usuário existe
      const existingUser = await UserService.getUserById(parseInt(userId, 10));
  
      if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      // Retornar o ID da foto, se existir
      const photoId = existingUser.photoId || null;
  
      res.status(200).json({ photoId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
