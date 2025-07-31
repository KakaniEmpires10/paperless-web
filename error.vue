<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Header Section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
      <div class="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
        <div class="text-center">
          <!-- Medical Icon with Modern Styling -->
          <div class="inline-flex items-center justify-center mb-8">
            <div class="relative">
              <div class="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
              <div class="relative bg-white rounded-full p-6 shadow-lg border border-blue-100">
                <HeartPulse class="w-12 h-12 text-blue-600" />
              </div>
            </div>
          </div>
          
          <!-- Error Status with Modern Typography -->
          <div class="space-y-4">
            <div class="flex items-center justify-center space-x-3">
              <component :is="getStatusIcon(error.statusCode)" 
                        :class="getStatusColor(error.statusCode)" 
                        class="w-8 h-8" />
              <h1 class="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {{ error.statusCode }}
              </h1>
            </div>
            
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
              {{ getErrorTitle(error.statusCode) }}
            </h2>
            
            <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {{ error.statusMessage || 'An unexpected error occurred in our healthcare system' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Stack Section (for 500 errors) -->
    <div v-if="error.statusCode === 500 && error.stack" class="border-t border-gray-200/50">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100/50">
          <details class="group">
            <summary class="cursor-pointer list-none">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="bg-red-100 rounded-full p-2">
                    <AlertTriangle class="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-red-900">Technical Details</h3>
                    <p class="text-sm text-red-700">For IT Support Team</p>
                  </div>
                </div>
                <ChevronDown class="w-5 h-5 text-red-600 transition-transform group-open:rotate-180" />
              </div>
            </summary>
            <div class="mt-6 pt-6 border-t border-red-200/50">
              <div class="bg-red-900/5 rounded-xl p-4 border border-red-200/30">
                <pre class="text-sm text-red-800 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">{{ error.stack }}</pre>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>

    <!-- Action Buttons Section -->
    <div class="border-t border-gray-200/50">
      <div class="max-w-7xl mx-auto px-6 py-16">
        <div class="text-center space-y-8">
          <h3 class="text-xl font-semibold text-gray-800">What would you like to do?</h3>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button @click="goHome" 
                    class="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative flex items-center justify-center space-x-2">
                <Home class="w-5 h-5" />
                <span>Hospital Portal</span>
              </div>
            </button>
            
            <button @click="handleClearError" 
                    class="group bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-gray-200">
              <div class="flex items-center justify-center space-x-2">
                <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Go Back</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Support Information -->
    <div class="border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50/30">
      <div class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Support Info -->
          <div class="space-y-6">
            <div class="space-y-2">
              <h3 class="text-2xl font-bold text-gray-900">Need Medical IT Support?</h3>
              <p class="text-gray-600 leading-relaxed">
                Our technical support team is available 24/7 to assist with any system issues that may affect patient care.
              </p>
            </div>
            
            <div class="space-y-4">
              <a href="tel:5551234567" class="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                <div class="bg-green-100 rounded-full p-3">
                  <Phone class="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Emergency IT Helpdesk</p>
                  <p class="text-green-600 font-medium">+6285296113088</p>
                </div>
              </a>
              
              <a href="mailto:support@hospital.com" class="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                <div class="bg-blue-100 rounded-full p-3">
                  <Mail class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Email Support</p>
                  <p class="text-blue-600 font-medium">yudyoo7@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
          
          <!-- System Status -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div class="flex items-start space-x-4">
              <div class="bg-blue-100 rounded-full p-3 flex-shrink-0">
                <Shield class="w-6 h-6 text-blue-600" />
              </div>
              <div class="space-y-3">
                <h4 class="text-lg font-semibold text-gray-900">System Reliability</h4>
                <p class="text-gray-600 leading-relaxed">
                  Our healthcare systems maintain 99.9% uptime with redundant safeguards. 
                  Critical patient care systems continue to operate normally during any technical issues.
                </p>
                <div class="flex items-center space-x-2 text-sm">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-green-600 font-medium">Core Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200/50">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="text-center text-sm text-gray-500">
          <p>Healthcare Portal System • Secure • Reliable • Always Available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  HeartPulse, 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Shield,
  FileX,
  Server,
  Wifi,
  ChevronDown
} from 'lucide-vue-next'
import { useError, useHead } from '#app'
import type { NuxtError } from '#app'

// Define types
interface ErrorTitles {
  [key: number]: string
}

// Get error and composables from Nuxt
const error = useError() as Ref<NuxtError>

// Navigation functions
const goHome = (): void => {
  clearError({ redirect: '/' })
}

const handleClearError = (): void => {
  clearError({ redirect: '/' })
}

// Helper functions
const getErrorTitle = (statusCode: number): string => {
  const titles: ErrorTitles = {
    400: 'Invalid Request',
    401: 'Authentication Required',
    403: 'Access Denied',
    404: 'Page Not Found',
    408: 'Request Timeout',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Service Unavailable',
    503: 'System Maintenance',
    504: 'Gateway Timeout'
  }
  return titles[statusCode] || 'System Error'
}

const getStatusIcon = (statusCode: number) => {
  if (statusCode === 404) return FileX
  if (statusCode === 401 || statusCode === 403) return Shield
  if (statusCode >= 500) return Server
  if (statusCode === 408 || statusCode === 504) return Wifi
  return AlertTriangle
}

const getStatusColor = (statusCode: number): string => {
  if (statusCode === 404) return 'text-amber-500'
  if (statusCode === 401 || statusCode === 403) return 'text-orange-500'
  if (statusCode >= 500) return 'text-red-500'
  return 'text-blue-500'
}
</script>

<style scoped>
/* Custom scrollbar for error stack */
pre::-webkit-scrollbar {
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: rgba(239, 68, 68, 0.1);
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  background: rgba(239, 68, 68, 0.3);
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: rgba(239, 68, 68, 0.5);
}

/* Smooth animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
</style>