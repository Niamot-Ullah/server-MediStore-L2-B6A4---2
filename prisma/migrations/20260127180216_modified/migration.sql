-- AlterTable
ALTER TABLE "medicines" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;
