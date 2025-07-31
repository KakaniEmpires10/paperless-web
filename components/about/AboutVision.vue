<template>
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
                  <ul
                    v-for="item in setting?.mission"
                    class="flex gap-2 items-center">
                    <Icon
                      name="material-symbols:check-circle-outline-rounded"
                      class="text-green-500" /><span
                      class="text-muted-foreground leading-relaxed"
                      >{{ item }}</span
                    >
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
                  <ul
                    v-for="item in setting?.vision"
                    class="flex gap-2 items-center">
                    <Icon
                      name="material-symbols:check-circle-outline-rounded"
                      class="text-green-500" /><span
                      class="text-muted-foreground leading-relaxed"
                      >{{ item }}</span
                    >
                  </ul>
                </ul>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { Eye, Target } from 'lucide-vue-next';

const settingStore = useSettingStore();

const { setting, loading } = storeToRefs(settingStore);
</script>