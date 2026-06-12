import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";
import { CASE_LIST, placeholderImage, caseDescription } from "../lib/sample-cases";

const prisma = new PrismaClient();

const IMG_EXTS = ["jpg", "jpeg", "png", "webp"];

// If public/cases/<slug>.<ext> exists, use that local image; else placeholder.
function resolveImage(slug: string, name: string): string {
  const dir = path.join(process.cwd(), "public", "cases");
  for (const ext of IMG_EXTS) {
    if (fs.existsSync(path.join(dir, `${slug}.${ext}`))) {
      return `/cases/${slug}.${ext}`;
    }
  }
  return placeholderImage(name);
}

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

  // Reset and reseed all success cases (reflects latest public/cases images).
  await prisma.successCase.deleteMany({});
  for (const c of CASE_LIST) {
    await prisma.successCase.create({
      data: {
        title: `${c.name} 성공 사례`,
        description: caseDescription(c.name),
        imageUrl: resolveImage(c.slug, c.name),
        published: true,
      },
    });
  }
  console.log(`Seeded ${CASE_LIST.length} success cases`);
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
