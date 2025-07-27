<template>
  <UiDialog :open="props.isOpen" @update:open="emit('update:open', $event)">
    <UiDialogContent class="sm:max-w-xl">
      <UiDialogHeader>
        <UiDialogTitle>Detail Pesan</UiDialogTitle>
        <UiDialogDescription>
          Berikut detail pesan yang dikirim dari halaman kontak pada landing page
        </UiDialogDescription>
      </UiDialogHeader>
      <dl class="grid grid-cols-[70px_2px_1fr] gap-x-3 gap-y-1 text-sm border-y-1 py-4">
        <dt class="font-semibold tracking-tight">Nama</dt>
        <span>:</span>
        <dd>{{ contactMessages?.name }}</dd>
        <dt class="font-semibold tracking-tight">Email</dt>
        <span>:</span>
        <dd>{{ contactMessages?.email }}</dd>
        <dt class="font-semibold tracking-tight">Instansi</dt>
        <span>:</span>
        <dd>{{ contactMessages?.hospitalName }}</dd>
      </dl>
      <div class="space-y-2">
        <UiLabel class="font-semibold" for="detail_pesan">Detail Pesan</UiLabel>
        <UiTextarea readonly row="5" id="detail_pesan" :default-value="contactMessages?.message" />
      </div>
      <UiDialogFooter>
        <UiButton variant="outline" @click="$emit('close')">Cancel</UiButton>
        <UiButton as-child>
          <a :href="`mailto:${contactMessages?.email}`">
            <Mail class="size-4" />  Balas Email
          </a>
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
import { Mail } from 'lucide-vue-next';
import type { ContactMessages } from '~/server/db/schema';

const props = defineProps<{
  isOpen: boolean;
  contactMessages: ContactMessages | null;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
  refresh: [];
}>();
</script>