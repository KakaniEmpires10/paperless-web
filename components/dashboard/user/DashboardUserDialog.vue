<script setup lang="ts">
import { toast } from "vue-sonner";
import { cn } from "@/lib/utils";
import {
  userCreateSchema,
  userUpdateSchema,
  getInitialValues,
  type User,
} from "./user.constant";

const props = defineProps<{
  isOpen: boolean;
  user: User | null;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
  refresh: [];
}>();

const loading = ref(false);
const selectOpen = ref(false);
const selectedReference = ref("");

const userSchema = !!props.user ? userUpdateSchema : userCreateSchema;

const cardHeader = computed(() => {
  return {
    title: !!props.user ? "Edit User" : "Tambah User",
    description: !!props.user
      ? "Lakukan perubahan pada user di sini. Anda dapat mengatur informasi dan role user"
      : "Tambah user di sini. Anda dapat memilih dari team/client yang ada atau menambah user baru",
  };
});

// Fetch team and client data
type TeamMember = { id: string; name: string; email: string; position: string };
type ClientMember = { id: string; name: string; email: string };

const { data: teamList, pending: teamPending } = await useLazyFetch<
  TeamMember[]
>("/api/team", {
  transform: (data: any[]) =>
    data.map(({ id, name, email, position }) => ({
      id,
      name,
      email,
      position,
    })),
});

const { data: clientList, pending: clientPending } = await useLazyFetch<
  ClientMember[]
>("/api/clients", {
  transform: (data: any[]) =>
    data.map(({ id, name, email }) => ({
      id,
      name,
      email,
    })),
});

const pending = computed(() => teamPending.value || clientPending.value);

// Combine team and client data for the select
const referenceOptions = computed(() => {
  const options = [];

  if (teamList.value?.length) {
    options.push({
      group: "Team",
      items: teamList.value.map(member => ({
        value: `team-${member.id}`,
        label: `${member.name} (${member.position})`,
        email: member.email,
        name: member.name,
        type: "team",
      })),
    });
  }

  if (clientList.value?.length) {
    options.push({
      group: "Client",
      items: clientList.value.map(client => ({
        value: `client-${client.id}`,
        label: client.name,
        email: client.email,
        name: client.name,
        type: "client",
      })),
    });
  }

  return options;
});

const selectedReferenceData = computed(() => {
  if (!selectedReference.value) return null;

  for (const group of referenceOptions.value) {
    const item = group.items.find(
      item => item.value === selectedReference.value
    );
    if (item) return item;
  }
  return null;
});

const cardBtn = computed(() => {
  return {
    icon: !!props.user
      ? "mingcute:pencil-2-line"
      : "flowbite:floppy-disk-solid",
    saveBtnText: !!props.user ? "Update" : "Simpan",
  };
});

const initialValues = computed(() => getInitialValues(props.user));

// Form fields that will be controlled
const formData = ref({
  name: "",
  email: "",
  role: "",
  isActive: true,
});

// Watch for reference selection changes
watch(
  selectedReferenceData,
  newData => {
    if (newData) {
      formData.value.name = newData.name;
      formData.value.email = newData.email;
      formData.value.role = newData.type === "team" ? "dev" : "client";
    }
  },
  { immediate: true }
);

// Watch initial values
watch(
  initialValues,
  newValues => {
    if (newValues) {
      formData.value = { ...newValues };
    }
  },
  { immediate: true }
);

function handleReferenceSelect(currentValue: string) {
  selectedReference.value =
    currentValue === selectedReference.value ? "" : currentValue;
  selectOpen.value = false;
}

