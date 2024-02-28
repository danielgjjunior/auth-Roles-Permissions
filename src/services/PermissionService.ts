
import { PrismaClient } from '@prisma/client';
import { PermissionData } from '../types';

const prisma = new PrismaClient();

export const createPermission = async (permissionData: PermissionData) => {
  return prisma.permission.create({ data: permissionData });
};

export const getAllPermissions = async () => {
    return prisma.permission.findMany();
  };

  export const updatePermission = async (id: number, updatedData: any) => {
    return prisma.permission.update({
      where: { id },
      data: updatedData,
    });
  };

  export const getPermissionById = async (id: number) => {
    return prisma.permission.findUnique({
      where: { id },
    });
  };

  export const deletePermission = async (id: number) => {
    return prisma.permission.delete({
      where: { id },
    });
  };


