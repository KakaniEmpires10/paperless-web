<template>
  <section id="features">
    <!-- Hero Section -->
    <div class="bg-accent">
      <div class="container mx-auto pt-20 pb-14">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
          class="text-foreground text-center space-y-6">
          <Motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }">
            <h1
              class="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Fitur Kami
            </h1>
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }">
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
              Kami menghadirkan fitur-fitur unggulan yang dirancang untuk
              meningkatkan efisiensi operasional dan kualitas layanan kesehatan.
            </p>
          </Motion>
        </Motion>
      </div>
    </div>

    <!-- Main Features Section -->
    <div class="container mx-auto px-4 py-20">
      <!-- Detailed Features Grid -->
      <Motion
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="mb-16">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="feature in detailedFeatures"
            :key="feature.title"
            class="group relative overflow-hidden">
            <div
              class="bg-card rounded-lg p-6 border border-primary/30 h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/50 group-hover:shadow-primary/20 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-primary/20 before:via-transparent before:to-primary/10 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100 before:-z-10">
              <div class="flex items-start justify-between mb-4">
                <div
                  class="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                  <component :is="feature.icon" class="w-5 h-5 text-primary" />
                </div>
                <UiBadge variant="soft" rounded="pill">{{
                  feature.category
                }}</UiBadge>
              </div>
              <h3 class="font-semibold text-foreground mb-2">
                {{ feature.title }}
              </h3>
              <p class="text-sm text-muted-foreground mb-4">
                {{ feature.description }}
              </p>
              <div class="space-y-2">
                <div
                  v-for="subFeature in feature.subFeatures"
                  :key="subFeature"
                  class="flex items-center text-xs">
                  <div class="w-1 h-1 bg-primary/60 rounded-full mr-2"></div>
                  <span class="text-muted-foreground">{{ subFeature }}</span>
                </div>
              </div>

              <!-- Sliding Button -->
              <div
                class="absolute bottom-4 right-4 transform translate-x-full translate-y-full opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <UiButton size="sm"
                  >Selengkapnya <Icon name="lucide:arrow-right"
                /></UiButton>
              </div>
            </div>
          </div>
        </div>
      </Motion>

      <!-- Integration Section -->
      <Motion
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="bg-accent rounded-2xl pt-16">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4 text-foreground">
            Integrasi Layanan Digital
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Sistem kami terhubung dengan berbagai layanan
            pemerintahan untuk memudahkan dan meningkatkan efisiensi operasional
            rumah sakit Anda.
          </p>
        </div>
        <ClientOnly class="-mt-16">
          <div
            ref="containerRef"
            class="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
            <div
              class="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
              <div class="flex flex-row items-center justify-between">
                <div
                  ref="div1Ref"
                  class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:text-black">
                  <Icon name="devicon:azure" size="24" />
                </div>
                <div
                  ref="div5Ref"
                  class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
                  <Icon name="logos:google-drive" size="24" />
                </div>
              </div>
              <div class="flex flex-row items-center justify-between">
                <div
                  ref="div2Ref"
                  class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:text-black">
                  <NuxtImg
                    src="/logo-bpjs.webp"
                    alt="bpjs_logo" />
                </div>
                <div
                  ref="div4Ref"
                  class="z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-2 text-black shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
                  <NuxtImg
                    src="/favicon.png"
                    class="w-24"
                    alt="paperless_logo" />
                </div>
                <div
                  ref="div6Ref"
                  class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
                  <NuxtImg
                    src="/logo-antrol.webp"
                    alt="mobile_jkn_logo" />
                </div>
              </div>
              <div class="flex flex-row items-center justify-between">
                <div
                  ref="div3Ref"
                  class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:text-black">
                  <NuxtImg
                    src="/inacbg-logo.png"
                    alt="inacbg_logo" />
                </div>
                <div
                  ref="div7Ref"
                  class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
                  <NuxtImg
                    src="/satu-sehat-logo.png"
                    alt="satu_sehat_logo" />
                </div>
              </div>
            </div>

            <UiAnimatedBeam
              :container-ref="containerRef"
              :from-ref="div1Ref"
              :to-ref="div4Ref"
              :curvature="-75"
              :end-y-offset="-10" />
            <UiAnimatedBeam
              :container-ref="containerRef"
              :from-ref="div2Ref"
              :to-ref="div4Ref" />
            <UiAnimatedBeam
              :container-ref="containerRef"
              :from-ref="div3Ref"
              :to-ref="div4Ref"
              :curvature="75"
              :end-y-offset="10" />
            <UiAnimatedBeam
              :container-ref="containerRef"
              :from-ref="div5Ref"
              :to-ref="div4Ref"
              :curvature="-75"
              :end-y-offset="-10" />
            <UiAnimatedBeam
              :container-ref="containerRef"
              :from-ref="div6Ref"
              :to-ref="div4Ref" />
            <UiAnimatedBeam
              :container-ref="containerRef"
              :from-ref="div7Ref"
              :to-ref="div4Ref"
              :curvature="75"
              :end-y-offset="10" />
          </div>
        </ClientOnly>
      </Motion>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  UserCheck,
  Activity,
  Pill,
  Database,
  ClipboardList,
  Globe,
  Smartphone,
  FileCheck,
  Calendar,
} from "lucide-vue-next";

