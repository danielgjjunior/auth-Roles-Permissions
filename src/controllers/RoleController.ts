// src/controllers/RoleController.ts

import { Request, Response } from 'express';
import * as RoleService from '../services/RoleService';

export const createRole = async (req: Request, res: Response) => {
  try {
    const roleData = req.body;
    const newRole = await RoleService.createRole(roleData);
    return res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await RoleService.getAllRoles();
    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    const role = await RoleService.getRoleById(roleId);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    return res.status(200).json(role);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const updatedRole = await RoleService.updateRole(roleId, updatedData);

    if (!updatedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    return res.status(200).json(updatedRole);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    await RoleService.deleteRole(roleId);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
