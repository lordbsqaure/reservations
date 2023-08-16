-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('BASIC', 'STANDART', 'PREMIUM');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "TicketType" "TicketType" NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTicket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "UserTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
