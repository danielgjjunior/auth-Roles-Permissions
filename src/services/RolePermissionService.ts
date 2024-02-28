
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRolePermission = async (rolePermissionData: any) => {
  return prisma.role_Permission.create({ data: rolePermissionData });
};

export const getAllRolePermissions = async () => {
  return prisma.role_Permission.findMany();
};

export const updateRolePermission = async (id: number, updatedData: any) => {
  return prisma.role_Permission.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteRolePermission = async (id: number) => {
  return prisma.role_Permission.delete({
    where: { id },
  });
};


export const getPermissionsByRoleId = async (roleId: number) => {
    return prisma.role_Permission.findMany({
      where: { role_id: roleId },
      include: {
        permission: true,
      },
    });
  };