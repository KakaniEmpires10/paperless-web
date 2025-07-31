<template>
  <div class="space-y-6">
    <DashboardHeader
      title="Dashboard"
      description="Selamat Datang di halaman dashboard anda. Halaman ini didedikasikan bagi anda untuk melihat ringkasan aplikasi anda dan shortcut ke beberapa menu" />

    <UiAlert variant="info">
      <AlertCircle class="h-4 w-4" />
      <UiAlertTitle>Dashboard belum mengandung data asli</UiAlertTitle>
      <UiAlertDescription>
        Fitur ini akan segera tersedia, untuk sekarang fitur ini masih dalam
        process pembuatan dan pengujian sehingga data yang tersedia masih berupa
        placeholder
      </UiAlertDescription>
    </UiAlert>

    <!-- Tab Navigation -->
    <UiTabs v-model="activeTab" class="w-full">
      <UiTabsList class="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-sm">
        <UiTabsTrigger 
          v-for="tab in tabs" 
          :key="tab.id" 
          :value="tab.id"
          class="flex items-center px-6 py-3 rounded-xl transition-all duration-200 font-medium text-sm data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200/50"
        >
          <component :is="tab.icon" class="w-4 h-4 mr-2" />
          {{ tab.label }}
        </UiTabsTrigger>
      </UiTabsList>

      <!-- Dashboard Overview Tab -->
      <UiTabsContent value="dashboard" class="mt-8">
        <DashboardOverview />
      </UiTabsContent>

      <!-- Analytics Tab -->
      <UiTabsContent value="analytics" class="mt-8">
        <DashboardAnalytics />
      </UiTabsContent>

      <!-- Users Tab -->
      <UiTabsContent value="users" class="mt-8">
        <DashboardUsers />
      </UiTabsContent>

      <!-- Content Tab -->
      <UiTabsContent value="content" class="mt-8">
        <DashboardContent />
      </UiTabsContent>

      <!-- Settings Tab -->
      <!-- <UiTabsContent value="settings" class="mt-8">
        <DashboardSettings />
      </UiTabsContent> -->
    </UiTabs>
  </div>
</template>

<script setup lang="ts">
const { session } = useUserSession();

import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Settings,
  AlertCircle,
} from "lucide-vue-next";

const activeTab = ref("dashboard");

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Team", icon: Users },
  { id: "content", label: "Content", icon: FileText },
  // { id: "settings", label: "Settings", icon: Settings },
];

useHead({
  title: "Dashboard",
  titleTemplate: null,
});
</script>
