// src/services/UserRoleService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserRole = async (userRoleData: any) => {
  return prisma.user_Role.create({ data: userRoleData });
};

export const getAllUserRoles = async () => {
  return prisma.user_Role.findMany();
};

export const updateUserRole = async (id: number, updatedData: any) => {
  return prisma.user_Role.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteUserRole = async (id: number) => {
  return prisma.user_Role.delete({
    where: { id },
  });
};


export const getAllRolesByUserId = async (userId: number) => {
    return prisma.user_Role.findMany({
      where: { user_id: userId },
      include: {
        role: true,
      },
    });
  };