<template>
  <div class="bg-accent/10 py-20">
      <div class="container mx-auto px-4">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
          class="text-center mb-16">
          <UiBadge variant="soft" rounded="pill" size="lg" class="mb-6"
            ><Icon name="hugeicons:ai-brain-02" /> Integrasi AI</UiBadge
          >
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Solusi Komprehensif untuk Rumah Sakit Modern
          </h2>
          <p class="text-muted-foreground max-w-3xl mx-auto text-lg">
            Mengintegrasikan AI Medical Scribes, otomasi dokumen, dan kontrol
            anggaran asuransi untuk mengoptimalkan seluruh proses pelayanan
            kesehatan.
          </p>
        </Motion>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Motion
            v-for="(tech, index) in technologies"
            :key="tech.title"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }"
            class="group">
            <div
              class="bg-card rounded-xl p-6 h-full border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/30 hover:scale-105">
              <div class="space-y-4">
                <div
                  class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <component :is="tech.icon" class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-semibold text-foreground mb-2">
                    {{ tech.title }}
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    {{ tech.description }}
                  </p>
                </div>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import {
  Brain,
  FileText,
  Shield,
  Zap,
} from "lucide-vue-next";

const technologies = [
  {
    title: "AI Medical Scribes",
    description: "Otomasi dokumentasi medis dengan teknologi AI terdepan",
    icon: Brain,
  },
  {
    title: "Auto ICD Coding",
    description: "Coding ICD-10 dan ICD-9 otomatis yang akurat dan cepat",
    icon: FileText,
  },
  {
    title: "Insurance Control",
    description: "Kontrol anggaran asuransi berbasis grouper rates",
    icon: Shield,
  },
  {
    title: "Real-time Analysis",
    description: "Dashboard analisis finansial waktu nyata",
    icon: Zap,
  },
];
</script>