var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express6 from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/modules/medicine/medicine.router.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Categories {\n  id          String     @id @default(uuid())\n  name        String     @unique\n  description String?\n  createdAt   DateTime   @default(now())\n  updatedAt   DateTime   @updatedAt\n  medicines   Medicine[]\n\n  @@map("categories")\n}\n\nmodel Medicine {\n  id          String     @id @default(uuid())\n  name        String\n  description String?\n  categoryId  String\n  category    Categories @relation(fields: [categoryId], references: [id])\n  sellerId    String\n  price       Decimal    @db.Decimal(10, 2)\n  stock       Int\n  image       String?\n  isFeatured  Boolean    @default(false)\n  createdAt   DateTime   @default(now())\n  updatedAt   DateTime   @updatedAt\n  orders      Order[]\n  reviews     Review[]\n\n  @@index([sellerId])\n  @@map("medicines")\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int?    @db.SmallInt\n  comment String?\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id])\n\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n\n  createdAt DateTime @default(now())\n\n  @@unique([customerId, medicineId])\n  @@index([customerId])\n  @@map("reviews")\n}\n\nmodel Order {\n  id         String   @id @default(uuid())\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n\n  medicineName  String\n  medicinePrice Decimal @db.Decimal(10, 2)\n\n  customerId      String\n  status          OrderStatus @default(PLACED)\n  quantity        Decimal     @default(1) @db.Decimal(10, 2)\n  totalAmount     Decimal     @db.Decimal(10, 2)\n  shippingAddress String\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n\n  @@index([medicineId])\n  @@index([customerId])\n  @@map("orders")\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nmodel User {\n  id            String  @id\n  name          String?\n  email         String\n  emailVerified Boolean @default(false)\n  image         String?\n\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  sessions  Session[]\n  accounts  Account[]\n\n  phone   String?\n  role    UserRole   @default(CUSTOMER)\n  status  UserStatus @default(ACTIVE)\n  reviews Review[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nenum UserRole {\n  ADMIN\n  SELLER\n  CUSTOMER\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoriesToMedicine"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToMedicine"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orders","kind":"object","type":"Order","relationName":"MedicineToOrder"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"}],"dbName":"medicines"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrder"},{"name":"medicineName","kind":"scalar","type":"String"},{"name":"medicinePrice","kind":"scalar","type":"Decimal"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"quantity","kind":"scalar","type":"Decimal"},{"name":"totalAmount","kind":"scalar","type":"Decimal"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"phone","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoriesScalarFieldEnum: () => CategoriesScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MedicineScalarFieldEnum: () => MedicineScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Categories: "Categories",
  Medicine: "Medicine",
  Review: "Review",
  Order: "Order",
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var CategoriesScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MedicineScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  categoryId: "categoryId",
  sellerId: "sellerId",
  price: "price",
  stock: "stock",
  image: "image",
  isFeatured: "isFeatured",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  customerId: "customerId",
  medicineId: "medicineId",
  createdAt: "createdAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  medicineId: "medicineId",
  medicineName: "medicineName",
  medicinePrice: "medicinePrice",
  customerId: "customerId",
  status: "status",
  quantity: "quantity",
  totalAmount: "totalAmount",
  shippingAddress: "shippingAddress",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  phone: "phone",
  role: "role",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var OrderStatus = {
  PLACED: "PLACED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};
var UserRole = {
  ADMIN: "ADMIN",
  SELLER: "SELLER",
  CUSTOMER: "CUSTOMER"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/medicine/medicine.service.ts
var createMedicine = async (data, userId) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId: userId
    }
  });
  return result;
};
var getAllMedicineForAdmin = async () => {
  const result = await prisma.medicine.findMany();
  return result;
};
var getAllMedicine = async (payload) => {
  const { search, isFeatured, page, limit, skip, sortBy, sortOrder } = payload;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured
    });
  }
  const whereClause = andConditions.length > 0 ? { AND: andConditions } : {};
  const [result, total] = await Promise.all([
    prisma.medicine.findMany({
      take: limit,
      skip,
      where: whereClause,
      orderBy: {
        [sortBy]: sortOrder
      }
    }),
    prisma.medicine.count({
      where: whereClause
    })
  ]);
  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getMyPostedMedicine = async (sellerId) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: sellerId
    }
  });
  const result = await prisma.medicine.findMany({
    where: {
      sellerId
    },
    orderBy: {
      "createdAt": "desc"
    }
  });
  const totalPostedMedicine = await prisma.medicine.count({
    where: {
      sellerId
    }
  });
  return { result, totalPostedMedicine };
};
var getStats = async () => {
  const [
    totalMedicine,
    featuredMedicine,
    notFeaturedMedicine,
    totalUser,
    totalAdmin,
    totalSeller,
    totalCustomer
  ] = await Promise.all([
    prisma.medicine.count(),
    prisma.medicine.count({ where: { isFeatured: true } }),
    prisma.medicine.count({ where: { isFeatured: false } }),
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "SELLER" } }),
    prisma.user.count({ where: { role: "CUSTOMER" } })
  ]);
  return {
    totalMedicine,
    featuredMedicine,
    notFeaturedMedicine,
    totalUser,
    totalAdmin,
    totalSeller,
    totalCustomer
  };
};
var getMedicineById = async (id) => {
  return await prisma.medicine.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      },
      reviews: {
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      }
    }
  });
};
var updateMedicine = async (id, userId, data, isSeller, isAdmin) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      sellerId: true
    }
  });
  if (!isAdmin && !isSeller && medicineData.sellerId !== userId) throw new Error("Your are not owner of this product");
  if (!isAdmin) delete data.isFeatured;
  const result = await prisma.medicine.update({
    where: {
      id
    },
    data
  });
  return result;
};
var deleteMedicine = async (id, userId, isSeller, isAdmin) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      sellerId: true
    }
  });
  if (!isAdmin && !isSeller && medicineData.sellerId !== userId) throw new Error("Your are not owner of this product");
  const result = await prisma.medicine.delete({
    where: {
      id
    }
  });
  return result;
};
var medicineService = {
  createMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  getMyPostedMedicine,
  getStats,
  getAllMedicineForAdmin
};

