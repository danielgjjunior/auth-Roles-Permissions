import { Request } from 'express';

interface CreateUserParams {
    name: string;
    shortName: string;
    email: string;
    password: string;
    photoId?: string | null;
    active: boolean;
    admin: boolean;
  }
  
  export { CreateUserParams };


  export interface EditUserParams {
    name?: string;
    shortName?: string;
    email?: string;
    password?: string;
    photoId?: string | null;
    active?: boolean;
    admin?: boolean;
  }


  interface RequestWithUserId extends Request {
    userId?: number; 
    userRoles?: string[]; 
    userPermissions?: string[]; 
  }
  
  export { RequestWithUserId };


  export interface PermissionData {
    name: string;
    prefix: string;
    id_module: number;
    // Adicione outros campos conforme necessário
  }
  
  export interface RolePermissionData {
    role_id: number;
    permission_id: number;
    // Adicione outros campos conforme necessário
  }

  export interface CustomError {
    status?: number;
    error?: string;
  }