const detailedFeatures = [
  {
    title: "Registrasi Pasien",
    description: "Sistem pendaftaran pasien yang mudah dan cepat",
    icon: UserCheck,
    category: "Registrasi",
    subFeatures: [
      "Pendaftaran Umum & JKN/BPJS",
      "Rawat Jalan & IGD",
      "Tindak Lanjut Perawatan",
      "Edit Data Pasien",
    ],
  },
  {
    title: "Bridging BPJS",
    description: "Integrasi langsung dengan sistem BPJS Kesehatan",
    icon: Globe,
    category: "Integrasi",
    subFeatures: [
      "Vclaim & Antrol",
      "SEP Otomatis",
      "Cek Eligibilitas",
      "Klaim Digital",
    ],
  },
  {
    title: "JKN Online",
    description: "Layanan online terintegrasi dengan Mobile JKN",
    icon: Smartphone,
    category: "Integrasi",
    subFeatures: [
      "Jadwal Dokter HFIS",
      "Mapping Dokter & Poli",
      "Antrian Online",
      "Dashboard Monitoring",
    ],
  },
  {
    title: "Berkas Digital",
    description: "Manajemen dokumen digital yang paperless",
    icon: FileCheck,
    category: "Digital",
    subFeatures: [
      "Upload Otomatis",
      "Kategori Berkas",
      "Data Klaim",
      "Arsip Digital",
    ],
  },
  {
    title: "Resep Digital",
    description: "Pengelolaan resep dan obat secara digital",
    icon: Pill,
    category: "Farmasi",
    subFeatures: ["Input Resep", "Copy Resep", "Obat Racikan", "Stok Obat"],
  },
  {
    title: "Rekam Medis",
    description: "Sistem rekam medis elektronik yang lengkap",
    icon: Activity,
    category: "Medis",
    subFeatures: [
      "Riwayat Pasien",
      "Formulir Digital",
      "Ringkasan Perawatan",
      "Label & Gelang Pasien",
    ],
  },
  {
    title: "Jadwal Kontrol",
    description: "Manajemen jadwal kontrol dan follow-up",
    icon: Calendar,
    category: "Kontrol",
    subFeatures: [
      "SKDP Otomatis",
      "Reminder Kontrol",
      "Riwayat Kontrol",
      "Jadwal Dokter",
    ],
  },
  {
    title: "Antrian & Task ID",
    description: "Sistem antrian digital terintegrasi",
    icon: ClipboardList,
    category: "Antrian",
    subFeatures: [
      "Layar Antrian Poli",
      "Task ID Mobile JKN",
      "Estimasi Waktu",
      "Layar Antrian Registrasi",
    ],
  },
  {
    title: "Data Master",
    description: "Pengelolaan data master rumah sakit",
    icon: Database,
    category: "Master",
    subFeatures: [
      "Data Pasien",
      "Data Dokter",
      "Data Poliklinik",
      "Setting Sistem",
    ],
  },
];

const containerRef = ref(null);
const div1Ref = ref(null);
const div2Ref = ref(null);
const div3Ref = ref(null);
const div4Ref = ref(null);
const div5Ref = ref(null);
const div6Ref = ref(null);
const div7Ref = ref(null);
</script>