// src/helpers/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = options.page ? Number(options.page) : 1;
  const limit = options.limit ? Number(options.limit) : 10;
  const skip = (page - 1) * limit;
  const result = {
    page,
    limit,
    skip,
    sortBy: options.sortBy || "createdAt",
    sortOrder: options.sortOrder || "desc"
  };
  return result;
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/medicine/medicine.controller.ts
var createMedicine2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        error: "Unauthorized"
      });
    }
    const result = await medicineService.createMedicine(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: "Medicine Created Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var getAllMedicine2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" ? true : req.query.isFeatured === "false" ? false : void 0 : void 0;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(req.query);
    console.log("Query params:", { search: searchString, isFeatured, page, limit, skip, sortBy, sortOrder });
    const result = await medicineService.getAllMedicine({
      search: searchString,
      isFeatured,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    console.log("Result:", {
      dataLength: result.data?.length,
      pagination: result.pagination
    });
    res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data: result
    });
  } catch (error) {
    console.error("Error in getAllMedicine:", error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
var getAllMedicineForAdmin2 = async (req, res) => {
  try {
    const result = await medicineService.getAllMedicineForAdmin();
    res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data: result
    });
  } catch (error) {
    console.error("Error in getAllMedicine:", error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
var getMyPostedMedicine2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("You are Unauthorized");
    const userId = user?.id;
    const result = await medicineService.getMyPostedMedicine(userId);
    res.status(200).json({
      success: true,
      message: "Seller Data Retrieved Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var getStats2 = async (req, res) => {
  try {
    const result = await medicineService.getStats();
    res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data: result
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "stats retrieved Failed";
    res.status(400).json({
      success: false,
      error: "errorMessage",
      details: errorMessage
    });
  }
};
var getMedicineById2 = async (req, res) => {
  try {
    const id = req.params?.id;
    const result = await medicineService.getMedicineById(id);
    res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var updateMedicine2 = async (req, res) => {
  try {
    const id = req.params?.id;
    const user = req?.user;
    const data = req?.body;
    if (!user) throw new Error("You are Unauthorized");
    const isSeller = user.role === UserRole.SELLER;
    const isAdmin = user.role === UserRole.ADMIN;
    const userId = user?.id;
    const result = await medicineService.updateMedicine(id, userId, data, isSeller, isAdmin);
    res.status(200).json({
      success: true,
      message: "Data Updated Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var deleteMedicine2 = async (req, res) => {
  try {
    const id = req.params?.id;
    const user = req?.user;
    if (!user) throw new Error("You are Unauthorized");
    const isSeller = user.role === UserRole.SELLER;
    const isAdmin = user.role === UserRole.ADMIN;
    const userId = user?.id;
    const result = await medicineService.deleteMedicine(id, userId, isSeller, isAdmin);
    res.status(200).json({
      success: true,
      message: "Data Deleted Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var medicineController = {
  createMedicine: createMedicine2,
  getAllMedicine: getAllMedicine2,
  getMedicineById: getMedicineById2,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2,
  getMyPostedMedicine: getMyPostedMedicine2,
  getStats: getStats2,
  getAllMedicineForAdmin: getAllMedicineForAdmin2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  // trustedOrigins: ["http://localhost:3000"],
  trustedOrigins: [process.env.FRONTEND_APP_URL],
  cookies: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.FRONTEND_APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: `"MediStore" <${process.env.APP_USER}>`,
          to: user.email,
          subject: "Verify Your Email Address",
          text: `Please verify your email address by clicking this link: ${verificationUrl}`,
          html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">MY-PRISMA-APP</h1>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                    
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                      Hello${user.name ? ` ${user.name}` : ""},
                    </p>
                    
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                      Thank you for registering with MY-PRISMA-APP! To complete your registration and access all features, please verify your email address by clicking the button below.
                    </p>
                    
                    <!-- Button -->
                    <table role="presentation" style="margin: 30px 0; width: 100%;">
                      <tr>
                        <td align="center">
                          <a href="${verificationUrl}" 
                             style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                            Verify Email Address
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                      Or copy and paste this link into your browser:
                    </p>
                    
                    <p style="margin: 0 0 20px 0; padding: 12px; background-color: #f8f9fa; border-left: 4px solid #667eea; color: #333333; font-size: 14px; word-break: break-all; border-radius: 4px;">
                      ${verificationUrl}
                    </p>
                    
                    <p style="margin: 20px 0 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                      <strong>Note:</strong> This verification link will expire in 24 hours for security purposes.
                    </p>
                  </td>
                </tr>
                
                <!-- Divider -->
                <tr>
                  <td style="padding: 0 40px;">
                    <div style="border-top: 1px solid #e0e0e0;"></div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px; line-height: 1.6;">
                      If you didn't create an account with MY-PRISMA-APP, you can safely ignore this email.
                    </p>
                    
                    <p style="margin: 0; color: #999999; font-size: 12px;">
                      \xA9 2026 MY-PRISMA-APP. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
        });
        console.log("Message sent:", info.messageId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/middileware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Please,Verify your email"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth2;

// src/modules/medicine/medicine.router.ts
var router = express.Router();
router.post("/", auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), medicineController.createMedicine);
router.get("/", medicineController.getAllMedicine);
router.get("/admin", medicineController.getAllMedicineForAdmin);
router.get("/my-posted-medicine", auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), medicineController.getMyPostedMedicine);
router.get("/stats", medicineController.getStats);
router.get("/details/:id", medicineController.getMedicineById);
router.patch("/:id", auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), medicineController.updateMedicine);
router.delete("/:id", auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), medicineController.deleteMedicine);
var medicineRouter = router;

// src/modules/categories/categories.router.ts
import express2 from "express";

// src/modules/categories/categories.service.ts
var createCategories = async (data) => {
  const result = await prisma.categories.create({
    data
  });
  return result;
};
var getAllCategories = async () => {
  return await prisma.categories.findMany();
};
var updateCategory = async (categoryId, data) => {
  const categoryData = await prisma.categories.findUniqueOrThrow({
    where: {
      id: categoryId
    }
  });
  return await prisma.categories.update({
    where: {
      id: categoryData.id
    },
    data
  });
};
var deleteCategory = async (categoryId) => {
  const categoryData = await prisma.categories.findUniqueOrThrow({
    where: {
      id: categoryId
    }
  });
  const result = await prisma.categories.delete({
    where: {
      id: categoryData.id
    }
  });
  return result;
};
var categoriesService = {
  createCategories,
  getAllCategories,
  updateCategory,
  deleteCategory
};

// src/modules/categories/categories.controller.ts
var createCategories2 = async (req, res) => {
  try {
    const result = await categoriesService.createCategories(req.body);
    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const result = await categoriesService.getAllCategories();
    res.status(200).json({
      success: true,
      message: "Category Retrieved Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const categoryId = req?.params?.id;
    const data = req.body;
    const result = await categoriesService.updateCategory(categoryId, data);
    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const categoryId = req?.params?.id;
    const result = await categoriesService.deleteCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
      data: result
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Post delete Failed";
    res.status(400).json({
      success: false,
      error: errorMessage,
      details: err
    });
  }
};
var categoriesController = {
  createCategories: createCategories2,
  getAllCategories: getAllCategories2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/categories/categories.router.ts
var router2 = express2.Router();
router2.post("/", categoriesController.createCategories);
router2.get("/", categoriesController.getAllCategories);
router2.patch("/:id", categoriesController.updateCategory);
router2.delete("/:id", categoriesController.deleteCategory);
var categoriesRouter = router2;

// src/modules/reviews/reviews.router.ts
import express3 from "express";

// src/modules/reviews/reviews.service.ts
var createReviews = async (payload) => {
  const review = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment ?? null,
      customerId: payload.customerId,
      medicineId: payload.medicineId
    }
  });
  return review;
};
var getMedicineReview = async (medicineId) => {
  return await prisma.review.findMany({
    where: { medicineId }
  });
};
var updateReview = async (reviewId, data, isCustomer, userId) => {
  const reviewData = await prisma.review.findUniqueOrThrow({
    where: {
      id: reviewId
    }
  });
  if (!isCustomer && reviewData.customerId !== userId) throw new Error("Your are not authorized");
  return await prisma.review.update({
    where: {
      id: reviewData.id
    },
    data
  });
};
var deleteReview = async (reviewId, isCustomer) => {
  const reviewData = await prisma.review.findUniqueOrThrow({
    where: {
      id: reviewId
    }
  });
  if (!isCustomer) throw new Error("Your are not owner of this review");
  const result = await prisma.review.delete({
    where: {
      id: reviewData.id
    }
  });
  return result;
};
var reviewsService = {
  createReviews,
  getMedicineReview,
  updateReview,
  deleteReview
};

// src/modules/reviews/reviews.controller.ts
var createReviews2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const { rating, comment } = req.body;
    const medicineId = req.params.id;
    const customerId = req.user.id;
    if (!rating || typeof rating !== "number") {
      return res.status(400).json({
        success: false,
        message: "Rating is required and must be a number"
      });
    }
    if (!medicineId || typeof medicineId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine id"
      });
    }
    const payload = {
      rating,
      comment,
      customerId,
      medicineId
    };
    const result = await reviewsService.createReviews(payload);
    res.status(201).json({
      success: true,
      message: "Review Created Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create review"
    });
  }
};
var getMedicineReview2 = async (req, res) => {
  try {
    const medicineId = req.params.medicineId;
    const result = await reviewsService.getMedicineReview(medicineId);
    res.status(200).json({
      success: true,
      message: "Review Retrieved Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var updateReview2 = async (req, res) => {
  try {
    const reviewId = req?.params?.id;
    const user = req?.user;
    const data = req.body;
    if (!user) throw new Error("You are Unauthorized");
    const isCustomer = user.role === "CUSTOMER" /* CUSTOMER */;
    const result = await reviewsService.updateReview(reviewId, data, isCustomer, user.id);
    res.status(200).json({
      success: true,
      message: "Review Updated Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var deleteReview2 = async (req, res) => {
  try {
    const reviewId = req?.params?.id;
    const user = req?.user;
    if (!user) throw new Error("You are Unauthorized");
    const isCustomer = user.role === "CUSTOMER" /* CUSTOMER */;
    const result = await reviewsService.deleteReview(reviewId, isCustomer);
    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
      data: result
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Review delete Failed";
    res.status(400).json({
      success: false,
      error: errorMessage,
      details: err
    });
  }
};
var reviewsController = {
  createReviews: createReviews2,
  getMedicineReview: getMedicineReview2,
  updateReview: updateReview2,
  deleteReview: deleteReview2
};

// src/modules/reviews/reviews.router.ts
var router3 = express3.Router();
router3.post("/:id", auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */, "CUSTOMER" /* CUSTOMER */), reviewsController.createReviews);
router3.get("/medicine/:medicineId", reviewsController.getMedicineReview);
router3.patch("/:id", auth_default("CUSTOMER" /* CUSTOMER */), reviewsController.updateReview);
router3.delete("/:id", auth_default("CUSTOMER" /* CUSTOMER */), reviewsController.deleteReview);
var reviewsRouter = router3;

// src/modules/user/user.router.ts
import express4 from "express";

// src/modules/user/user.service.ts
var getMyProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
};
var getAllUser = async () => {
  return await prisma.user.findMany();
};
var updateUserProfile = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data
  });
};
var userService = {
  getMyProfile,
  updateUserProfile,
  getAllUser
};

// src/modules/user/user.controller.ts
var getMyProfile2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const result = await userService.getMyProfile(userId);
    res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getAllUser2 = async (req, res) => {
  try {
    const user = req?.user;
    if (user?.role !== "ADMIN" /* ADMIN */) {
      throw new Error("Unauthorized");
    }
    const result = await userService.getAllUser();
    res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var updateUserProfile2 = async (req, res) => {
  try {
    const user = req?.user;
    const data = req.body;
    if (user?.role !== "ADMIN" /* ADMIN */) throw new Error("You are Unauthorized");
    const id = req?.params.id;
    const result = await userService.updateUserProfile(id, data);
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};
var userController = {
  getMyProfile: getMyProfile2,
  updateUserProfile: updateUserProfile2,
  getAllUser: getAllUser2
};

// src/modules/user/user.router.ts
var router4 = express4.Router();
router4.get("/me", auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */, "CUSTOMER" /* CUSTOMER */), userController.getMyProfile);
router4.get("/", auth_default("ADMIN" /* ADMIN */), userController.getAllUser);
router4.patch("/status/:id", auth_default("ADMIN" /* ADMIN */), userController.updateUserProfile);
var userRouter = router4;

// src/modules/orders/orders.router.ts
import express5 from "express";

// src/modules/orders/orders.service.ts
var createOrder = async (customerId, medicineId, data) => {
  return prisma.$transaction(async (tx) => {
    const medicine = await tx.medicine.findUniqueOrThrow({
      where: { id: medicineId }
    });
    const {
      name,
      price,
      stock,
      image
    } = medicine;
    if (data.quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    if (data.quantity > stock) {
      throw new Error("Insufficient stock");
    }
    const totalAmount = price.mul(data.quantity);
    const order = await tx.order.create({
      data: {
        customerId,
        medicineId,
        medicineName: name,
        medicinePrice: price,
        quantity: new prismaNamespace_exports.Decimal(data.quantity),
        totalAmount,
        shippingAddress: data.shippingAddress
      }
    });
    await tx.medicine.update({
      where: { id: medicineId },
      data: {
        stock: {
          decrement: data.quantity
        }
      }
    });
    return order;
  });
};
var getOrderById = async (orderId, customerId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId
    },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });
  if (!order) {
    throw new Error("Order not found or access denied");
  }
  return order;
};
var getMyOrders = async (customerId) => {
  const orders = await prisma.order.findMany({
    where: {
      customerId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });
  return orders;
};
var cancelOrder = async (orderId, customerId) => {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findFirst({
      where: {
        id: orderId,
        customerId
      }
    });
    if (!order) {
      throw new Error("Order not found or access denied");
    }
    if (order.status !== OrderStatus.PLACED) {
      throw new Error("Only placed orders can be cancelled");
    }
    const cancelledOrder = await tx.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.CANCELLED
      }
    });
    await tx.medicine.update({
      where: { id: order.medicineId },
      data: {
        stock: {
          increment: order.quantity.toNumber()
        }
      }
    });
    return cancelledOrder;
  });
};
var getSellerOrders = async (sellerId) => {
  const orders = await prisma.order.findMany({
    where: {
      medicine: {
        sellerId
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });
  return orders;
};
var getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });
  return orders;
};
var updateOrderStatusBySeller = async (orderId, sellerId, status) => {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { medicine: true }
    });
    if (!order) throw new Error("Order not found");
    if (order.medicine.sellerId !== sellerId) {
      throw new Error("Unauthorized: This order does not belong to you");
    }
    const allowedStatuses = Object.values(OrderStatus);
    if (!allowedStatuses.includes(status)) {
      throw new Error(`Invalid status. Allowed statuses: ${allowedStatuses.join(", ")}`);
    }
    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: { status }
    });
    return updatedOrder;
  });
};
var ordersService = {
  createOrder,
  getOrderById,
  getMyOrders,
  cancelOrder,
  getSellerOrders,
  getAllOrders,
  updateOrderStatusBySeller
};

