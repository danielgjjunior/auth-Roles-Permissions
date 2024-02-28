// src/services/PermissionModuleService.ts

import { PrismaClient, Permission_Module } from '@prisma/client';

const prisma = new PrismaClient();

export const createPermissionModule = async (moduleData: Permission_Module) => {
  return prisma.permission_Module.create({ data: moduleData });
};

export const getPermissionModules = async () => {
  return prisma.permission_Module.findMany();
};

export const getPermissionModuleById = async (moduleId: number) => {
  return prisma.permission_Module.findUnique({ where: { id: moduleId } });
};

export const updatePermissionModule = async (moduleId: number, updatedData: Permission_Module) => {
  return prisma.permission_Module.update({ where: { id: moduleId }, data: updatedData });
};

export const deletePermissionModule = async (moduleId: number) => {
  return prisma.permission_Module.delete({ where: { id: moduleId } });
};

export const getPermissionsByModuleId = async (moduleId: number) => {
  return prisma.permission_Module.findUnique({
    where: { id: moduleId },
    include: { permissions: true },
  });
};

export const getAllModulesWithPermissions = async () => {
  return prisma.permission_Module.findMany({
    include: {
      permissions: true,
    },
  });
};