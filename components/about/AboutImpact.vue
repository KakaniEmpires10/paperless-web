<template>
  <div class="bg-accent">
    <div class="container mx-auto px-4 py-20">
      <Motion
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="text-center mb-16">
        <UiBadge rounded="pill" size="lg" class="mb-6"
          ><Icon name="fluent:arrow-trending-lines-20-filled" /> Dampak
          Nyata</UiBadge
        >
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Transformasi Nyata untuk Rumah Sakit
        </h2>
        <p class="text-muted-foreground max-w-3xl mx-auto text-lg">
          Melalui teknologi AI yang inovatif, kami telah membantu rumah sakit di
          seluruh Indonesia meningkatkan efisiensi operasional dan kualitas
          pelayanan kesehatan.
        </p>
      </Motion>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Motion
          v-for="(impact, index) in impacts"
          :key="impact.title"
          :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }"
          class="group">
          <div
            class="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/30">
            <div class="space-y-6">
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <component :is="impact.icon" class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-foreground">
                    {{ impact.title }}
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    {{ impact.description }}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  v-for="benefit in impact.benefits"
                  :key="benefit"
                  class="flex items-center text-sm">
                  <CheckCircle
                    class="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                  <span class="text-muted-foreground">{{ benefit }}</span>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CheckCircle, Clock, TrendingUp } from "lucide-vue-next";

const impacts = [
  {
    title: "Efisiensi Dokumentasi Medis",
    description:
      "Mengoptimalkan proses dokumentasi medis dengan AI yang mengurangi beban administrasi tenaga medis",
    icon: Clock,
    benefits: [
      "Dokumentasi 5x lebih cepat",
      "Mengurangi kesalahan manual",
      "Lebih banyak waktu untuk pasien",
      "Rekam medis yang lebih akurat",
    ],
  },
  {
    title: "Optimasi Klaim Asuransi",
    description:
      "Mempercepat proses klaim dengan verifikasi dokumen otomatis dan coding yang akurat",
    icon: TrendingUp,
    benefits: [
      "Tingkat approval klaim lebih tinggi",
      "Proses klaim lebih cepat",
      "Mengurangi penolakan klaim",
      "Analisis revenue real-time",
    ],
  },
];
</script>
