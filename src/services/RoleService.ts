
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRole = async (roleData: any) => {
  return prisma.role.create({ data: roleData });
};

export const getAllRoles = async () => {
  return prisma.role.findMany();
};

export const getRoleById = async (roleId: number) => {
  return prisma.role.findUnique({ where: { id: roleId } });
};

export const updateRole = async (roleId: number, updatedData: any) => {
  return prisma.role.update({
    where: { id: roleId },
    data: updatedData,
  });
};

export const deleteRole = async (roleId: number) => {
  return prisma.role.delete({ where: { id: roleId } });
};
