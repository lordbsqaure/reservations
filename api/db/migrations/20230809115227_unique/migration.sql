/*
  Warnings:

  - A unique constraint covering the columns `[userId,ticketId]` on the table `UserTicket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserTicket_userId_ticketId_key" ON "UserTicket"("userId", "ticketId");
