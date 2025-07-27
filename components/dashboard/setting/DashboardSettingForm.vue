<template>
  <form class="space-y-6" @submit="onSubmit">
    <!-- Company Name -->
    <UiFormField
      v-slot="{ componentField }"
      name="company_name"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem
        class="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Nama Perusahaan</UiFormLabel>
          <UiFormDescription>
            Nama lengkap perusahaan yang akan ditampilkan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput v-bind="componentField" placeholder="Paperless..." />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Company Abbreviation -->
    <UiFormField
      v-slot="{ componentField }"
      name="company_abbr"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Singkatan Perusahaan</UiFormLabel>
          <UiFormDescription>
            Singkatan atau akronim perusahaan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput v-bind="componentField" placeholder="PH..." />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- About -->
    <UiFormField
      v-slot="{ componentField }"
      name="about"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Tentang Perusahaan</UiFormLabel>
          <UiFormDescription>
            Deskripsi lengkap tentang perusahaan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiTextarea
              v-bind="componentField"
              placeholder="Perusahaan kami bergerak di bidang..."
              rows="4" />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Excerpt -->
    <UiFormField
      v-slot="{ componentField }"
      name="excerpt"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Ringkasan</UiFormLabel>
          <UiFormDescription>
            Ringkasan singkat tentang perusahaan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiTextarea
              v-bind="componentField"
              placeholder="Ringkasan singkat perusahaan..."
              rows="3" />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Moto -->
    <UiFormField
      v-slot="{ componentField }"
      name="moto"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Moto Perusahaan</UiFormLabel>
          <UiFormDescription> Moto atau tagline perusahaan </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              placeholder="Membangun Masa Depan Elektronik untuk..." />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Logo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      <div class="space-y-2">
        <UiLabel for="logo-upload">Logo Perusahaan</UiLabel>
        <p class="text-xs text-muted-foreground">
          Upload logo perusahaan (Max. 4 MB)
        </p>
      </div>
      <div class="md:col-span-2">
        <div class="inline-flex items-center gap-2 align-top">
          <div
            class="border-input relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border"
            :aria-label="
              previewUrl ? 'Preview of uploaded image' : 'Default user avatar'
            ">
            <NuxtImg
              v-if="previewUrl"
              class="h-full w-full"
              :src="previewUrl"
              alt="Preview of uploaded image"
              width="32"
              height="32" />
            <NuxtImg
              v-else-if="settingData && settingData.logo"
              class="h-full w-full"
              :src="settingData.logo"
              alt="Company logo"
              width="32"
              height="32" />
            <div
              v-else
              aria-hidden="true"
              class="flex items-center justify-center">
              <Icon
                name="material-symbols:add-photo-alternate-outline"
                class="opacity-60" />
            </div>
          </div>
          <div class="relative inline-block">
            <UiButton
              size="sm"
              type="button"
              @click="handleButtonClick"
              aria-haspopup="dialog">
              <Icon name="ic:sharp-cloud-upload" class="text-base" />
              {{
                file || (settingData && settingData.logo)
                  ? "Ganti Logo"
                  : "Upload Logo"
              }}
            </UiButton>
            <input
              type="file"
              id="logo-upload"
              ref="fileInput"
              @change="handleFileChange"
              class="hidden"
              accept="image/*"
              aria-label="Upload image file" />
          </div>
        </div>
        <div v-if="file" class="mt-2">
          <div class="inline-flex gap-2 text-xs">
            <p class="text-muted-foreground truncate" aria-live="polite">
              {{ file.name }}
            </p>
            <button
              type="button"
              @click="() => (file = null)"
              class="font-medium text-red-500 hover:underline cursor-pointer"
              :aria-label="`Remove ${file.name}`">
              Remove
            </button>
          </div>
        </div>
        <div class="sr-only" aria-live="polite" role="status">
          {{
            previewUrl
              ? "Image uploaded and preview available"
              : "No image uploaded"
          }}
        </div>
      </div>
    </div>

    <UiSeparator />

    <!-- Keywords -->
    <UiFormField
      v-slot="{ componentField }"
      name="keywords"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Keywords</UiFormLabel>
          <UiFormDescription>
            Keywords untuk SEO dan pencarian
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiTagsInput
              :model-value="componentField.modelValue"
              @update:model-value="componentField['onUpdate:modelValue']">
              <UiTagsInputItem
                v-for="item in componentField.modelValue"
                :key="item"
                :value="item">
                <UiTagsInputItemText />
                <UiTagsInputItemDelete />
              </UiTagsInputItem>
              <UiTagsInputInput placeholder="Keyword..." />
            </UiTagsInput>
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Vision -->
    <UiFormField name="vision" :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiLabel for="vision-input-0">Visi Perusahaan</UiLabel>
          <UiFormDescription>
            Tambahkan point-point visi perusahaan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <FieldArray v-slot="{ fields, push, remove }" name="vision">
            <div v-for="(field, index) in fields" :key="`vision-${field.key}`">
              <UiFormField
                v-slot="{ componentField }"
                :name="`vision[${index}].value`"
                :validate-on-blur="!form.isFieldDirty">
                <UiFormItem class="mb-3">
                  <div class="relative flex gap-2 items-center">
                    <UiFormControl>
                      <UiInput
                        :id="`vision-input-${index}`"
                        v-bind="componentField" />
                    </UiFormControl>
                    <UiButton
                      v-if="index !== 0"
                      size="sm"
                      variant="destructive"
                      @click="remove(index)">
                      <Icon name="material-symbols:delete" />
                    </UiButton>
                  </div>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
            </div>
            <UiButton
              type="button"
              size="sm"
              class="text-xs mt-2"
              @click="push({ value: '' })">
              Tambah Visi
            </UiButton>
          </FieldArray>
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Mission -->
    <UiFormField name="mission" :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiLabel for="mission-input-0">Misi Perusahaan</UiLabel>
          <UiFormDescription>
            Tambahkan point-point misi perusahaan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <FieldArray v-slot="{ fields, push, remove }" name="mission">
            <div v-for="(field, index) in fields" :key="`mission-${field.key}`">
              <UiFormField
                v-slot="{ componentField }"
                :name="`mission[${index}].value`"
                :validate-on-blur="!form.isFieldDirty">
                <UiFormItem class="mb-3">
                  <div class="relative flex gap-2 items-center">
                    <UiFormControl>
                      <UiInput
                        :id="`mission-input-${index}`"
                        v-bind="componentField" />
                    </UiFormControl>
                    <UiButton
                      v-if="index !== 0"
                      size="sm"
                      variant="destructive"
                      @click="remove(index)">
                      <Icon name="material-symbols:delete" />
                    </UiButton>
                  </div>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
            </div>
            <UiButton
              type="button"
              size="sm"
              class="text-xs mt-2"
              @click="push({ value: '' })">
              Tambah Misi
            </UiButton>
          </FieldArray>
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Email -->
    <UiFormField
      v-slot="{ componentField }"
      name="email"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Email</UiFormLabel>
          <UiFormDescription> Email kontak perusahaan </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              type="email"
              placeholder="contact@company.com" />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Address -->
    <UiFormField
      v-slot="{ componentField }"
      name="address"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Alamat</UiFormLabel>
          <UiFormDescription> Alamat lengkap perusahaan </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiTextarea
              v-bind="componentField"
              placeholder="Jl. Contoh No. 123, Kota..."
              rows="3" />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- Phone Number -->
    <UiFormField
      v-slot="{ componentField }"
      name="phone_number"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>Nomor Telepon</UiFormLabel>
          <UiFormDescription> Nomor telepon perusahaan </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput
              type="tel"
              v-bind="componentField"
              placeholder="+6285387..." />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <UiSeparator />

    <!-- LinkedIn -->
    <UiFormField
      v-slot="{ componentField }"
      name="linkedin"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>
            <Icon name="skill-icons:linkedin" /> LinkedIn
          </UiFormLabel>
          <UiFormDescription>
            URL profil LinkedIn perusahaan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              placeholder="https://linkedin.com/company/..." />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <!-- Instagram -->
    <UiFormField
      v-slot="{ componentField }"
      name="instagram"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>
            <Icon name="skill-icons:instagram" />Instagram
          </UiFormLabel>
          <UiFormDescription>
            URL profil Instagram perusahaan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              placeholder="https://instagram.com/..." />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <!-- Twitter -->
    <UiFormField
      v-slot="{ componentField }"
      name="twitter"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>
            <Icon name="fa6-brands:x-twitter" />Twitter
          </UiFormLabel>
          <UiFormDescription> URL profil Twitter perusahaan </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              placeholder="https://twitter.com/..." />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <!-- Youtube -->
    <UiFormField
      v-slot="{ componentField }"
      name="youtube"
      :validate-on-blur="!form.isFieldDirty">
      <UiFormItem class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <UiFormLabel>
            <Icon name="openmoji:youtube" class="text-lg" />Youtube
          </UiFormLabel>
          <UiFormDescription>
            URL channel Youtube perusahaan
          </UiFormDescription>
        </div>
        <div class="md:col-span-2">
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              placeholder="https://youtube.com/..." />
          </UiFormControl>
          <UiFormMessage />
        </div>
      </UiFormItem>
    </UiFormField>

    <div class="flex justify-end pt-6">
      <UiButton :disabled="loading" :aria-disabled="loading" type="submit">
        <Icon :name="loading ? 'svg-spinners:3-dots-bounce' :'flowbite:floppy-disk-solid'" class="text-lg" /> {{ loading ? 'memperbaharui...' : 'Simpan Pengaturan' }}
      </UiButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useObjectUrl } from "@vueuse/core";
import { useForm, FieldArray } from "vee-validate";
import { toast } from "vue-sonner";
import { settingSchema } from "./setting.constant";

const { data: settingData } = await useFetch("/api/settings");

const file = shallowRef<File | null>(null);
const previewUrl = useObjectUrl(file);
const inputRef = useTemplateRef("fileInput");
const loading = ref(false)

function handleButtonClick() {
  if (inputRef.value) {
    inputRef.value.click();
  }
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) {
    file.value = input.files[0];
  }
}

const initialVision = formatArrayToObject(settingData.value?.vision);
const initialMission = formatArrayToObject(settingData.value?.mission);

const form = useForm({
  validationSchema: settingSchema,
  initialValues: {
    company_name: settingData.value?.companyName || "",
    company_abbr: settingData.value?.companyAbbr || "",
    about: settingData.value?.about || "",
    excerpt: settingData.value?.excerpt || "",
    moto: settingData.value?.moto || "",
    keywords: settingData.value?.keywords || [],
    vision: initialVision,
    mission: initialMission,
    email: settingData.value?.email || "",
    address: settingData.value?.address || "",
    phone_number: settingData.value?.phoneNumber || "",
    linkedin: settingData.value?.linkedin || "",
    instagram: settingData.value?.instagram || "",
    twitter: settingData.value?.twitter || "",
    youtube: settingData.value?.youtube || "",
  },
});

const onSubmit = form.handleSubmit(async values => {
  loading.value = true

  let logoUrl;

  if (file) {
    const fd = new FormData()
    fd.append("file", file.value as File)
    fd.append("oldImagePath", settingData.value?.logo as string)

    try {
      const res = await $fetch("/api/images/replace", {
        method: "PUT",
        body: fd
      })

      if (res.success) {
        logoUrl = res.data.filePath
      }
    } catch (err) {
      console.error(err)
      toast.error((err as Error).message)

      loading.value = false
      return
    }
  }

  const dataToSubmit = {
    ...values,
    vision: values.vision.map(v => v.value),
    mission: values.mission.map(m => m.value),
    keywords: values.keywords.map(k => k.trim().toLowerCase()),
    logo: file ? logoUrl : null,
  };

  try {
    const res = await $fetch("/api/settings", {
      method: "PUT",
      body: dataToSubmit,
    })

    toast.success(res.message);
  } catch (error) {

    if (error instanceof Error) {
      toast.error(error.message);
    }

    toast.error("Gagal mengupdate pengaturan", {
      description: "Terjadi kesalahan saat menyimpan pengaturan perusahaan.",
    });

    loading.value = false
  } finally {
    loading.value = false
  }
});
</script>