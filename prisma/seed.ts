import { PrismaClient } from '@prisma/client';
import { reservas } from '@/utils/data.json';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const dataReservations = reservas.map((reservation: any) => {
    return {
      ...reservation,
      dateAndTime: faker.date.recent()
    }
  });

  await prisma.reservation.createMany({
    data: dataReservations
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
