<template>
  <UiSidebarProvider>
    <AppSidebar />
    <UiSidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <UiSidebarTrigger class="-ml-1" />
          <UiSeparator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <UiBreadcrumb>
            <UiBreadcrumbList>
              <UiBreadcrumbItem class="hidden md:block">
                <UiBreadcrumbLink href="#">
                  Building Your Application
                </UiBreadcrumbLink>
              </UiBreadcrumbItem>
              <UiBreadcrumbSeparator class="hidden md:block" />
              <UiBreadcrumbItem>
                <UiBreadcrumbPage>Data Fetching</UiBreadcrumbPage>
              </UiBreadcrumbItem>
            </UiBreadcrumbList>
          </UiBreadcrumb>
        </div>
      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </main>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts">
  export const description
  = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>