// src/controllers/RolePermissionController.ts

import { Request, Response } from 'express';
import * as RolePermissionService from '../services/RolePermissionService';

export const createRolePermission = async (req: Request, res: Response) => {
  try {
    const rolePermissionData = req.body;
    const createdRolePermission = await RolePermissionService.createRolePermission(rolePermissionData);
    return res.status(201).json(createdRolePermission);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllRolePermissions = async (req: Request, res: Response) => {
  try {
    const allRolePermissions = await RolePermissionService.getAllRolePermissions();
    return res.status(200).json(allRolePermissions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateRolePermission = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    const updatedRolePermission = await RolePermissionService.updateRolePermission(roleId, req.body);
    return res.status(200).json(updatedRolePermission);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteRolePermission = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    await RolePermissionService.deleteRolePermission(roleId);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPermissionsByRoleId = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.roleId, 10);

    if (isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    const permissions = await RolePermissionService.getPermissionsByRoleId(roleId);

    return res.status(200).json(permissions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};