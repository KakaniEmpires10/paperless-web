<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";

// Get current route
const route = useRoute();

// get setting
const settingStore = useSettingStore();
const { setting, loading } = storeToRefs(settingStore);

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/features", label: "Fitur" },
  { href: "/pricing", label: "Paket" },
  { href: "/contact", label: "Kontak" },
];

// Function to check if link is active
const isLinkActive = (href: string) => {
  if (href === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(href);
};

// Track scroll position
const { y } = useWindowScroll();

// Define scroll threshold (adjust as needed)
const scrollThreshold = 100;

// Computed property to determine if header should be sticky
const isSticky = computed(() => y.value > scrollThreshold);

// Motion-V variants for header animation
const headerVariants = {
  hidden: {
    opacity: 0,
    y: -16,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

// Motion-V variants for hamburger menu animation
const hamburgerVariants = {
  closed: {
    rotate: 0,
  },
  open: {
    rotate: 45,
  },
};

// Motion-V variants for mobile menu items
const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

// Stagger animation for mobile menu items
const menuContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
</script>

<template>
  <!-- Placeholder to maintain space when header becomes fixed -->
  <Motion
    v-if="isSticky"
    :animate="{ opacity: 1, height: 'auto' }"
    :initial="{ opacity: 0, height: 0 }"
    :transition="{ duration: 0.3, ease: 'easeOut' }"
    class="h-16 border-b container mx-auto px-4 md:px-6"
    aria-hidden="true" />

  <!-- Sticky Header -->
  <Motion
    v-if="isSticky"
    key="sticky"
    :variants="headerVariants"
    :initial="'hidden'"
    :animate="'visible'"
    :exit="'hidden'"
    :transition="{
      duration: 0.3,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }"
    class="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-7xl mx-auto px-4 md:px-6 z-50">
    <div
      class="flex h-16 items-center justify-between gap-4 border rounded-lg backdrop-blur-md bg-background/80 shadow-lg px-4 md:px-6">
      <!-- Left side -->
      <div class="flex items-center gap-2">
        <!-- Mobile menu trigger -->
        <UiPopover>
          <UiPopoverTrigger as-child>
            <Motion
              :whileTap="{ scale: 0.95 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
              <UiButton
                class="group size-8 md:hidden"
                variant="ghost"
                size="icon">
                <svg
                  class="pointer-events-none"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 12L20 12"
                    class="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                  <path
                    d="M4 12H20"
                    class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path
                    d="M4 12H20"
                    class="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                </svg>
              </UiButton>
            </Motion>
          </UiPopoverTrigger>
          <UiPopoverContent align="start" class="w-36 p-1 md:hidden">
            <Motion
              :variants="menuContainerVariants"
              :initial="'hidden'"
              :animate="'visible'"
              :exit="'hidden'">
              <UiNavigationMenu class="max-w-none *:w-full">
                <UiNavigationMenuList
                  class="flex-col items-start gap-0 md:gap-2">
                  <Motion
                    v-for="(link, index) in navigationLinks"
                    :key="index"
                    :variants="menuItemVariants"
                    :custom="index"
                    tag="div"
                    class="w-full">
                    <UiNavigationMenuItem class="w-full">
                      <UiNavigationMenuLink
                        as-child
                        class="py-1.5"
                        :active="isLinkActive(link.href)">
                        <NuxtLink :to="link.href">
                          {{ link.label }}
                        </NuxtLink>
                      </UiNavigationMenuLink>
                    </UiNavigationMenuItem>
                  </Motion>
                </UiNavigationMenuList>
              </UiNavigationMenu>
            </Motion>
          </UiPopoverContent>
        </UiPopover>

        <!-- Main nav -->
        <div class="flex items-center gap-6">
          <Motion
            :whileHover="{ scale: 1.1, rotate: 20 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
            <NuxtLink to="/">
              <NuxtImg
                class="w-10"
                :src="setting?.logo ? setting.logo : '/favicon.png'"
                alt="logo" />
            </NuxtLink>
          </Motion>

          <!-- Navigation menu -->
          <UiNavigationMenu class="max-md:hidden">
            <UiNavigationMenuList class="gap-2">
              <Motion
                v-for="(link, index) in navigationLinks"
                :key="index"
                :initial="{ opacity: 0, y: -10 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: 'easeOut',
                }"
                tag="div">
                <UiNavigationMenuItem>
                  <UiNavigationMenuLink
                    as-child
                    :active="isLinkActive(link.href)"
                    class="text-muted-foreground hover:text-primary py-1.5 font-medium">
                    <NuxtLink :to="link.href">
                      {{ link.label }}
                    </NuxtLink>
                  </UiNavigationMenuLink>
                </UiNavigationMenuItem>
              </Motion>
            </UiNavigationMenuList>
          </UiNavigationMenu>
        </div>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-2">
        <AuthState>
          <template #default="{ loggedIn, clear }">
            <Motion
              v-if="loggedIn"
              :whileHover="{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              }"
              :whileTap="{ scale: 0.95 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
              <UiButton size="sm" variant="outline" @click="clear"
                >Logout</UiButton
              >
            </Motion>
            <Motion
              :whileHover="{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              }"
              v-else
              :whileTap="{ scale: 0.95 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
              <UiButton size="sm" variant="outline" as-child>
                <NuxtLink to="/login">Login</NuxtLink>
              </UiButton>
            </Motion>
          </template>
          <template #placeholder>
            <UiButton variant="ghost" disabled>Loading...</UiButton>
          </template>
        </AuthState>
        <!-- <Motion
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
          <UiButton as-child variant="ghost" size="sm" class="text-sm">
            <NuxtLink href="#"><Icon  name="catppuccin:folder-docs"/> Dokumentasi</NuxtLink>
          </UiButton>
        </Motion> -->
        <Motion
          :whileHover="{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }"
          :whileTap="{ scale: 0.95 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
          <UiButton as-child size="sm" class="text-sm">
            <NuxtLink href="/contact"
              ><Icon name="lucide:phone" /> Hubungin Kami</NuxtLink
            >
          </UiButton>
        </Motion>
      </div>
    </div>
  </Motion>

  <!-- Regular Header -->
  <Motion
    :animate="{
      opacity: isSticky ? 0 : 1,
      scale: isSticky ? 0.95 : 1,
      y: isSticky ? -10 : 0,
    }"
    :transition="{
      duration: 0.3,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }"
    class="container mx-auto px-4 md:px-6">
    <div
      class="flex h-16 items-center justify-between gap-4"
      :class="[
        isSticky
          ? 'rounded-lg backdrop-blur-md bg-background/80 shadow-lg px-4 md:px-6'
          : 'border-b',
      ]">
      <!-- Left side -->
      <div class="flex items-center gap-2">
        <!-- Mobile menu trigger -->
        <UiPopover>
          <UiPopoverTrigger as-child>
            <Motion
              :whileTap="{ scale: 0.95 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
              <UiButton
                class="group size-8 md:hidden"
                variant="ghost"
                size="icon">
                <svg
                  class="pointer-events-none"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 12L20 12"
                    class="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                  <path
                    d="M4 12H20"
                    class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path
                    d="M4 12H20"
                    class="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                </svg>
              </UiButton>
            </Motion>
          </UiPopoverTrigger>
          <UiPopoverContent align="start" class="w-36 p-1 md:hidden">
            <Motion
              :variants="menuContainerVariants"
              :initial="'hidden'"
              :animate="'visible'"
              :exit="'hidden'">
              <UiNavigationMenu class="max-w-none *:w-full">
                <UiNavigationMenuList
                  class="flex-col items-start gap-0 md:gap-2">
                  <Motion
                    v-for="(link, index) in navigationLinks"
                    :key="index"
                    :variants="menuItemVariants"
                    :custom="index"
                    tag="div"
                    class="w-full">
                    <UiNavigationMenuItem class="w-full">
                      <UiNavigationMenuLink
                        as-child
                        class="py-1.5"
                        :active="isLinkActive(link.href)">
                        <NuxtLink :to="link.href">
                          {{ link.label }}
                        </NuxtLink>
                      </UiNavigationMenuLink>
                    </UiNavigationMenuItem>
                  </Motion>
                </UiNavigationMenuList>
              </UiNavigationMenu>
            </Motion>
          </UiPopoverContent>
        </UiPopover>

        <!-- Main nav -->
        <div class="flex items-center gap-6">
          <Motion
            :whileHover="{ scale: 1.1, rotate: 20 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
            <NuxtLink to="/">
              <NuxtImg
                class="w-10"
                :src="setting?.logo ? setting.logo : '/favicon.png'"
                alt="logo" />
            </NuxtLink>
          </Motion>

          <!-- Navigation menu -->
          <UiNavigationMenu class="max-md:hidden">
            <UiNavigationMenuList class="gap-2">
              <Motion
                v-for="(link, index) in navigationLinks"
                :key="index"
                :initial="{ opacity: 0, y: -10 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: 'easeOut',
                }"
                tag="div">
                <UiNavigationMenuItem>
                  <UiNavigationMenuLink
                    as-child
                    :active="isLinkActive(link.href)"
                    class="text-muted-foreground hover:text-primary py-1.5 font-medium">
                    <NuxtLink :to="link.href">
                      {{ link.label }}
                    </NuxtLink>
                  </UiNavigationMenuLink>
                </UiNavigationMenuItem>
              </Motion>
            </UiNavigationMenuList>
          </UiNavigationMenu>
        </div>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-2">
        <AuthState>
          <template #default="{ loggedIn, clear }">
            <Motion
              v-if="loggedIn"
              :whileHover="{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              }"
              :whileTap="{ scale: 0.95 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
              <UiButton size="sm" variant="outline" @click="clear"
                >Logout</UiButton
              >
            </Motion>
            <Motion
              :whileHover="{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              }"
              v-else
              :whileTap="{ scale: 0.95 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
              <UiButton size="sm" variant="outline" as-child>
                <NuxtLink to="/login">Login</NuxtLink>
              </UiButton>
            </Motion>
          </template>
          <template #placeholder>
            <UiButton variant="ghost" disabled>Loading...</UiButton>
          </template>
        </AuthState>
        <!-- <Motion
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
          <UiButton as-child variant="ghost" size="sm" class="text-sm">
            <NuxtLink href="#"><Icon name="catppuccin:folder-docs" /> Dokumentasi</NuxtLink>
          </UiButton>
        </Motion> -->
        <Motion
          :whileHover="{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }"
          :whileTap="{ scale: 0.95 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
          <UiButton as-child size="sm" class="text-sm">
            <NuxtLink href="/contact"
              ><Icon name="lucide:phone" /> Hubungin Kami</NuxtLink
            >
          </UiButton>
        </Motion>
      </div>
    </div>
  </Motion>
</template>
