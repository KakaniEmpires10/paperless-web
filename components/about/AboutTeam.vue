<template>
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
          <span class="text-primary"> Tim Kami </span>
        </h2>
        <p
          class="text-muted-foreground max-w-4xl mx-auto text-xl leading-relaxed">
          Tim ahli multidisiplin yang terdiri dari para profesional
          berpengalaman dalam bidang teknologi kesehatan, AI, dan transformasi
          digital.
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
                <div
                  class="bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:border-primary/30 hover:scale-105 group">
                  <div class="text-center space-y-6">
                    <!-- Avatar -->
                    <div class="relative mx-auto w-32 h-32">
                      <div
                        class="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                        <Icon
                          :name="member.avatar"
                          class="w-16 h-16 text-primary" />
                      </div>
                      <div
                        class="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="mdi:check" class="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <!-- Info -->
                    <div class="space-y-3">
                      <h3 class="text-xl font-bold text-foreground">
                        {{ member.name }}
                      </h3>
                      <p class="text-primary font-medium">
                        {{ member.role }}
                      </p>
                      <p class="text-muted-foreground text-sm leading-relaxed">
                        {{ member.description }}
                      </p>
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
</template>

<script lang="ts" setup>
const teamMembers = [
  {
    name: "Dr. Ahmad Wijaya",
    role: "Chief Medical Officer",
    description:
      "Spesialis dengan 15+ tahun pengalaman dalam digitalisasi sistem kesehatan dan implementasi teknologi AI di rumah sakit.",
    avatar: "mdi:doctor",
    skills: ["Medical AI", "Healthcare Innovation", "Digital Transformation"],
  },
  {
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    description:
      "Expert dalam pengembangan AI dan machine learning dengan fokus khusus pada aplikasi teknologi dalam bidang kesehatan.",
    avatar: "mdi:account-circle",
    skills: ["AI Development", "Machine Learning", "Healthcare Tech"],
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Product Strategy",
    description:
      "Berpengalaman dalam merancang solusi digital yang user-friendly untuk transformasi operasional rumah sakit.",
    avatar: "mdi:account-tie",
    skills: ["Product Strategy", "UX Design", "Healthcare Operations"],
  },
  {
    name: "Dr. Lisa Tan",
    role: "Head of Clinical Integration",
    description:
      "Dokter spesialis yang memimpin integrasi teknologi AI dengan workflow klinis untuk hasil optimal bagi pasien.",
    avatar: "mdi:doctor",
    skills: ["Clinical Workflow", "AI Integration", "Patient Care"],
  },
  {
    name: "David Kim",
    role: "Lead Data Scientist",
    description:
      "Ahli dalam analisis data medis dan pengembangan algoritma AI untuk meningkatkan akurasi diagnosis dan treatment.",
    avatar: "mdi:account-school",
    skills: ["Data Science", "Medical Analytics", "AI Algorithms"],
  },
  {
    name: "Jennifer Wong",
    role: "Head of Customer Success",
    description:
      "Memastikan implementasi yang sukses dan memberikan dukungan berkelanjutan kepada mitra rumah sakit kami.",
    avatar: "mdi:account-heart",
    skills: ["Customer Success", "Implementation", "Support Management"],
  },
];
</script>
