<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <!-- Home -->
      <UiBreadcrumbItem class="hidden md:block">
        <UiBreadcrumbLink as-child>
          <NuxtLink class="flex justify-center items-center" to="/">
            <Icon
              name="material-symbols:house-outline-rounded"
              class="text-base" />
          </NuxtLink>
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>
      
      <!-- Dynamic breadcrumb items -->
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
        <UiBreadcrumbSeparator class="hidden md:block" />
        <UiBreadcrumbItem>
          <!-- If not the last item, make it a link -->
          <UiBreadcrumbLink 
            v-if="index < breadcrumbs.length - 1" 
            as-child>
            <NuxtLink :to="crumb.path">
              {{ crumb.label }}
            </NuxtLink>
          </UiBreadcrumbLink>
          <!-- Last item is not a link -->
          <UiBreadcrumbPage v-else>
            {{ crumb.label }}
          </UiBreadcrumbPage>
        </UiBreadcrumbItem>
      </template>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  path: string;
}

// Dynamic route labels for IDs (like /team/123)
const getDynamicLabel = (segment: string, fullPath: string): string => {
  // Check if it's a numeric ID
  if (/^\d+$/.test(segment)) {
    // You can customize this based on the parent route
    if (fullPath.includes('/team/')) return `Member #${segment}`;
    if (fullPath.includes('/project/')) return `Project #${segment}`;
    if (fullPath.includes('/user/')) return `User #${segment}`;
    return `ID: ${segment}`;
  }
  
  // Check if it's a UUID or other ID format
  if (segment.length > 10 && (segment.includes('-') || /^[a-zA-Z0-9]+$/.test(segment))) {
    if (fullPath.includes('/team/')) return `Member Details`;
    if (fullPath.includes('/project/')) return `Project Details`;
    if (fullPath.includes('/user/')) return `User Details`;
    return 'Details';
  }
  
  return segment;
};

const route = useRoute();

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const pathSegments = route.path.split('/').filter(segment => segment !== '');
  const crumbs: BreadcrumbItem[] = [];
  
  // Build breadcrumbs from path segments
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    const path = '/' + pathSegments.slice(0, i + 1).join('/');
    
    // Get label from mapping or use dynamic label
    const label = getDynamicLabel(segment, route.path);
    
    // Capitalize first letter if not in mapping
    const finalLabel = label.charAt(0).toUpperCase() + label.slice(1);
    
    crumbs.push({
      label: finalLabel,
      path: path
    });
  }
  
  return crumbs;
});
</script>