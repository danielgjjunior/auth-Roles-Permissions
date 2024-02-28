
import { Request, Response } from 'express';
import * as PermissionService from '../services/PermissionService';

export const createPermission = async (req: Request, res: Response) => {
  try {
    const permissionData = req.body;
    const permission = await PermissionService.createPermission(permissionData);
    return res.status(201).json(permission);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
};

export const getAllPermissions = async (req: Request, res: Response) => {
    try {
      const permissions = await PermissionService.getAllPermissions();
      return res.status(200).json(permissions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getPermissionById = async (req: Request, res: Response) => {
    try {
      const permissionId = parseInt(req.params.id, 10);
      const permission = await PermissionService.getPermissionById(permissionId);
  
      if (!permission) {
        return res.status(404).json({ error: 'Permission not found' });
      }
  
      return res.status(200).json(permission);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const updatePermission = async (req: Request, res: Response) => {
    try {
      const permissionId = parseInt(req.params.id, 10);
      const updatedPermission = await PermissionService.updatePermission(permissionId, req.body);
      return res.status(200).json(updatedPermission);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const deletePermission = async (req: Request, res: Response) => {
    try {
      const permissionId = parseInt(req.params.id, 10);
      await PermissionService.deletePermission(permissionId);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
