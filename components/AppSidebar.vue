<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'

const { session } = useUserSession()

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const data = {
  user: {
    name: session.value?.user?.name as string,
    email: session.value?.user?.email as string,
    image: session.value?.user?.image || '/placeholder_profile.png',
    role: session.value?.user?.role
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'hugeicons:dashboard-square-03',
    },
    {
      title: 'Blog',
      url: '/dashboard/blogs',
      icon: 'carbon:blog',
    },
    {
      title: 'Fitur',
      url: '/dashboard/features',
      icon: 'solar:layers-line-duotone',
    },
    {
      title: 'Paket',
      url: '/dashboard/prices',
      icon: 'solar:tag-price-linear',
    },
    {
      title: 'Tim',
      url: '/dashboard/teams',
      icon: 'fluent:people-team-28-regular',
    },
    {
      title: 'Klien',
      url: '/dashboard/clients',
      icon: 'ph:handshake-fill',
    },
  ],
  navSettings : [
    {
      title: 'Saran',
      url: '/dashboard/suggestions',
      icon: 'material-symbols:note-stack-outline-rounded',
    },
    {
      title: 'Pengaturan',
      url: '/dashboard/settings',
      icon: 'material-symbols:settings-panorama-outline-rounded',
    },
  ]
}
</script>

<template>
  <UiSidebar v-bind="props">
    <UiSidebarHeader>
      <UiSidebarMenu class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foregroundbg-accent">
        <UiSidebarMenuItem class="p-2 flex items-center gap-2">
          <NuxtImg class="w-8" src="/favicon.png" alt="logo" />
          <span class="truncate font-semibold">Paperless</span>
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
