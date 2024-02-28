// src/controllers/PermissionModuleController.ts

import { Request, Response } from 'express';
import * as PermissionModuleService from '../services/PermissionModuleService';

export const createPermissionModule = async (req: Request, res: Response) => {
  try {
    const moduleData = req.body;
    const module = await PermissionModuleService.createPermissionModule(moduleData);
    return res.status(201).json(module);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPermissionModules = async (req: Request, res: Response) => {
  try {
    const modules = await PermissionModuleService.getPermissionModules();
    return res.status(200).json(modules);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPermissionModuleById = async (req: Request, res: Response) => {
  try {
    const moduleId = parseInt(req.params.id, 10);
    const module = await PermissionModuleService.getPermissionModuleById(moduleId);

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    return res.status(200).json(module);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePermissionModule = async (req: Request, res: Response) => {
  try {
    const moduleId = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const updatedModule = await PermissionModuleService.updatePermissionModule(moduleId, updatedData);

    if (!updatedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    return res.status(200).json(updatedModule);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePermissionModule = async (req: Request, res: Response) => {
  try {
    const moduleId = parseInt(req.params.id, 10);
    const deletedModule = await PermissionModuleService.deletePermissionModule(moduleId);

    if (!deletedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getPermissionsByModuleId = async (req: Request, res: Response) => {
    try {
      const moduleId = parseInt(req.params.id, 10);
      const moduleWithPermissions = await PermissionModuleService.getPermissionsByModuleId(moduleId);
  
      if (!moduleWithPermissions) {
        return res.status(404).json({ error: 'Module not found' });
      }
  
      return res.status(200).json(moduleWithPermissions.permissions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getAllModulesWithPermissions = async (req: Request, res: Response) => {
    try {
      const modulesWithPermissions = await PermissionModuleService.getAllModulesWithPermissions();
      return res.status(200).json(modulesWithPermissions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };