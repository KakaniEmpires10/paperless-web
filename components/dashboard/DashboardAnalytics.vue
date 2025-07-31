<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UiCard
        v-for="metric in analyticsMetrics"
        :key="metric.title"
        class="group bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
      >
        <UiCardContent class="p-6 text-center">
          <UiAvatar :class="[
            'w-12 h-12 mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110',
            metric.iconBg,
          ]">
            <component :is="metric.icon" :class="['w-5 h-5', metric.iconColor]" />
          </UiAvatar>
          
          <UiCardTitle class="font-semibold text-gray-900 mb-2">{{ metric.title }}</UiCardTitle>
          <UiCardDescription class="text-sm text-gray-600">{{ metric.description }}</UiCardDescription>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Additional Analytics Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardHeader>
          <UiCardTitle>Traffic Analytics</UiCardTitle>
          <UiCardDescription>Detailed breakdown of website traffic sources</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <BarChart3 class="w-10 h-10 text-blue-400 mx-auto mb-2" />
              <p class="text-sm text-gray-500">Traffic chart placeholder</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardHeader>
          <UiCardTitle>Performance Metrics</UiCardTitle>
          <UiCardDescription>Key performance indicators overview</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="space-y-4">
            <div v-for="kpi in kpiMetrics" :key="kpi.label" class="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
              <div class="flex items-center space-x-3">
                <component :is="kpi.icon" class="w-5 h-5 text-gray-600" />
                <span class="text-sm font-medium text-gray-900">{{ kpi.label }}</span>
              </div>
              <UiBadge :variant="kpi.trend === 'up' ? 'success' : kpi.trend === 'down' ? 'destructive' : 'secondary'">
                {{ kpi.value }}
              </UiBadge>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarChart3, TrendingUp, Clock, Target, Users, Eye } from "lucide-vue-next";

const analyticsMetrics = ref([
  {
    title: "Traffic Sources",
    description: "Analyze visitor origins and channels",
    icon: BarChart3,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Conversion Rate",
    description: "Track goal completions and performance",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Session Duration",
    description: "Average time users spend on site",
    icon: Clock,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
]);

const kpiMetrics = ref([
  { label: "Bounce Rate", value: "42.3%", icon: Target, trend: "down" },
  { label: "Page Views", value: "15.2K", icon: Eye, trend: "up" },
  { label: "Active Users", value: "1,234", icon: Users, trend: "up" },
  { label: "Avg. Session", value: "3m 42s", icon: Clock, trend: "neutral" },
]);
</script>