<template>
  <section
    id="WhyUs"
    class="flex flex-col items-center justify-center gap-10 py-20 bg-accent">
    <UiBadge size="lg" rounded="pill"> Mengapa Kami ? </UiBadge>

    <div class="text-foreground text-center space-y-5 max-w-2xl px-4">
      <h2
        class="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
        Kami Menyediakan Beragam
        <span class="bg-clip-text text-transparent font-bold bg-primary">
          Solusi Manajemen <br />
        </span>
        Terbaik dan Terpercaya
      </h2>
      <p class="text-base sm:text-lg text-muted-foreground">
        Berikut adalah 4 manfaat utama dari AI Medical Scribe yang ditawarkan
        oleh PaperlessHospital.id
      </p>
    </div>

    <div
      class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 px-4">
      <UiCard
        v-for="item in whyList"
        :key="item.image"
        class="bg-primary/15 border-primary/20 relative">
        <UiCardContent class="p-6">
          <UiGlowingEffect
            class="rounded-xl"
            :spread="25"
            :glow="true"
            variant="primary"
            :disabled="false"
            :proximity="40"
            :border-width="2"
            :inactive-zone="0.01" />
          <div class="flex flex-col-reverse sm:flex-row items-center gap-5">
            <div class="space-y-5 flex-1">
              <h3 class="text-lg sm:text-xl font-semibold">
                {{ item.title }}
              </h3>
              <p class="m-0 text-muted-foreground">
                {{ item.description }}
              </p>
            </div>
            <img
              :src="item.image"
              class="w-32 sm:w-40 md:w-48"
              :alt="item.alt" />
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import medicalRecordImg from "~/assets/images/medical_record.png";
import icd10Img from "~/assets/images/icd-10.png";
import speedImg from "~/assets/images/speed.png";
import mobileDashboardImg from "~/assets/images/mobile_dashboard.png";

const whyList = [
  {
    title: "Menyederhanakan Dokumentasi Medis Pasien",
    description:
      "AI Medical Scribe kami mempermudah proses pengisian rekam medis pasien, memastikan dokumentasi yang akurat dan efisien.",
    image: medicalRecordImg,
    alt: "Medical Docs",
  },
  {
    title: "Mempercepat Pengkodean Otomatis ICD-10 dan ICD-9",
    description:
      "Sistem kami membantu mempercepat proses pengkodean dengan menghasilkan kode ICD-10 dan ICD-9 secara otomatis berdasarkan data pasien, mengurangi pekerjaan manual.",
    image: icd10Img,
    alt: "icd-10",
  },
  {
    title: "Mempercepat Proses Klaim Asuransi",
    description:
      "Dengan mengisi data yang diperlukan secara otomatis, AI kami membantu mempercepat proses klaim asuransi, mengurangi keterlambatan dan kesalahan.",
    image: speedImg,
    alt: "speed",
  },
  {
    title: "Menyediakan Analisis Dashboard Keuangan Real-Time",
    description:
      "Menawarkan dashboard analisis keuangan real-time yang memungkinkan penyedia layanan kesehatan untuk mengevaluasi potensi pendapatan asuransi, meningkatkan pengambilan keputusan operasional rumah sakit.",
    image: mobileDashboardImg,
    alt: "mobile dashboard",
  },
];
</script>