// src/modules/orders/orders.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized"
      });
    }
    if (user?.role !== "CUSTOMER") {
      return res.status(400).json({
        success: false,
        error: "Only Customers are allowed to make Order"
      });
    }
    const data = req.body;
    const medicineId = req.params.id;
    const customerId = user?.id;
    const result = await ordersService.createOrder(customerId, medicineId, data);
    res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const orderId = req.params.id;
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid order id"
      });
    }
    const result = await ordersService.getOrderById(orderId, req.user.id);
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
var getMyOrders2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await ordersService.getMyOrders(req?.user?.id);
    res.status(200).json({
      success: true,
      message: "My orders retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var cancelOrder2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const orderId = req.params.id;
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid order id"
      });
    }
    const result = await ordersService.cancelOrder(
      orderId,
      req.user.id
    );
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getSellerOrders2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await ordersService.getSellerOrders(req.user.id);
    res.status(200).json({
      success: true,
      message: "Seller orders retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const result = await ordersService.getAllOrders();
    res.status(200).json({
      success: true,
      message: "All orders retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch orders"
    });
  }
};
var updateOrderStatusBySeller2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const orderId = req.params.id;
    const { status } = req.body;
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid order id" });
    }
    if (!status || typeof status !== "string") {
      return res.status(400).json({ success: false, message: "Status is required" });
    }
    const result = await ordersService.updateOrderStatusBySeller(orderId, user.id, status);
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var ordersController = {
  createOrder: createOrder2,
  getOrderById: getOrderById2,
  getMyOrders: getMyOrders2,
  cancelOrder: cancelOrder2,
  getSellerOrders: getSellerOrders2,
  getAllOrders: getAllOrders2,
  updateOrderStatusBySeller: updateOrderStatusBySeller2
};

