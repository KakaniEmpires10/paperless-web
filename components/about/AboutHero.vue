<template>
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
                <div class="text-sm font-medium">AI Healthcare Technology</div>
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
</template>

<script lang="ts" setup>
import { Brain, Shield, Zap } from 'lucide-vue-next';

const settingStore = useSettingStore();

const { setting, loading } = storeToRefs(settingStore);
</script>
