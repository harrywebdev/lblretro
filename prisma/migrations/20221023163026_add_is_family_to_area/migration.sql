-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Area" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parentId" TEXT,
    "text" TEXT NOT NULL,
    "description" TEXT,
    "emoji" TEXT NOT NULL,
    "isFamily" BOOLEAN NOT NULL DEFAULT false,
    "sequence" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Area_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Area" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Area" ("createdAt", "description", "emoji", "id", "parentId", "sequence", "text", "weight") SELECT "createdAt", "description", "emoji", "id", "parentId", "sequence", "text", "weight" FROM "Area";
DROP TABLE "Area";
ALTER TABLE "new_Area" RENAME TO "Area";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
