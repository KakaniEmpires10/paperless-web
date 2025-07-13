<script setup lang="ts">
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
} from 'lucide-vue-next'

import {
  useSidebar,
} from '@/components/ui/sidebar'

const props = defineProps<{
  user: {
    name: string
    email: string
    image: string
  }
}>()

const { isMobile } = useSidebar()
const { clear: clearSession } = useUserSession()

async function logout(){
  await clearSession()
  await navigateTo("/")
}
</script>

<template>
  <UiSidebarMenu>
    <UiSidebarMenuItem>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiSidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-border"
          >
            <UiAvatar class="h-8 w-8 rounded-lg">
              <UiAvatarImage :src="user.image" :alt="user.name" />
              <UiAvatarFallback class="rounded-lg">
                CN
              </UiAvatarFallback>
            </UiAvatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </UiSidebarMenuButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <UiDropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <UiAvatar class="h-8 w-8 rounded-lg">
                <UiAvatarImage :src="user.image" :alt="user.name" />
                <UiAvatarFallback class="rounded-lg">
                  CN
                </UiAvatarFallback>
              </UiAvatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuGroup>
            <UiDropdownMenuItem>
              <BadgeCheck />
              Account
            </UiDropdownMenuItem>
            <UiDropdownMenuItem>
              <Bell />
              Notifications
            </UiDropdownMenuItem>
          </UiDropdownMenuGroup>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem @click="logout">
            <LogOut />
            Log out
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </UiSidebarMenuItem>
  </UiSidebarMenu>
</template>
