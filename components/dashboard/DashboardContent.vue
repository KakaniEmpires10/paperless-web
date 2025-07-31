<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UiCard
        v-for="content in contentTypes"
        :key="content.title"
        class="group bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
        <UiCardContent class="p-6">
          <UiAvatar
            :class="[
              'w-12 h-12 mb-4 flex justify-center items-center transition-transform group-hover:scale-110',
              content.iconBg,
            ]">
            <component
              :is="content.icon"
              :class="['w-5 h-5', content.iconColor]" />
          </UiAvatar>

          <UiCardTitle class="font-semibold text-gray-900 mb-2">{{
            content.title
          }}</UiCardTitle>
          <UiCardDescription class="text-sm text-gray-600 mb-4">{{
            content.description
          }}</UiCardDescription>

          <UiButton
            variant="link"
            size="sm"
            :class="[
              'text-sm font-medium transition-colors flex items-center p-0 h-auto',
              content.buttonColor,
            ]">
            {{ content.action }}
            <ArrowRight class="w-4 h-4 ml-1" />
          </UiButton>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Content Management Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardHeader>
          <UiCardTitle>Recent Content</UiCardTitle>
          <UiCardDescription
            >Latest content updates and publications</UiCardDescription
          >
        </UiCardHeader>
        <UiCardContent>
          <div class="space-y-4">
            <div
              v-for="item in recentContent"
              :key="item.id"
              class="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg hover:bg-white/50 transition-colors">
              <div class="flex items-center space-x-3">
                <UiBadge
                  :variant="
                    item.type === 'blog'
                      ? 'soft'
                      : item.type === 'page'
                        ? 'success'
                        : 'warning'
                  ">
                  {{ item.type }}
                </UiBadge>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ item.title }}
                  </p>
                  <p class="text-xs text-gray-500">{{ item.date }}</p>
                </div>
              </div>
              <UiButton variant="ghost" size="sm">
                <Edit class="w-4 h-4" />
              </UiButton>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardHeader>
          <UiCardTitle>Quick Actions</UiCardTitle>
          <UiCardDescription>Common content management tasks</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="space-y-3">
            <UiButton class="w-full justify-start" variant="outline">
              <Plus class="w-4 h-4 mr-2" />
              Create New Post
            </UiButton>
            <UiButton class="w-full justify-start" variant="outline">
              <Upload class="w-4 h-4 mr-2" />
              Upload Media
            </UiButton>
            <UiButton class="w-full justify-start" variant="outline">
              <FolderPlus class="w-4 h-4 mr-2" />
              Create Category
            </UiButton>
            <UiButton class="w-full justify-start" variant="outline">
              <Settings class="w-4 h-4 mr-2" />
              Content Settings
            </UiButton>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  FileText,
  Image,
  Globe,
  ArrowRight,
  Edit,
  Plus,
  Upload,
  FolderPlus,
  Settings,
} from "lucide-vue-next";

const contentTypes = ref([
  {
    title: "Blog Posts",
    description: "Create and manage company blog content",
    action: "Manage Posts",
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    buttonColor: "text-blue-600 hover:text-blue-700",
  },
  {
    title: "Media Library",
    description: "Upload and organize images and files",
    action: "View Library",
    icon: Image,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    buttonColor: "text-emerald-600 hover:text-emerald-700",
  },
  {
    title: "Website Pages",
    description: "Edit and update website content",
    action: "Edit Pages",
    icon: Globe,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    buttonColor: "text-purple-600 hover:text-purple-700",
  },
]);

const recentContent = ref([
  {
    id: 1,
    title: "Company Update: Q4 Results",
    type: "blog",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "About Us Page",
    type: "page",
    date: "1 day ago",
  },
  {
    id: 3,
    title: "Product Launch Announcement",
    type: "blog",
    date: "3 days ago",
  },
  {
    id: 4,
    title: "Contact Page",
    type: "page",
    date: "1 week ago",
  },
]);
</script>
