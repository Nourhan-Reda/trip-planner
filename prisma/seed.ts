import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Users
  const nourhan = await prisma.user.create({
    data: {
      name: "Nourhan Reda",
      email: "nourhan@example.com",
    },
  });

  const ahmed = await prisma.user.create({
    data: {
      name: "Rahma",
      email: "Rahma@example.com",
    },
  });

  // Trips
  const parisTrip = await prisma.trip.create({
    data: {
      title: "Paris Vacation",
      destination: "Paris, France",
      startDate: new Date("2026-07-10"),
      endDate: new Date("2026-07-15"),
      budget: 1500,
      userId: nourhan.id,
    },
  });

  const romeTrip = await prisma.trip.create({
    data: {
      title: "Rome Adventure",
      destination: "Rome, Italy",
      startDate: new Date("2026-08-01"),
      endDate: new Date("2026-08-08"),
      budget: 1800,
      userId: nourhan.id,
    },
  });

  const dubaiTrip = await prisma.trip.create({
    data: {
      title: "Dubai Business Trip",
      destination: "Dubai, UAE",
      startDate: new Date("2026-09-10"),
      endDate: new Date("2026-09-14"),
      budget: 2500,
      userId: ahmed.id,
    },
  });

  const londonTrip = await prisma.trip.create({
    data: {
      title: "London Weekend",
      destination: "London, UK",
      startDate: new Date("2026-10-05"),
      endDate: new Date("2026-10-08"),
      budget: 1200,
      userId: ahmed.id,
    },
  });

  // Places
  await prisma.place.createMany({
    data: [
      {
        name: "Eiffel Tower",
        address: "Paris",
        tripId: parisTrip.id,
      },
      {
        name: "Louvre Museum",
        address: "Paris",
        tripId: parisTrip.id,
      },
      {
        name: "Colosseum",
        address: "Rome",
        tripId: romeTrip.id,
      },
      {
        name: "Trevi Fountain",
        address: "Rome",
        tripId: romeTrip.id,
      },
      {
        name: "Burj Khalifa",
        address: "Dubai",
        tripId: dubaiTrip.id,
      },
      {
        name: "Dubai Mall",
        address: "Dubai",
        tripId: dubaiTrip.id,
      },
      {
        name: "Big Ben",
        address: "London",
        tripId: londonTrip.id,
      },
      {
        name: "London Eye",
        address: "London",
        tripId: londonTrip.id,
      },
    ],
  });

  // Expenses
  await prisma.expense.createMany({
    data: [
      {
        title: "Hotel",
        amount: 500,
        category: "Accommodation",
        tripId: parisTrip.id,
      },
      {
        title: "Food",
        amount: 150,
        category: "Food",
        tripId: parisTrip.id,
      },
      {
        title: "Flights",
        amount: 600,
        category: "Transport",
        tripId: romeTrip.id,
      },
      {
        title: "Taxi",
        amount: 80,
        category: "Transport",
        tripId: romeTrip.id,
      },
      {
        title: "Hotel",
        amount: 1000,
        category: "Accommodation",
        tripId: dubaiTrip.id,
      },
      {
        title: "Shopping",
        amount: 400,
        category: "Shopping",
        tripId: dubaiTrip.id,
      },
    ],
  });

  // Todos
  await prisma.todo.createMany({
    data: [
      {
        title: "Book hotel",
        completed: true,
        tripId: parisTrip.id,
      },
      {
        title: "Buy tickets",
        completed: false,
        tripId: parisTrip.id,
      },
      {
        title: "Pack luggage",
        completed: false,
        tripId: romeTrip.id,
      },
      {
        title: "Renew passport",
        completed: true,
        tripId: dubaiTrip.id,
      },
      {
        title: "Check weather",
        completed: false,
        tripId: londonTrip.id,
      },
    ],
  });

  console.log("🌱 Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });