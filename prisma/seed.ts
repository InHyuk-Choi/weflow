import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { CASE_INDUSTRIES, placeholderImage, caseDescription } from "../lib/sample-cases";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "weflow1234";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username },
    update: { passwordHash, loginAttempts: 0, lockedUntil: null },
    create: { username, passwordHash },
  });
  console.log(`Seeded admin user: ${username}`);

  // Seed a handful of published success cases across industries.
  const existing = await prisma.successCase.count();
  if (existing === 0) {
    const featured = CASE_INDUSTRIES.slice(0, 12);
    for (const industry of featured) {
      await prisma.successCase.create({
        data: {
          title: `${industry} 성공 사례`,
          description: caseDescription(industry),
          imageUrl: placeholderImage(industry),
          published: true,
        },
      });
    }
    console.log(`Seeded ${featured.length} success cases`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
