<template>
  <UiDialog :open="isOpen" @update:open="emit('update:open', $event)">
    <UiDialogContent class="sm:max-w-xl">
      <Motion
        :initial="{ opacity: 0, scale: 0.8, y: 20 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.95, y: -10 }"
        :transition="{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }"
      >
        <!-- Main Content -->
        <div>
          <!-- Success Icon with Animation -->
          <UiDialogHeader class="text-center mb-6">
            <Motion
              :initial="{ opacity: 0, scale: 0 }"
              :animate="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 0.6, delay: 0.1, ease: [0.68, -0.55, 0.265, 1.55] }"
              class="relative mx-auto w-20 h-20 mb-4"
            >
              <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Motion
                  :initial="{ scale: 0 }"
                  :animate="{ scale: 1 }"
                  :transition="{ duration: 0.4, delay: 0.4 }"
                >
                  <CheckCircle class="w-10 h-10 text-white" />
                </Motion>
              </div>
              
              <!-- Floating particles with staggered animation -->
              <Motion
                :initial="{ opacity: 0, scale: 0 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ duration: 0.3, delay: 0.6 }"
                class="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-ping"
              />
              <Motion
                :initial="{ opacity: 0, scale: 0 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ duration: 0.3, delay: 0.8 }"
                class="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
              />
            </Motion>
            
            <!-- Title with typewriter effect -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 0.3 }"
            >
              <UiDialogTitle class="text-2xl font-bold text-foreground text-center mb-2">
                Terima Kasih! 🎉
              </UiDialogTitle>
            </Motion>
            
            <!-- Subtitle -->
            <Motion
              :initial="{ opacity: 0, y: 15 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 0.4 }"
            >
              <UiDialogDescription class="font-medium text-center">
                Pesan Anda telah berhasil dikirim
              </UiDialogDescription>
            </Motion>
          </UiDialogHeader>

          <!-- Message Content -->
          <Motion
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.5 }"
          >
            <div class="bg-gradient-to-br from-primary/20 to-accent/30 rounded-2xl p-6 mb-6 border border-primary/10">
              <div class="space-y-4">
                <Motion
                  :initial="{ opacity: 0, x: -20 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.5, delay: 0.6 }"
                  class="flex items-start space-x-3"
                >
                  <Motion
                    :whileHover="{ scale: 1.2, rotate: 15 }"
                    :transition="{ duration: 0.2 }"
                  >
                    <Heart class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  </Motion>
                  <p v-if="props.content == 'contact'" class="text-foreground leading-relaxed">
                    Kami sangat menghargai kepercayaan Anda untuk menghubungi 
                    <span class="font-semibold text-primary">Paperless Hospital</span>. 
                    Tim ahli kami akan segera meninjau pesan Anda.
                  </p>
                  <p v-else-if="props.content == 'pricing'" class="text-foreground leading-relaxed">
                    Kami sangat menghargai kepercayaan Anda untuk memesan salah satu paket 
                    <span class="font-semibold text-primary">Paperless Hospital</span>. 
                    Tim ahli kami akan segera meninjau pesanan anda dan menghubungi anda.
                  </p>
                </Motion>
              </div>
            </div>
          </Motion>

          <!-- Contact Info -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 0.6 }"
          >
            <div class="bg-gradient-to-tl from-primary/20 to-accent/30 rounded-2xl p-4 mb-6">
              <p class="text-sm text-muted-foreground text-center mb-3 font-medium">
                Untuk kebutuhan mendesak, hubungi kami langsung:
              </p>
              <div class="flex justify-center space-x-6">
                <Motion
                  :initial="{ opacity: 0, scale: 0 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :transition="{ duration: 0.3, delay: 0.7 }"
                  :whileHover="{ scale: 1.05 }"
                  class="flex items-center space-x-2 cursor-pointer"
                >
                  <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail class="w-4 h-4 text-primary" />
                  </div>
                  <span class="text-sm text-foreground font-medium">{{ setting?.email || 'info@paperless.id' }}</span>
                </Motion>
                <Motion
                  :initial="{ opacity: 0, scale: 0 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :transition="{ duration: 0.3, delay: 0.8 }"
                  :whileHover="{ scale: 1.05 }"
                  class="flex items-center space-x-2 cursor-pointer"
                >
                  <div class="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Phone class="w-4 h-4 text-green-600" />
                  </div>
                  <span class="text-sm text-foreground font-medium">{{ setting?.phoneNumber || '+62 21 123 4567' }}</span>
                </Motion>
              </div>
            </div>
          </Motion>

          <!-- Auto-close countdown -->
          <Motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.4, delay: 0.9 }"
          >
            <div class="text-center mb-6">
              <div class="inline-flex items-center space-x-2 bg-accent rounded-full px-4 py-2">
                <Motion
                  :animate="{ scale: [1, 1.2, 1] }"
                  :transition="{ duration: 1, repeat: Infinity }"
                  class="w-2 h-2 bg-primary rounded-full"
                />
                <span class="text-sm text-muted-foreground">
                  Dialog akan tertutup otomatis dalam 
                  <Motion
                    :key="countdown"
                    :initial="{ scale: 1.2, color: 'rgb(var(--primary))' }"
                    :animate="{ scale: 1, color: 'rgb(var(--primary))' }"
                    :transition="{ duration: 0.2 }"
                    class="font-semibold text-primary inline-block"
                  >
                    {{ countdown }}
                  </Motion> 
                  detik
                </span>
              </div>
            </div>
          </Motion>

          <!-- Action Button -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 1 }"
            :whileHover="{ scale: 1.05 }"
            :whileTap="{ scale: 0.95 }"
            class="text-center"
          >
            <UiButton
              @click="handleClose"
              class="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Motion
                :whileHover="{ x: 4 }"
                :transition="{ duration: 0.2 }"
                class="inline-flex items-center"
              >
                <CheckCircle class="w-4 h-4 mr-2" />
                Tutup Sekarang
              </Motion>
            </UiButton>
          </Motion>
        </div>
      </Motion>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import { CheckCircle, Heart, Clock, Mail, Phone } from 'lucide-vue-next';

const COUNT_DOWN_DURATION = 5;

// Props
interface Props {
  isOpen?: boolean;
  content?: 'pricing' | 'contact'
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  content: 'contact'
});

// Emits
const emit = defineEmits<{
  "update:open": [value: boolean];
  closed: [];
}>();

// Get setting from store (using your existing pinia setup)
const settingStore = useSettingStore();
const { setting } = storeToRefs(settingStore);

// Reactive state
const isOpen = computed({
  get: () => props.isOpen,
  set: (value) => emit('update:open', value)
});

const countdown = ref(COUNT_DOWN_DURATION);

// Auto-close countdown
let countdownInterval: NodeJS.Timeout;

const startCountdown = () => {
  countdown.value = COUNT_DOWN_DURATION;
  
  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      handleClose();
    }
  }, 1000);
};

const handleClose = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  
  // Small delay for exit animation
  setTimeout(() => {
    isOpen.value = false;
    emit('closed');
  }, 100);
};

// Watch for dialog open state
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      startCountdown();
    });
  } else {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>