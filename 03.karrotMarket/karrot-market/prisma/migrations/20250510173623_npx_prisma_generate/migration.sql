-- CreateTable
CREATE TABLE "Evaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "payload" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EvaluationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EvaluationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Evaluation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EvaluationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "payload" TEXT NOT NULL,
    "chatRoomId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "view" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL DEFAULT 'TEXT',
    CONSTRAINT "Message_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("chatRoomId", "created_at", "id", "payload", "updated_at", "userId", "view") SELECT "chatRoomId", "created_at", "id", "payload", "updated_at", "userId", "view" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_EvaluationToUser_AB_unique" ON "_EvaluationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EvaluationToUser_B_index" ON "_EvaluationToUser"("B");