const onSubmit = async (values: any) => {
  loading.value = true;

  let res;

  try {
    const submitData = {
      ...values,
      ...formData.value,
    };

    if (!!props.user) {
      res = await $fetch(`/api/users/${props.user.id}`, {
        method: "PUT",
        body: submitData,
      });
    } else {
      res = await $fetch("/api/auth/sign-up", {
        method: "POST",
        body: submitData,
      });
    }

    if (res?.message) {
      emit("refresh");
      toast.success(res?.message);
      emit("close");
    }
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat menyimpan user"
    );
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UiForm
    v-slot="{ handleSubmit }"
    :initial-values="initialValues"
    :key="props.user?.id || 'new'"
    as=""
    keep-values
    :validation-schema="userSchema">
    <UiDialog :open="props.isOpen" @update:open="emit('update:open', $event)">
      <UiDialogContent
        class="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <UiDialogHeader class="text-left border-b px-6 py-4">
          <UiDialogTitle class="text-base">
            {{ cardHeader.title }}
          </UiDialogTitle>
          <UiDialogDescription>
            {{ cardHeader.description }}
          </UiDialogDescription>
        </UiDialogHeader>
        <div class="px-6 pt-4 pb-6">
          <form
            class="space-y-4"
            id="dialogUserForm"
            @submit="handleSubmit($event, onSubmit)">
            <!-- Reference Selection (Team/Client) -->
            <div class="space-y-2" v-if="!props.user">
              <UiLabel>Pilih dari Team/Client (Opsional)</UiLabel>

              <!-- Loading State -->
              <template v-if="pending">
                <UiSkeleton class="h-10 w-full rounded-md" />
                <p class="text-xs text-muted-foreground">
                  Loading data team dan client...
                </p>
              </template>

              <!-- Error State -->
              <template v-else-if="!teamList && !clientList">
                <div class="rounded-md border px-4 py-3">
                  <p class="text-sm flex items-center gap-2">
                    <Icon
                      name="lucide:circle-alert"
                      class="text-red-500"
                      size="16" />
                    Terjadi Error Dalam Pengambilan Data. Coba lagi dalam
                    beberapa saat 🙏
                  </p>
                </div>
              </template>

              <!-- Normal State -->
              <template v-else>
                <UiPopover v-model:open="selectOpen">
                  <UiPopoverTrigger as-child>
                    <UiButton
                      variant="outline"
                      role="combobox"
                      :aria-expanded="selectOpen"
                      class="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]">
                      <span
                        :class="
                          cn(
                            'truncate',
                            !selectedReference && 'text-muted-foreground'
                          )
                        ">
                        {{
                          selectedReferenceData?.label ||
                          "Pilih dari Team/Client atau buat baru"
                        }}
                      </span>
                      <Icon
                        name="lucide:chevron-down"
                        :size="16"
                        class="text-muted-foreground/80 shrink-0"
                        aria-hidden="true" />
                    </UiButton>
                  </UiPopoverTrigger>
                  <UiPopoverContent
                    class="border-input w-full min-w-[var(--reka-popper-anchor-width)] p-0"
                    align="start">
                    <UiCommand>
                      <UiCommandInput placeholder="Cari team atau client..." />
                      <UiCommandList>
                        <UiCommandEmpty
                          >Tidak ada data ditemukan.</UiCommandEmpty
                        >

                        <template
                          v-for="group in referenceOptions"
                          :key="group.group">
                          <UiCommandGroup :heading="group.group">
                            <UiCommandItem
                              v-for="item in group.items"
                              :key="item.value"
                              :value="item.value"
                              @select="handleReferenceSelect(item.value)">
                              <div class="flex flex-col">
                                <span>{{ item.label }}</span>
                                <span class="text-xs text-muted-foreground">{{
                                  item.email
                                }}</span>
                              </div>
                              <Icon
                                v-if="selectedReference === item.value"
                                name="lucide:check"
                                :size="16"
                                class="ml-auto" />
                            </UiCommandItem>
                          </UiCommandGroup>
                        </template>
                      </UiCommandList>
                    </UiCommand>
                  </UiPopoverContent>
                </UiPopover>

                <p class="text-xs text-muted-foreground">
                  Pilih dari team/client yang sudah ada atau kosongkan untuk
                  membuat user baru
                </p>
              </template>
            </div>

            <UiFormField v-slot="{ componentField }" name="name">
              <UiFormItem>
                <UiFormLabel>Nama</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    placeholder="Nama lengkap user"
                    v-bind="componentField"
                    v-model="formData.name" />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <UiFormField v-slot="{ componentField }" name="email">
                <UiFormItem>
                  <UiFormLabel>Email</UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      type="email"
                      placeholder="user@email.com"
                      v-bind="componentField"
                      v-model="formData.email" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="role">
                <UiFormItem>
                  <UiFormLabel>Role</UiFormLabel>
                  <UiFormControl>
                    <UiSelect v-bind="componentField" v-model="formData.role">
                      <UiSelectTrigger class="w-full">
                        <UiSelectValue placeholder="Pilih Role" />
                      </UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectItem value="client">Client</UiSelectItem>
                        <UiSelectItem value="dev">Developer</UiSelectItem>
                        <UiSelectItem value="admin">Admin</UiSelectItem>
                        <UiSelectItem value="superadmin"
                          >Super Admin</UiSelectItem
                        >
                      </UiSelectContent>
                    </UiSelect>
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
            </div>

            <UiFormField v-if="!!props.user !== true" v-slot="{ componentField }" name="password">
              <UiFormItem>
                <UiFormLabel>
                  Password
                </UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="password"
                    placeholder="••••••••"
                    v-bind="componentField" />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField
              v-slot="{ handleChange, value }"
              type="checkbox"
              name="isActive">
              <UiFormItem
                class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <UiFormLabel class="text-base"> User Aktif? </UiFormLabel>
                  <UiFormDescription>
                    Centang jika user masih aktif dan dapat login
                  </UiFormDescription>
                </div>
                <UiFormControl>
                  <UiSwitch
                    :model-value="formData.isActive"
                    @update:model-value="
                      val => {
                        handleChange(val);
                        formData.isActive = val;
                      }
                    " />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>
          </form>
        </div>
        <UiDialogFooter class="border-t px-6 py-4">
          <UiDialogClose asChild>
            <UiButton type="button" variant="outline">Cancel</UiButton>
          </UiDialogClose>
          <UiButton
            :disabled="loading"
            :aria-disabled="loading"
            type="submit"
            form="dialogUserForm"
            ><Icon
              :name="loading ? 'svg-spinners:3-dots-bounce' : cardBtn.icon"
              class="text-lg" />
            {{ loading ? "menyimpan..." : cardBtn.saveBtnText }}</UiButton
          >
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </UiForm>
</template>
