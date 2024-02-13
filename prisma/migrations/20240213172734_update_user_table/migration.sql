-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "breakCount" INTEGER NOT NULL DEFAULT 10,
    "workCount" INTEGER NOT NULL DEFAULT 10,
    "intervalBreaks" INTEGER NOT NULL DEFAULT 10
);
INSERT INTO "new_User" ("breakCount", "createdAt", "email", "id", "intervalBreaks", "password", "updatedAt", "username", "workCount") SELECT "breakCount", "createdAt", "email", "id", "intervalBreaks", "password", "updatedAt", "username", "workCount" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;