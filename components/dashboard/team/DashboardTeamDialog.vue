<script setup lang="ts">
import { useObjectUrl } from "@vueuse/core";
import { LucideImagePlus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { getInitialValues, roleOptions, teamSchema, type Team } from "./team.constant";
import { toast } from "vue-sonner";

const props = defineProps<{
  isOpen: boolean;
  team: Team | null;
  test?: string
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
  refresh: [];
}>();

const cardHeader = computed(() => {
  return {
    title: !!props.team ? "Edit Tim" : "Tambah Tim",
    description: !!props.team
      ? "Lakukan perubahan pada tim anda di sini. Anda dapat mengganti foto dan mengatur nama anggota tim"
      : "Tambah tim anda di sini. Anda dapat menambah foto dan mengatur nama anggota tim",
  };
});

const cardBtn = computed(() => {
  return {
    icon: !!props.team
      ? "mingcute:pencil-2-line"
      : "flowbite:floppy-disk-solid",
    saveBtnText: !!props.team ? "Update" : "Simpan",
  };
});

const initialValues = computed(() => getInitialValues(props.team));

const bioText = ref(initialValues.value.bio || "");
const maxLength = 250;

const charactersRemaining = computed(() => maxLength - bioText.value.length);

// Cover upload functionality
// const coverInputRef = useTemplateRef("coverInputRef");
const coverFile = ref<File | null>(null);
const coverPreviewUrl = useObjectUrl(coverFile);
const hideDefault = ref(false);

// const handleCoverChange = (e: Event) => {
//   const target = e.target as HTMLInputElement;
//   coverFile.value = target.files?.[0] || null;
// };

// const handleRemove = () => {
//   coverFile.value = null;
//   hideDefault.value = true;
//   if (coverInputRef.value) {
//     coverInputRef.value.value = "";
//   }
// };

// Avatar upload functionality
const avatarFileInputRef = useTemplateRef("avatarFileInputRef");
const avatarFile = ref<File | null>(null);
const avatarPreviewUrl = useObjectUrl(avatarFile);

const handleAvatarFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  avatarFile.value = target.files?.[0] || null;
};

const handleAvatarThumbnailClick = () => {
  avatarFileInputRef.value?.click();
};

