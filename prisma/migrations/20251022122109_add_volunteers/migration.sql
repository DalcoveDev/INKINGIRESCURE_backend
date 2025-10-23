-- CreateTable
CREATE TABLE "volunteers" (
    "id" TEXT NOT NULL,
    "emergencyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT,
    "skills" TEXT,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_emergencyId_userId_key" ON "volunteers"("emergencyId", "userId");

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_emergencyId_fkey" FOREIGN KEY ("emergencyId") REFERENCES "emergencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
