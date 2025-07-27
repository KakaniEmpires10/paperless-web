<template>
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
</script>
