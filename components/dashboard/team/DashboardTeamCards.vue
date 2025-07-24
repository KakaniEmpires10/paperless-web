<template>
  <UiCard class="gap-4 overflow-hidden pt-0">
    <div class="overflow-y-auto">
      <div class="h-28">
        <NuxtImg
          class="h-full w-full object-cover"
          src="/bg-profile.jpg"
          alt="User profile background"
          width="512"
          height="96" />
      </div>
      <div class="-mt-10 flex flex-col items-center justify-center gap-2">
        <div
          class="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
          <NuxtImg
            src="/placeholder_profile.png"
            class="h-full w-full object-cover"
            width="80"
            height="80"
            alt="Profile image" />
        </div>
        <div
          class="flex flex-col items-center justify-center gap-2 text-center">
          <h2 class="text-lg/none font-bold">{{ team.name }}</h2>
          <UiBadge variant="soft">
            {{ team.position }}
          </UiBadge>
          <p class="text-xs text-muted-foreground mt-3">
            {{ team.bio || "belum ada bio anggota" }}
          </p>
        </div>
      </div>
    </div>
    <UiCardContent class="flex flex-col gap-2 px-6">
      <div class="bg-muted/40 rounded-md text-muted-foreground px-3 py-1 border-l-3 border-l-primary flex items-center gap-2">
        <Icon name="lucide:mail" class="text-primary" />
        <p class="text-sm truncate">
          {{ team.email || "belum ada email" }}
        </p>
      </div>
      <div class="bg-muted/40 rounded-md text-muted-foreground px-3 py-1 border-l-3 border-l-primary flex items-center gap-2">
        <Icon name="lucide:phone" class="text-primary" />
        <p class="text-sm">
          {{ team.phone || "belum ada nomor telepon" }}
        </p>
      </div>
      <div class="flex justify-between gap-2 px-6 my-2">
        <NuxtLink
          :to="team.linkedin ?? '#'"
          class="flex items-center justify-center cursor-pointer">
          <Icon name="skill-icons:linkedin" class="text-xl" />
        </NuxtLink>
        <UiSeparator
          orientation="vertical"
          class="data-[orientation=vertical]:h-10" />
        <NuxtLink
          :to="team.instagram ?? '#'"
          class="flex items-center justify-center cursor-pointer">
          <Icon name="skill-icons:instagram" class="text-xl" />
        </NuxtLink>
        <UiSeparator
          orientation="vertical"
          class="data-[orientation=vertical]:h-10" />
        <NuxtLink
          :to="team.twitter ?? '#'"
          class="flex items-center justify-center cursor-pointer">
          <Icon name="fa6-brands:x-twitter" class="text-xl" />
        </NuxtLink>
      </div>
      <div class="flex item-center w-full gap-2">
        <UiButton @click="$emit('openDialog', team)" class="w-full" size="sm">
          <PencilLine /> Edit Profile
        </UiButton>
        <UiButton
          @click="handleDelete"
          class="w-full"
          variant="destructive"
          size="sm">
          <Trash2 /> Hapus
        </UiButton>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import { PencilLine, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { Team } from "~/server/db/schema";

const props = defineProps<{ team: Team }>();
const emit = defineEmits<{
  openDialog: [team?: Team]
  refresh: []
}>();

const storeDelete = useDeleteDialogStore();

const handleDelete = () => {
  storeDelete.openDialog({
    id: props.team.id,
    name: props.team.name,
    endpoint: '/api/team',
    title: 'Apakah Anda yakin?',
    description: `Aksi ini tidak dapat dibatalkan. Anda akan menghapus anggota tim "${props.team.name}" secara permanen.`,
    onSuccess: async () => {
      toast.success('Anggota tim berhasil dihapus.')
      emit('refresh')
    },
    onError: (error) => {
      toast.error('Gagal menghapus anggota tim.')
      console.error('Delete error:', (error as Error).message)
    }
  })
}
</script>