// src/modules/orders/orders.router.ts
var router5 = express5.Router();
router5.get("/seller", auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */), ordersController.getSellerOrders);
router5.get("/", auth_default("ADMIN" /* ADMIN */), ordersController.getAllOrders);
router5.post("/:id", auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */, "CUSTOMER" /* CUSTOMER */), ordersController.createOrder);
router5.get("/my", auth_default("CUSTOMER" /* CUSTOMER */), ordersController.getMyOrders);
router5.get("/:id", auth_default("CUSTOMER" /* CUSTOMER */), ordersController.getOrderById);
router5.patch(
  "/:id/cancel",
  auth_default("CUSTOMER" /* CUSTOMER */),
  ordersController.cancelOrder
);
router5.patch(
  "/:id/status",
  auth_default("SELLER" /* SELLER */),
  ordersController.updateOrderStatusBySeller
);
var ordersRouter = router5;

// src/middileware/errorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 400;
  let message = err.message || "Internal Servar Error";
  let error = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    message = "Missing field or incorrect field type.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      message = "Record not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      message = "Duplicate key error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      message = "Foreign key constraint failed.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      message = "Authentication error.";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      message = "Cannot connect to the database.";
    }
  }
  res.status(statusCode).json({ success: false, message, error });
}
var errorHandler_default = errorHandler;

// src/middileware/notFound.ts
var notFound = (req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
};

// src/app.ts
var app = express6();
app.use(express6.json());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_APP_URL,
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5000"
    ],
    credentials: true
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/medicines", medicineRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", ordersRouter);
app.get("/", (req, res) => {
  res.send("Welcome to MediStore");
});
app.use(errorHandler_default);
app.use(notFound);
var app_default = app;

// src/server.ts
var port = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log(`Connected to the DB successfully`);
    app_default.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
