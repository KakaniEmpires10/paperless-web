<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'

const { session } = useUserSession()

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const route = useRoute()

// Function to check if a menu item is active
const isActiveMenuItem = (itemUrl: string, hasChildren: boolean = false) => {
  if (hasChildren) {
    // For items with children, check if current route starts with the item URL
    return route.path.startsWith(itemUrl)
  } else {
    // For items without children, check exact match or child routes
    return route.path === itemUrl || route.path.startsWith(itemUrl + '/')
  }
}

// Function to check if a sub-menu item is active
const isActiveSubMenuItem = (subItemUrl: string) => {
  return route.path === subItemUrl || route.path.startsWith(subItemUrl + '/')
}

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
      title: 'Pricing',
      url: '/dashboard/prices',
      icon: 'solar:tag-price-linear',
    },
    {
      title: 'Team',
      url: '/dashboard/teams',
      icon: 'fluent:people-team-28-regular',
    },
    {
      title: 'Client',
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
      title: 'Settings',
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
