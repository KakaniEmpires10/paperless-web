<template>
  <section id="about" class="min-h-screen bg-background">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-30">
        <div
          class="absolute top-0 left-0 w-72 h-72 bg-primary/50 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 pt-24 pb-20 relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <Motion
            :initial="{ opacity: 0, x: -50 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, ease: 'easeOut' }"
            class="space-y-8">
            <div class="space-y-6">
              <UiBadge variant="soft" rounded="pill" size="lg"
                ><Icon name="mdi:home-city-outline" /> Tentang Kami</UiBadge
              >

              <h1
                class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transformasi Digital untuk
                <span class="text-primary">Masa Depan Kesehatan</span>
              </h1>

              <p class="text-xl text-muted-foreground leading-relaxed">
                Paperless Hospital memimpin revolusi digital dalam dunia
                kesehatan Indonesia dengan teknologi AI terdepan, menciptakan
                sistem rumah sakit yang lebih efisien dan mengutamakan kualitas
                pelayanan pasien.
              </p>
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-3 gap-6">
              <Motion
                v-for="(stat, index) in heroStats"
                :key="stat.label"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  ease: 'easeOut',
                }"
                class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-foreground">
                  {{ stat.number }}
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ stat.label }}
                </div>
              </Motion>
            </div>
          </Motion>

          <!-- Right Image Placeholder -->
          <Motion
            :initial="{ opacity: 0, x: 50 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
            class="relative">
            <div
              class="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl"></div>
              <div class="relative text-center space-y-4">
                <div
                  class="w-20 h-20 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                  <Brain class="w-10 h-10 text-primary" />
                </div>
                <div class="text-muted-foreground">
                  <div class="text-sm font-medium">
                    AI Healthcare Technology
                  </div>
                  <div class="text-xs">Powered by Advanced AI</div>
                </div>
              </div>
              <!-- Floating elements -->
              <div
                class="absolute top-4 right-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap class="w-6 h-6 text-primary" />
              </div>
              <div
                class="absolute bottom-4 left-4 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Shield class="w-6 h-6 text-accent" />
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </div>

    <!-- Mission & Vision Cards -->
    <div class="bg-accent">
      <div class="container mx-auto px-4 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Mission Card -->
          <Motion
            :initial="{ opacity: 0, y: 50 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, ease: 'easeOut' }"
            class="group">
            <div
              class="bg-card border border-border rounded-xl p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
              <div class="space-y-6">
                <div class="flex items-center space-x-4">
                  <div
                    class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Target class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-foreground">Misi Kami</h3>
                    <div class="text-sm text-primary">Our Mission</div>
                  </div>
                </div>
                <p class="text-muted-foreground leading-relaxed">
                  Mentransformasi sistem dokumentasi medis tradisional menjadi
                  solusi digital yang cerdas, membantu tenaga medis fokus pada
                  hal yang paling penting: memberikan pelayanan terbaik kepada
                  pasien.
                </p>
              </div>
            </div>
          </Motion>

          <!-- Vision Card -->
          <Motion
            :initial="{ opacity: 0, y: 50 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
            class="group">
            <div
              class="bg-card border border-border rounded-xl p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
              <div class="space-y-6">
                <div class="flex items-center space-x-4">
                  <div
                    class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Eye class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-foreground">Visi Kami</h3>
                    <div class="text-sm text-primary">Our Vision</div>
                  </div>
                </div>
                <p class="text-muted-foreground leading-relaxed">
                  Membangun ekosistem kesehatan digital yang terintegrasi, di
                  mana setiap rumah sakit di Indonesia dapat memberikan
                  pelayanan kesehatan yang lebih baik melalui teknologi AI yang
                  inovatif dan terpercaya.
                </p>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </div>

    <!-- Technology Section -->
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

    <!-- Impact Section -->
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
            Melalui teknologi AI yang inovatif, kami telah membantu rumah sakit
            di seluruh Indonesia meningkatkan efisiensi operasional dan kualitas
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

    <!-- Final CTA Section -->
    <div class="container mx-auto px-4 py-20">
      <Motion
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="text-center">
        <div
          class="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 border border-primary/20">
          <div class="max-w-3xl mx-auto space-y-8">
            <div class="space-y-4">
              <h2 class="text-3xl md:text-4xl font-bold text-foreground">
                Siap Bertransformasi Menjadi Rumah Sakit Digital?
              </h2>
              <p class="text-muted-foreground text-lg">
                Bergabunglah dengan puluhan rumah sakit di Indonesia yang telah
                merasakan manfaat teknologi AI dalam meningkatkan kualitas
                pelayanan kesehatan.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                class="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                Dapatkan Demo Gratis
              </button>
              <button
                class="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
                Konsultasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </Motion>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  Target,
  Eye,
  Building2,
  Award,
  Brain,
  FileText,
  Shield,
  Zap,
  Clock,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Headphones,
  Globe,
} from "lucide-vue-next";

const heroStats = [
  {
    number: "14+",
    label: "Rumah Sakit",
  },
  {
    number: "300+",
    label: "Regulasi",
  },
  {
    number: "99.9%",
    label: "Uptime",
  },
];

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

const reasons = [
  {
    title: "Teknologi AI Terdepan",
    description:
      "Menggunakan teknologi AI terkini yang telah terbukti meningkatkan efisiensi operasional rumah sakit",
    icon: Lightbulb,
  },
  {
    title: "Support 24/7",
    description:
      "Tim support yang siap membantu Anda kapan saja untuk memastikan sistem berjalan optimal",
    icon: Headphones,
  },
  {
    title: "Compliance Terjamin",
    description:
      "Sistem yang memenuhi 300+ regulasi asuransi Indonesia dan standar keamanan data medis",
    icon: CheckCircle,
  },
];
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
