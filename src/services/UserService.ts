// src/services/UserService.ts
import { PrismaClient, Role, Permission } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CreateUserParams, EditUserParams } from '../types';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';

const UserService = {
  async getAllUsers(): Promise<any> {
    return prisma.user.findMany();
  },

  async editUser(userId: number, data: EditUserParams): Promise<any> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id: userId },
      data: { ...data },
    });
  },

  async createUser(params:CreateUserParams): Promise<any> {
    const { name, shortName, email, password, active, admin } = params;
    const existingUser = await prisma.user.findUnique({ where: { email } });
  
    if (existingUser) {
      throw { status: 409, error: 'E-mail already exists' };
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    return prisma.user.create({
      data: {
        name,
        shortName,
        email,
        password: hashedPassword,
        active,
        admin,
      },
    });
  },
  
  async authenticateUser(email: string, password: string): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null; // Usuário não encontrado
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Senha inválida
    }

    return user; // Usuário autenticado
  },

  async generateToken(userId: number): Promise<string> {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora
  },

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, JWT_SECRET);
  },

  async getUserRoles(userId: number): Promise<Role[]> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true },
    });

    return user?.roles || [];
  },
    async getUserInfo(userId: number) {

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          roles: {
            include: {
              rolePermissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      });
  
      // Retorna um objeto com informações sobre roles e permissões
      return {
        roles: user?.roles.map((role) => role.name) || [],
        permissions: user?.roles.reduce(
          (acc, role) => [...acc, ...role.rolePermissions.map((rp) => rp.permission.name)], // Assumindo que a permissão tem uma propriedade 'name'
          [] as string[]
        ) || [],
      };
    },

    async getUserById(userId: number): Promise<any> {
      return prisma.user.findUnique({
        where: { id: userId },
      });
    },
  

    async updateUserPhotoId(userId: number, photoId: string | null): Promise<void> {
      await prisma.user.update({
        where: { id: userId },
        data: { photoId: photoId },
      });
    },
  };

  

  
export default UserService;
