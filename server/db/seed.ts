import { users, settings } from "./schema";
import { eq } from "drizzle-orm";
import { db } from "../utils/db";

const tags = [
  "AI",
  "Medical Scribe",
  "Medic",
  "RME",
  "Doctor",
  "Nurse",
  "Management",
];

async function seed() {
  // Check if settings already exist
  const existingSettings = await db.select().from(settings).limit(1);

  if (existingSettings.length === 0) {
    await db.insert(settings).values({
      companyName: "Paperless",
      email: "info@saasify.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      about:
        "Paperless Hospital memimpin revolusi digital dalam dunia kesehatan Indonesia dengan teknologi AI terdepan, menciptakan sistem rumah sakit yang lebih efisien dan mengutamakan kualitas pelayanan pasien.",
      excerpt:
        "Kami adalah perusahaan yang memfokuskan diri dalam menghadirkan dan mensupport rumah sakit serta instansi kesehatan lainnya dalam meng-optimalkan pelayanan kepada pasien dengan memberikan software berbasis web dan di lengkapi dengan AI Medical Scribe dan IT support local.",
      moto: "Solusi terintegrasi AI untuk masa depan layanan kesehatan yang lebih baik dan efisien",
      address: "Medan, Sumatera Utara, Indonesia",
      phoneNumber: "+1 555-1234",
      linkedin: "https://linkedin.com/company/saasify",
      instagram: "https://instagram.com/saasify",
      twitter: "https://twitter.com/saasify",
      vision: ["To innovate medical tech", "To lead in AI healthcare"],
      mission: [
        "Build efficient tools",
        "Empower medical workers",
        "Go paperless",
      ],
      logo: "/favicon.png",
      keywords: tags,
    });

    console.log("✅ Settings seeded");
  } else {
    console.log("ℹ️ Settings already exist");
  }

  process.exit();
}

seed().catch(err => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});