const onSubmit = async (values: any) => {
  let res;
  
  try {
    if (!!props.team) {
      res = await $fetch(`/api/team/${props.team.id}`, {
        method: "PUT",
        body: {
          ...values
        }
      })
    } else {
      res = await $fetch("/api/team", {
        method: "POST",
        body: {
          ...values,
        },
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
        : "Terjadi kesalahan saat menyimpan tim"
    );
  }
};
</script>

<template>
  <UiForm
    v-slot="{ handleSubmit }"
    :initial-values="initialValues"
    :key="props.team?.id || 'new'"
    as=""
    keep-values
    :validation-schema="teamSchema">
    <UiDialog :open="props.isOpen" @update:open="emit('update:open', $event)">
      <UiDialogContent
        class="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-xl [&>button:last-child]:top-3.5">
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle class="border-b px-6 py-4 text-base">
            {{ cardHeader.title }}
            {{ test }}
          </UiDialogTitle>
        </UiDialogHeader>
        <UiDialogDescription class="sr-only">
          {{ cardHeader.description }}
        </UiDialogDescription>
        <div class="overflow-y-auto">
          <!-- Profile Background -->
          <div class="h-32">
            <div
              class="bg-muted relative flex h-full w-full items-center justify-center overflow-hidden">
              <NuxtImg
                v-if="coverPreviewUrl || (!hideDefault && '/bg-profile.jpg')"
                class="h-full w-full object-cover"
                :src="coverPreviewUrl || '/bg-profile.jpg'"
                :alt="
                  coverPreviewUrl
                    ? 'Preview of uploaded image'
                    : 'Default profile background'
                "
                width="512"
                height="96" />
              <!-- <div
                class="absolute inset-0 flex items-center justify-center gap-2"
              >
                <button
                  type="button"
                  class="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                  @click="() => coverInputRef?.click()"
                  :aria-label="
                    coverPreviewUrl || !hideDefault
                      ? 'Change image'
                      : 'Upload image'
                  "
                >
                  <LucideImagePlus class="size-4" aria-hidden="true" />
                </button>
                <button
                  v-if="coverPreviewUrl || !hideDefault"
                  type="button"
                  class="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                  @click="handleRemove"
                  aria-label="Remove image"
                >
                  <LucideX class="size-4" aria-hidden="true" />
                </button>
              </div> -->
            </div>
            <!-- <input
              type="file"
              ref="coverInputRef"
              @change="handleCoverChange"
              class="hidden"
              accept="image/*"
              aria-label="Upload image file"
            /> -->
          </div>

          <!-- Avatar -->
          <div class="-mt-10 px-6">
            <div
              class="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
              <NuxtImg
                v-if="avatarPreviewUrl || '/placeholder_profile.png'"
                :src="avatarPreviewUrl || '/placeholder_profile.png'"
                class="h-full w-full object-cover"
                width="80"
                height="80"
                alt="Profile image" />
              <button
                type="button"
                class="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                @click="handleAvatarThumbnailClick"
                aria-label="Change profile picture">
                <LucideImagePlus class="size-4" aria-hidden="true" />
              </button>
              <input
                type="file"
                ref="avatarFileInputRef"
                @change="handleAvatarFileChange"
                class="hidden"
                accept="image/*"
                aria-label="Upload profile picture" />
            </div>
          </div>

          <div class="px-6 pt-4 pb-6">
            <form
              class="space-y-4"
              id="dialogTeamForm"
              @submit="handleSubmit($event, onSubmit)">
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <UiFormField
                  v-slot="{ componentField }"
                  name="name"
                  >
                  <UiFormItem>
                    <UiFormLabel>Nama</UiFormLabel>
                    <UiFormControl>
                      <UiInput
                        placeholder="Jiwana Syah..."
                        v-bind="componentField" />
                    </UiFormControl>
                    <UiFormMessage />
                  </UiFormItem>
                </UiFormField>

                <UiFormField
                  v-slot="{ componentField }"
                  name="position"
                  >
                  <UiFormItem>
                    <UiFormLabel>Posisi</UiFormLabel>
                    <UiSelect v-bind="componentField">
                      <UiFormControl>
                        <UiSelectTrigger class="w-full">
                          <UiSelectValue placeholder="Pilih Posisi" />
                        </UiSelectTrigger>
                      </UiFormControl>
                      <UiSelectContent>
                        <UiSelectGroup>
                          <UiSelectItem
                            v-for="option in roleOptions"
                            :key="option.value"
                            :value="option.value">
                            {{ option.label }}
                          </UiSelectItem>
                        </UiSelectGroup>
                      </UiSelectContent>
                    </UiSelect>
                    <UiFormMessage />
                  </UiFormItem>
                </UiFormField>
              </div>

              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <UiFormField
                  v-slot="{ componentField }"
                  name="email"
                  >
                  <UiFormItem>
                    <UiFormLabel>Email</UiFormLabel>
                    <UiFormControl>
                      <UiInput
                        type="email"
                        placeholder="your@email.com"
                        v-bind="componentField" />
                    </UiFormControl>
                    <UiFormMessage />
                  </UiFormItem>
                </UiFormField>

                <UiFormField
                  v-slot="{ componentField }"
                  name="phone"
                  >
                  <UiFormItem>
                    <UiFormLabel>Nomor Telepon</UiFormLabel>
                    <UiFormControl>
                      <UiInput
                        placeholder="+62..."
                        type="tel"
                        v-bind="componentField" />
                    </UiFormControl>
                    <UiFormMessage />
                  </UiFormItem>
                </UiFormField>
              </div>

              <UiFormField
                v-slot="{ componentField }"
                name="bio"
                >
                <UiFormItem>
                  <UiFormLabel>Biografi</UiFormLabel>
                  <UiFormControl>
                    <UiTextarea
                      placeholder="Tulis beberapa kalimat tentang diri Anda"
                      v-bind="componentField"
                      v-model="bioText"
                      :maxLength="maxLength"
                      aria-describedby="bio-description" />
                  </UiFormControl>
                  <UiFormDescription id="bio-description">
                    <span class="tabular-nums">{{ charactersRemaining }}</span>
                    karakter tersisa
                  </UiFormDescription>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField
                v-slot="{ componentField }"
                name="linkedin"
                >
                <UiFormItem>
                  <UiFormLabel
                    ><Icon name="skill-icons:linkedin" /> LinkedIn</UiFormLabel
                  >
                  <UiFormControl>
                    <UiInput
                      type="url"
                      placeholder="https://linkedin.com/..."
                      v-bind="componentField" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField
                v-slot="{ componentField }"
                name="instagram"
                >
                <UiFormItem>
                  <UiFormLabel
                    ><Icon name="skill-icons:instagram" />
                    Instagram</UiFormLabel
                  >
                  <UiFormControl>
                    <UiInput
                      type="url"
                      placeholder="https://instagram.com/..."
                      v-bind="componentField" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField
                v-slot="{ componentField }"
                name="twitter"
                >
                <UiFormItem>
                  <UiFormLabel
                    ><Icon name="fa6-brands:x-twitter" /> Twitter</UiFormLabel
                  >
                  <UiFormControl>
                    <UiInput
                      type="url"
                      placeholder="https://twitter.com/..."
                      v-bind="componentField" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField
                v-slot="{ handleChange, value }"
                type="checkbox"
                name="isActive"
                >
                <UiFormItem
                  class="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div class="space-y-0.5">
                    <UiFormLabel class="text-base"> Masih Aktif? </UiFormLabel>
                    <UiFormDescription>
                      Centang jika anggota tim ini masih aktif berkontribusi
                    </UiFormDescription>
                  </div>
                  <UiFormControl>
                    <UiSwitch
                      :model-value="value"
                      @update:model-value="handleChange" />
                  </UiFormControl>
                </UiFormItem>
              </UiFormField>
            </form>
          </div>
        </div>
        <UiDialogFooter class="border-t px-6 py-4">
          <UiDialogClose asChild>
            <UiButton type="button" variant="outline">Cancel</UiButton>
          </UiDialogClose>
          <UiButton type="submit" form="dialogTeamForm"
            ><Icon :name="cardBtn.icon" class="text-lg" />
            {{ cardBtn.saveBtnText }}</UiButton
          >
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </UiForm>
</template>
