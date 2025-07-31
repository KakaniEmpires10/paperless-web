<template>
  <div class="space-y-6">
    <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
      <UiCardHeader class="border-b border-gray-200/50">
        <div class="flex items-center justify-between">
          <div>
            <UiCardTitle class="text-lg font-semibold">Team Members</UiCardTitle>
            <UiCardDescription>Manage your team members and their roles</UiCardDescription>
          </div>
          <UiButton class="bg-blue-600 hover:bg-blue-700">
            <Plus class="w-4 h-4 mr-2" />
            Add Member
          </UiButton>
        </div>
      </UiCardHeader>

      <UiCardContent class="p-0">
        <UiTable>
          <UiTableHeader>
            <UiTableRow class="bg-gray-50/50">
              <UiTableHead class="font-semibold">User</UiTableHead>
              <UiTableHead class="font-semibold">Email</UiTableHead>
              <UiTableHead class="font-semibold">Role</UiTableHead>
              <UiTableHead class="font-semibold">Status</UiTableHead>
              <UiTableHead class="font-semibold">Actions</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow
              v-for="user in users"
              :key="user.id"
              class="hover:bg-white/50 transition-colors"
            >
              <UiTableCell>
                <div class="flex items-center space-x-3">
                  <UiAvatar class="bg-gradient-to-r from-blue-500 to-purple-500">
                    <UiAvatarFallback class="text-white text-sm font-medium">
                      {{ user.initials }}
                    </UiAvatarFallback>
                  </UiAvatar>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell class="text-sm text-gray-600">{{ user.email }}</UiTableCell>
              <UiTableCell>
                <UiBadge variant="secondary" class="bg-blue-100 text-blue-800">
                  {{ user.role }}
                </UiBadge>
              </UiTableCell>
              <UiTableCell>
                <UiBadge
                  :variant="user.status === 'Active' ? 'success' : 'destructive'"
                  :class="user.status === 'Active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-red-100 text-red-800'"
                >
                  {{ user.status }}
                </UiBadge>
              </UiTableCell>
              <UiTableCell>
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="sm" class="h-8 w-8 p-0">
                      <MoreHorizontal class="h-4 w-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="end">
                    <UiDropdownMenuLabel>Actions</UiDropdownMenuLabel>
                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem>
                      <Edit class="mr-2 h-4 w-4" />
                      Edit user
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                      <Mail class="mr-2 h-4 w-4" />
                      Send email
                    </UiDropdownMenuItem>
                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem class="text-red-600">
                      <Trash2 class="mr-2 h-4 w-4" />
                      Delete user
                    </UiDropdownMenuItem>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
    </UiCard>

    <!-- User Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardContent class="p-6 text-center">
          <Users class="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <UiCardTitle class="text-2xl font-bold text-gray-900">{{ totalUsers }}</UiCardTitle>
          <UiCardDescription>Total Users</UiCardDescription>
        </UiCardContent>
      </UiCard>

      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardContent class="p-6 text-center">
          <UserCheck class="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <UiCardTitle class="text-2xl font-bold text-gray-900">{{ activeUsers }}</UiCardTitle>
          <UiCardDescription>Active Users</UiCardDescription>
        </UiCardContent>
      </UiCard>

      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardContent class="p-6 text-center">
          <Shield class="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <UiCardTitle class="text-2xl font-bold text-gray-900">{{ adminUsers }}</UiCardTitle>
          <UiCardDescription>Admins</UiCardDescription>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus,
  MoreHorizontal,
  Edit,
  Mail,
  Trash2,
  Users,
  UserCheck,
  Shield,
} from "lucide-vue-next";

const users = ref([
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    initials: "JS",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Editor",
    status: "Active",
    initials: "SJ",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike@example.com",
    role: "User",
    status: "Inactive",
    initials: "MW",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Editor",
    status: "Active",
    initials: "ED",
  },
]);

const totalUsers = computed(() => users.value.length);
const activeUsers = computed(() => users.value.filter(user => user.status === 'Active').length);
const adminUsers = computed(() => users.value.filter(user => user.role === 'Admin').length);
</script>