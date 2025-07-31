<template>
  <div class="space-y-8">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardStatsCard
        v-for="(stat, index) in statsCards"
        :key="index"
        :label="stat.label"
        :value="stat.value"
        :change="stat.change"
        :period="stat.period"
        :icon="stat.icon"
        :icon-bg="stat.iconBg"
        :icon-color="stat.iconColor"
        :gradient="stat.gradient"
      />
    </div>

    <!-- Charts and Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Chart Section -->
      <UiCard class="lg:col-span-2 bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardHeader>
          <div class="flex items-center justify-between">
            <UiCardTitle class="text-lg font-semibold">Analytics Overview</UiCardTitle>
            <UiSelect default-value="7days">
              <UiSelectTrigger class="w-40 bg-white/50">
                <UiSelectValue />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="7days">Last 7 days</UiSelectItem>
                <UiSelectItem value="30days">Last 30 days</UiSelectItem>
                <UiSelectItem value="3months">Last 3 months</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </UiCardHeader>
        <UiCardContent>
          <div class="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-blue-100">
            <div class="text-center">
              <BarChart3 class="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p class="text-gray-600 font-medium">Interactive Chart</p>
              <p class="text-sm text-gray-500">Data visualization will render here</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Recent Activity -->
      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardHeader>
          <UiCardTitle class="text-lg font-semibold">Live Activity</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="space-y-4">
            <div
              v-for="(activity, index) in recentActivities"
              :key="activity.id"
              class="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/50 transition-colors"
            >
              <UiBadge
                :variant="index === 0 ? 'success' : index === 1 ? 'info' : 'soft'"
                class="w-2 h-2 p-0 rounded-full mt-2 flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ activity.action }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BarChart3, Users, Eye, Briefcase, DollarSign } from "lucide-vue-next";

const statsCards = ref([
  {
    label: "Total Users",
    value: "2,543",
    change: "+12%",
    period: "from last month",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    label: "Page Views",
    value: "45.2K",
    change: "+8%",
    period: "from last week",
    icon: Eye,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    gradient: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  },
  {
    label: "Active Projects",
    value: "12",
    change: "+3",
    period: "new this month",
    icon: Briefcase,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    gradient: "bg-gradient-to-r from-amber-500 to-amber-600",
  },
  {
    label: "Revenue",
    value: "$84.3K",
    change: "+15%",
    period: "from last quarter",
    icon: DollarSign,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
]);

const recentActivities = ref([
  { id: 1, action: "New user registered", time: "2 minutes ago" },
  { id: 2, action: "Blog post published", time: "1 hour ago" },
  { id: 3, action: "Project updated", time: "3 hours ago" },
  { id: 4, action: "User profile updated", time: "5 hours ago" },
  { id: 5, action: "Contact form submission", time: "1 day ago" },
]);
</script>