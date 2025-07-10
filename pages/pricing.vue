<template>
  <section id="pricing">
    <div class="bg-accent">
      <div class="container mx-auto pt-20 pb-14">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
          class="text-foreground text-center space-y-6"
        >
          <Motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
          >
            <h1 class="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              List Paket
            </h1>
          </Motion>
          
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }"
          >
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
              Temukan paket yang sesuai dengan kebutuhan Anda. Hubungi kami untuk informasi lebih lanjut atau konsultasi gratis.
            </p>
          </Motion>
        </Motion>
      </div>
    </div>
    
    <div class="-mt-5 mb-20 flex justify-center flex-col items-center space-y-8">
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
      >
        <TabsPricing v-model="selectedValue" />
      </Motion>
      
      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        <!-- Service Only Package -->
        <Motion
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.8, delay: 0.8, ease: 'easeOut' }"
          :whileHover="{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.3 }
          }"
          class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <Motion
            :initial="{ opacity: 0 }"
            :whileHover="{ opacity: 1 }"
            :transition="{ duration: 0.3 }"
            class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
          />
          
          <div class="relative p-8">
            <div class="text-center mb-8">
              <Motion
                :initial="{ scale: 0, rotate: -180 }"
                :animate="{ scale: 1, rotate: 0 }"
                :transition="{ duration: 0.8, delay: 1, ease: 'easeOut' }"
                :whileHover="{ 
                  scale: 1.1, 
                  rotate: 5,
                  transition: { duration: 0.3 }
                }"
                class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4"
              >
                <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </Motion>
              
              <Motion
                :key="selectedValue + '-service'"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -20 }"
                :transition="{ duration: 0.3 }"
              >
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ selectedValue === 'rs' ? 'AI Service RS' : 'AI Service Klinik' }}
                </h3>
                <Motion
                  :initial="{ scale: 0.8 }"
                  :animate="{ scale: 1 }"
                  :transition="{ duration: 0.5, delay: 0.2 }"
                >
                  <p class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {{ selectedValue === 'rs' ? 'Rp 15jt' : 'Rp 8jt' }}
                  </p>
                </Motion>
                <p class="text-gray-500 dark:text-gray-400">per bulan</p>
              </Motion>
            </div>
            
            <Motion
              :key="selectedValue + '-service-features'"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :exit="{ opacity: 0 }"
              :transition="{ duration: 0.3 }"
            >
              <ul class="space-y-4 mb-8">
                <Motion
                  v-for="(feature, index) in serviceFeatures"
                  :key="index"
                  :initial="{ opacity: 0, x: -20 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.4, delay: index * 0.1 }"
                  :whileHover="{ x: 5 }"
                  class="flex items-start space-x-3"
                >
                  <Motion
                    :initial="{ scale: 0 }"
                    :animate="{ scale: 1 }"
                    :transition="{ duration: 0.3, delay: 0.5 + index * 0.1 }"
                  >
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </Motion>
                  <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
                </Motion>
              </ul>
            </Motion>
            
            <Motion
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }"
              :transition="{ duration: 0.2 }"
            >
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Pilih Paket
              </button>
            </Motion>
          </div>
        </Motion>

        <!-- Application Package (Most Popular) -->
        <Motion
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.8, delay: 1, ease: 'easeOut' }"
          :whileHover="{ 
            y: -12, 
            scale: 1.05,
            transition: { duration: 0.3 }
          }"
          class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border-2 border-indigo-500 overflow-hidden"
        >
          <Motion
            :initial="{ y: -50, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.6, delay: 1.2 }"
            class="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-2 text-sm font-semibold"
          >
            <Motion
              :animate="{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }"
              :transition="{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }"
            >
              MOST POPULAR
            </Motion>
          </Motion>
          
          <Motion
            :initial="{ opacity: 0 }"
            :whileHover="{ opacity: 1 }"
            :transition="{ duration: 0.3 }"
            class="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20"
          />
          
          <div class="relative p-8 pt-12">
            <div class="text-center mb-8">
              <Motion
                :initial="{ scale: 0, rotate: -180 }"
                :animate="{ scale: 1, rotate: 0 }"
                :transition="{ duration: 0.8, delay: 1.2, ease: 'easeOut' }"
                :whileHover="{ 
                  scale: 1.15, 
                  rotate: -5,
                  transition: { duration: 0.3 }
                }"
                class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4"
              >
                <svg class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </Motion>
              
              <Motion
                :key="selectedValue + '-app'"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -20 }"
                :transition="{ duration: 0.3 }"
              >
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ selectedValue === 'rs' ? 'Complete HMS RS' : 'Complete HMS Klinik' }}
                </h3>
                <Motion
                  :initial="{ scale: 0.8 }"
                  :animate="{ scale: 1 }"
                  :transition="{ duration: 0.5, delay: 0.2 }"
                >
                  <p class="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {{ selectedValue === 'rs' ? 'Rp 45jt' : 'Rp 25jt' }}
                  </p>
                </Motion>
                <p class="text-gray-500 dark:text-gray-400">per bulan</p>
              </Motion>
            </div>
            
            <Motion
              :key="selectedValue + '-app-features'"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :exit="{ opacity: 0 }"
              :transition="{ duration: 0.3 }"
            >
              <ul class="space-y-4 mb-8">
                <Motion
                  v-for="(feature, index) in appFeatures"
                  :key="index"
                  :initial="{ opacity: 0, x: -20 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.4, delay: index * 0.1 }"
                  :whileHover="{ x: 5 }"
                  class="flex items-start space-x-3"
                >
                  <Motion
                    :initial="{ scale: 0 }"
                    :animate="{ scale: 1 }"
                    :transition="{ duration: 0.3, delay: 0.5 + index * 0.1 }"
                  >
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </Motion>
                  <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
                </Motion>
              </ul>
            </Motion>
            
            <Motion
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }"
              :transition="{ duration: 0.2 }"
            >
              <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Pilih Paket
              </button>
            </Motion>
          </div>
        </Motion>

        <!-- Custom Package -->
        <Motion
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.8, delay: 1.2, ease: 'easeOut' }"
          :whileHover="{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.3 }
          }"
          class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <Motion
            :initial="{ opacity: 0 }"
            :whileHover="{ opacity: 1 }"
            :transition="{ duration: 0.3 }"
            class="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
          />
          
          <div class="relative p-8">
            <div class="text-center mb-8">
              <Motion
                :initial="{ scale: 0, rotate: -180 }"
                :animate="{ scale: 1, rotate: 0 }"
                :transition="{ duration: 0.8, delay: 1.4, ease: 'easeOut' }"
                :whileHover="{ 
                  scale: 1.1, 
                  rotate: 10,
                  transition: { duration: 0.3 }
                }"
                class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4"
              >
                <Motion
                  :animate="{ 
                    rotate: [0, 5, -5, 0],
                  }"
                  :transition="{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }"
                >
                  <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </Motion>
              </Motion>
              
              <Motion
                :key="selectedValue + '-custom'"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -20 }"
                :transition="{ duration: 0.3 }"
              >
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ selectedValue === 'rs' ? 'Custom Enterprise RS' : 'Custom Premium Klinik' }}
                </h3>
                <Motion
                  :initial="{ scale: 0.8 }"
                  :animate="{ scale: 1 }"
                  :transition="{ duration: 0.5, delay: 0.2 }"
                >
                  <p class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {{ selectedValue === 'rs' ? 'Rp 85jt+' : 'Rp 50jt+' }}
                  </p>
                </Motion>
                <p class="text-gray-500 dark:text-gray-400">per bulan</p>
              </Motion>
            </div>
            
            <Motion
              :key="selectedValue + '-custom-features'"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :exit="{ opacity: 0 }"
              :transition="{ duration: 0.3 }"
            >
              <ul class="space-y-4 mb-8">
                <Motion
                  v-for="(feature, index) in customFeatures"
                  :key="index"
                  :initial="{ opacity: 0, x: -20 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.4, delay: index * 0.1 }"
                  :whileHover="{ x: 5 }"
                  class="flex items-start space-x-3"
                >
                  <Motion
                    :initial="{ scale: 0 }"
                    :animate="{ scale: 1 }"
                    :transition="{ duration: 0.3, delay: 0.5 + index * 0.1 }"
                  >
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </Motion>
                  <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
                </Motion>
              </ul>
            </Motion>
            
            <Motion
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }"
              :transition="{ duration: 0.2 }"
            >
              <button class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Konsultasi Custom
              </button>
            </Motion>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const selectedValue = ref("rs");

const serviceFeatures = computed(() => [
  'Integrasi AI Service dengan sistem existing',
  'Technical support online 24/7',
  selectedValue.value === 'rs' ? 'API untuk sistem rumah sakit' : 'API untuk sistem klinik',
  'Monthly performance report'
]);

const appFeatures = computed(() => [
  selectedValue.value === 'rs' ? 'Full Hospital Management System' : 'Full Clinic Management System',
  'AI Integration + CPPT Digital',
  'Berkas Digital + E-Resep',
  'Role-based Access Control',
  '2 Technical Support on-site',
  selectedValue.value === 'rs' ? 'All standard RS modules' : 'All standard clinic modules'
]);

const customFeatures = computed(() => [
  'Semua fitur Application Package',
  'Priority Support & Special Care',
  'Custom on-site team size',
  'Custom module development',
  selectedValue.value === 'rs' ? 'Tailored hospital solutions' : 'Tailored clinic solutions',
  '24/7 dedicated support channel'
]);
</script>