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
                {{
                  setting?.about
                    ? setting.about
                    : "Paperless Hospital memimpin revolusi digital dalam dunia kesehatan Indonesia dengan teknologi AI terdepan, menciptakan sistem rumah sakit yang lebih efisien dan mengutamakan kualitas pelayanan pasien."
                }}
              </p>
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
                <ul v-if="setting?.mission.length! > 0">
                  <ul v-for="item in setting?.mission" class="flex gap-2 items-center">
                    <Icon name="material-symbols:check-circle-outline-rounded" class="text-green-500" /><span class="text-muted-foreground leading-relaxed">{{ item }}</span>
                  </ul>
                </ul>
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
                <ul v-if="setting?.vision.length! > 0">
                  <ul v-for="item in setting?.vision" class="flex gap-2 items-center">
                    <Icon name="material-symbols:check-circle-outline-rounded" class="text-green-500" /><span class="text-muted-foreground leading-relaxed">{{ item }}</span>
                  </ul>
                </ul>
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

    <!-- Team Section with Carousel -->
    <div class="bg-background py-24">
      <div class="container mx-auto px-4">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
          class="text-center mb-16">
          <UiBadge variant="soft" rounded="pill" size="lg" class="mb-6">
            <Icon name="mdi:account-group" class="mr-2" /> 
            Tim Ahli Kami
          </UiBadge>
          <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Bertemu dengan 
            <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tim Visioner
            </span>
          </h2>
          <p class="text-muted-foreground max-w-4xl mx-auto text-xl leading-relaxed">
            Tim ahli multidisiplin yang terdiri dari para profesional berpengalaman 
            dalam bidang teknologi kesehatan, AI, dan transformasi digital.
          </p>
        </Motion>

        <!-- Team Carousel -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.3, ease: 'easeOut' }">
          <UiCarousel class="w-full max-w-6xl mx-auto">
            <UiCarouselContent>
              <UiCarouselItem 
                v-for="member in teamMembers" 
                :key="member.name"
                class="md:basis-1/2 lg:basis-1/3">
                <div class="p-4">
                  <div class="bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:border-primary/30 hover:scale-105 group">
                    <div class="text-center space-y-6">
                      <!-- Avatar -->
                      <div class="relative mx-auto w-32 h-32">
                        <div class="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                          <Icon :name="member.avatar" class="w-16 h-16 text-primary" />
                        </div>
                        <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="mdi:check" class="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <!-- Info -->
                      <div class="space-y-3">
                        <h3 class="text-xl font-bold text-foreground">{{ member.name }}</h3>
                        <p class="text-primary font-medium">{{ member.role }}</p>
                        <p class="text-muted-foreground text-sm leading-relaxed">{{ member.description }}</p>
                      </div>

                      <!-- Skills -->
                      <div class="flex flex-wrap gap-2 justify-center">
                        <span 
                          v-for="skill in member.skills" 
                          :key="skill"
                          class="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                          {{ skill }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </UiCarouselItem>
            </UiCarouselContent>
            <UiCarouselPrevious class="hidden md:flex" />
            <UiCarouselNext class="hidden md:flex" />
          </UiCarousel>
        </Motion>
      </div>
    </div>

    <!-- Final CTA Section -->
    <div class="container mx-auto px-4 py-24">
      <Motion
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="text-center">
        <div class="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-12 md:p-16 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-2xl"></div>
            <div class="absolute bottom-0 right-0 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
          </div>
          
          <div class="max-w-4xl mx-auto space-y-10 relative z-10">
            <div class="space-y-6">
              <UiBadge variant="soft" rounded="pill" size="lg" class="mb-4">
                <Icon name="mdi:rocket-launch" class="mr-2" /> 
                Mulai Transformasi
              </UiBadge>
              <h2 class="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Siap Bertransformasi Menjadi 
                <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Rumah Sakit Digital?
                </span>
              </h2>
              <p class="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
                Bergabunglah dengan puluhan rumah sakit di Indonesia yang telah
                merasakan manfaat teknologi AI dalam meningkatkan kualitas
                pelayanan kesehatan dan efisiensi operasional.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button class="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-10 py-4 rounded-2xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <Icon name="mdi:play-circle" class="mr-2 inline" />
                Dapatkan Demo Gratis
              </button>
              <button class="border-2 border-border hover:border-primary/50 text-foreground px-10 py-4 rounded-2xl font-semibold hover:bg-accent/50 transition-all duration-300 hover:scale-105">
                <Icon name="mdi:chat" class="mr-2 inline" />
                Konsultasi Sekarang
              </button>
            </div>

            <!-- Trust Indicators -->
            <div class="flex flex-wrap justify-center items-center gap-8 pt-8 opacity-60">
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="mdi:shield-check" class="text-green-500" />
                <span>ISO 27001 Certified</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="mdi:clock-fast" class="text-blue-500" />
                <span>24/7 Support</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="mdi:account-group" class="text-purple-500" />
                <span>14+ Rumah Sakit</span>
              </div>
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
  Brain,
  FileText,
  Shield,
  Zap,
  Clock,
  TrendingUp,
  CheckCircle,
} from "lucide-vue-next";

const settingStore = useSettingStore();

const { setting, loading } = storeToRefs(settingStore);

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

const teamMembers = [
  {
    name: "Dr. Ahmad Wijaya",
    role: "Chief Medical Officer",
    description: "Spesialis dengan 15+ tahun pengalaman dalam digitalisasi sistem kesehatan dan implementasi teknologi AI di rumah sakit.",
    avatar: "mdi:doctor",
    skills: ["Medical AI", "Healthcare Innovation", "Digital Transformation"]
  },
  {
    name: "Sarah Chen",
    role: "Chief Technology Officer", 
    description: "Expert dalam pengembangan AI dan machine learning dengan fokus khusus pada aplikasi teknologi dalam bidang kesehatan.",
    avatar: "mdi:account-circle",
    skills: ["AI Development", "Machine Learning", "Healthcare Tech"]
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Product Strategy",
    description: "Berpengalaman dalam merancang solusi digital yang user-friendly untuk transformasi operasional rumah sakit.",
    avatar: "mdi:account-tie",
    skills: ["Product Strategy", "UX Design", "Healthcare Operations"]
  },
  {
    name: "Dr. Lisa Tan",
    role: "Head of Clinical Integration",
    description: "Dokter spesialis yang memimpin integrasi teknologi AI dengan workflow klinis untuk hasil optimal bagi pasien.",
    avatar: "mdi:doctor",
    skills: ["Clinical Workflow", "AI Integration", "Patient Care"]
  },
  {
    name: "David Kim",
    role: "Lead Data Scientist",
    description: "Ahli dalam analisis data medis dan pengembangan algoritma AI untuk meningkatkan akurasi diagnosis dan treatment.",
    avatar: "mdi:account-school",
    skills: ["Data Science", "Medical Analytics", "AI Algorithms"]
  },
  {
    name: "Jennifer Wong",
    role: "Head of Customer Success",
    description: "Memastikan implementasi yang sukses dan memberikan dukungan berkelanjutan kepada mitra rumah sakit kami.",
    avatar: "mdi:account-heart",
    skills: ["Customer Success", "Implementation", "Support Management"]
  }
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
</script>