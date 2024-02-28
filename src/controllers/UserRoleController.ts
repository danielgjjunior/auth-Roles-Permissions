// src/controllers/UserRoleController.ts

import { Request, Response } from 'express';
import * as UserRoleService from '../services/UserRoleService';

export const createUserRole = async (req: Request, res: Response) => {
  try {
    const userRoleData = req.body;
    const createdUserRole = await UserRoleService.createUserRole(userRoleData);
    return res.status(201).json(createdUserRole);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllUserRoles = async (req: Request, res: Response) => {
  try {
    const allUserRoles = await UserRoleService.getAllUserRoles();
    return res.status(200).json(allUserRoles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userRoleId = parseInt(req.params.id, 10);
    const updatedUserRole = await UserRoleService.updateUserRole(userRoleId, req.body);
    return res.status(200).json(updatedUserRole);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUserRole = async (req: Request, res: Response) => {
  try {
    const userRoleId = parseInt(req.params.id, 10);
    await UserRoleService.deleteUserRole(userRoleId);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllRolesByUserId = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId, 10);
  
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      const roles = await UserRoleService.getAllRolesByUserId(userId);
  
      return res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };