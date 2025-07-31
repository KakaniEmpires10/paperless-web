<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { navMain, navSettings } from './NavList';

const settingStore = useSettingStore()
const { session } = useUserSession()

const { setting, loading } = storeToRefs(settingStore)

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const userRole = session.value?.user?.role

// Filter sesuai role
const filteredNavSettings = navSettings.filter(
  (item) => !item.role || item.role === userRole
);

const data = {
  user: {
    name: session.value?.user?.name as string,
    email: session.value?.user?.email as string,
    image: session.value?.user?.image || '/placeholder_profile.png',
    role: userRole
  },
  navMain: navMain,
  navSettings : filteredNavSettings
}
</script>

<template>
  <UiSidebar v-bind="props">
    <UiSidebarHeader>
      <UiSidebarMenu class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foregroundbg-accent">
        <UiSkeleton class="w-full h-8 rounded" v-if="loading" />
        <UiSidebarMenuItem v-else class="p-2 flex items-center gap-2">
          <NuxtImg class="w-8" :src="setting?.logo ? setting.logo : '/favicon.png'" alt="logo" />
          <span class="truncate font-semibold">{{ setting?.companyAbbr }}</span>
        </UiSidebarMenuItem>
      </UiSidebarMenu>
    </UiSidebarHeader>
    <UiSidebarSeparator />
    <UiSidebarContent>
      <NavMain :items="data.navMain" />
      <NavSettings :items="data.navSettings" />
    </UiSidebarContent>
    <UiSidebarFooter>
      <NavUser :user="data.user" />
    </UiSidebarFooter>
    <UiSidebarRail />
  </UiSidebar>
</template>
