const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Hash password admin
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123dkv', salt);

  // 1. Seed Super Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin.dkv@idn.sch.id' },
    update: {},
    create: {
      fullName: 'Super Admin DKV',
      email: 'admin.dkv@idn.sch.id',
      phoneNumber: '081234567890',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
    },
  });

  // 2. Seed Kategori Dasar DKV
  const category = await prisma.category.upsert({
    where: { slug: 'ui-ux-design' },
    update: {},
    create: {
      name: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'Kelas desain antarmuka dan pengalaman pengguna untuk aplikasi & website',
    },
  });

  // 3. Seed Mock Course
  await prisma.course.upsert({
    where: { slug: 'belajar-ui-ux-design-pemula' },
    update: {},
    create: {
      title: 'Belajar UI/UX Design Mobile Application & Website',
      slug: 'belajar-ui-ux-design-pemula',
      software: 'Figma',
      description: 'Panduan lengkap mendesain produk digital dari wireframe hingga prototipe interaktif.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
      level: 'BEGINNER',
      status: 'PUBLISHED',
      price: 0,
      isFree: true,
      categoryId: category.id,
      totalChapters: 1,
      totalLessons: 2,
      educators: {
        create: [
          {
            name: 'Jenny Wilson',
            roleTitle: 'Senior UI/UX Designer',
            linkedinUrl: 'https://linkedin.com',
            sortOrder: 1,
          },
        ],
      },
      chapters: {
        create: [
          {
            title: 'Sesi 1: Pengantar UI/UX Design',
            sortOrder: 1,
            lessons: {
              create: [
                {
                  title: 'Prinsip Dasar Desain Antarmuka',
                  lessonType: 'PDF',
                  contentUrl: 'https://drive.google.com/file/d/sample/view',
                  durationSeconds: 152,
                  sortOrder: 1,
                  description: 'Materi pengenalan prinsip visual hierarchy dan alignment.',
                },
                {
                  title: 'Praktik Wireframing di Figma',
                  lessonType: 'VIDEO',
                  contentUrl: 'https://www.youtube.com/watch?v=sample',
                  durationSeconds: 900,
                  sortOrder: 2,
                  description: 'Video tutorial pembuatan low-fidelity wireframe.',
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seeding database berhasil dieksekusi.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });