-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "images" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "userRef" SET DEFAULT 'admin';
