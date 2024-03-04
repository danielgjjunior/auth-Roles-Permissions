/*
  Warnings:

  - You are about to drop the column `id_module` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the `permission_module` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `permission` DROP FOREIGN KEY `Permission_id_module_fkey`;

-- DropForeignKey
ALTER TABLE `permission_module` DROP FOREIGN KEY `Permission_Module_parentModuleId_fkey`;

-- AlterTable
ALTER TABLE `permission` DROP COLUMN `id_module`,
    ADD COLUMN `isModule` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `parentPermissionId` INTEGER NULL;

-- DropTable
DROP TABLE `permission_module`;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_parentPermissionId_fkey` FOREIGN KEY (`parentPermissionId`) REFERENCES `Permission`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
