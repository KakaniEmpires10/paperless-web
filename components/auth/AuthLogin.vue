<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
import { ref } from "vue";
import { z } from "zod";
import { AlertCircle } from "lucide-vue-next";
const { fetch: refreshSession } = useUserSession();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const route = useRoute()

const isLoading = ref(false);
const email = ref("");
const password = ref("");
const alertShow = ref(false)
const errMessage = ref("")

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email Wajib Diisi" })
    .email({ message: "Harap Masukkan Email Yang Valid" }),
  password: z
    .string()
    .min(1, { message: "Password Wajib Diisi" })
    .min(8, { message: "Password Tidak Boleh Kurang dari 8 Karakter" }),
});

const redirectPath = typeof route.query.redirect === "string" &&
  route.query.redirect.startsWith("/")
  ? route.query.redirect
  : "/dashboard";

type loginFormType = z.infer<typeof loginSchema>;

const errors = ref<z.ZodFormattedError<loginFormType> | null>(null);

async function onSubmit() {
  const isValid = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  });

  if (!isValid.success) {
    errors.value = isValid.error.format();
  } else {
    isLoading.value = true;

    $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    })
      .then(async () => {
        await refreshSession();
        await navigateTo(redirectPath);
      })
      .catch((err) => { errMessage.value = extractErrorMessage(err), alertShow.value = true })
      .finally(() => {
        isLoading.value = false;
      });
  }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const socialButtonVariants = {
  idle: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -2 },
  tap: { scale: 0.95 },
};

const loadingVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};
</script>

<template>
  <Motion
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
    :class="cn('flex flex-col gap-6 w-full max-w-4xl', props.class)">
    <UiCard class="overflow-hidden p-0">
      <UiCardContent class="grid p-0 md:grid-cols-2">
        <!-- Left side - Form -->
        <Motion
          :variants="containerVariants"
          :initial="'hidden'"
          :animate="'visible'"
          class="p-6 md:p-8">
          <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
            <!-- Header -->
            <Motion
              :variants="itemVariants"
              class="flex flex-col items-center text-center mb-4">
              <Motion
                :initial="{ opacity: 0, y: -20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, delay: 0.2 }">
                <h1 class="text-2xl font-bold">Selamat Datang Kembali!</h1>
              </Motion>
              <Motion
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ duration: 0.6, delay: 0.4 }">
                <p class="text-muted-foreground text-balance">
                  Silahkan masuk menggunakan akun paperless anda
                </p>
              </Motion>
            </Motion>

            <UiAlert v-if="alertShow" variant="destructive">
              <AlertCircle />
              <UiAlertTitle>Error</UiAlertTitle>
              <UiAlertDescription>
                {{ errMessage }}
              </UiAlertDescription>
            </UiAlert>

            <!-- Email Field -->
            <Motion :variants="itemVariants" class="grid gap-3">
              <Motion
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.4, delay: 0.6 }">
                <UiLabel
                  for="email"
                  :class="{ 'text-destructive': errors?.email }"
                  >Email</UiLabel
                >
              </Motion>
              <Motion
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.4, delay: 0.7 }"
                :whileFocus="{ scale: 1.02 }">
                <UiInput
                  v-model="email"
                  variant="underline"
                  id="email"
                  type="email"
                  placeholder="example@gmail.com" />
              </Motion>
              <span v-if="errors?.email" class="text-destructive text-xs">
                {{ errors.email?._errors?.[0] }}
              </span>
            </Motion>

            <!-- Password Field -->
            <Motion :variants="itemVariants" class="grid gap-3">
              <Motion
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.4, delay: 0.8 }">
                <div class="flex items-center justify-between">
                  <UiLabel
                    for="password"
                    :class="{ 'text-destructive': errors?.password }"
                    >Password</UiLabel
                  >
                  <NuxtLink
                    to="#"
                    class="ml-auto text-muted-foreground text-sm underline-offset-3 hover:underline">
                    Forgot your password?
                  </NuxtLink>
                </div>
              </Motion>
              <Motion
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.4, delay: 0.9 }"
                :whileFocus="{ scale: 1.02 }">
                <UiInput
                  v-model="password"
                  variant="underline"
                  id="password"
                  type="password"
                  placeholder="*****" />
              </Motion>
              <span v-if="errors?.password" class="text-destructive text-xs">
                {{ errors.password?._errors?.[0] }}
              </span>
            </Motion>

            <!-- Submit Button -->
            <Motion
              :variants="buttonVariants"
              :initial="'idle'"
              :whileHover="'hover'"
              :whileTap="'tap'"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.4, delay: 1.0 }"
              class="w-full">
              <UiButton
                type="submit"
                class="w-full relative"
                :disabled="isLoading">
                <Motion
                  v-if="isLoading"
                  :variants="loadingVariants"
                  :animate="'animate'"
                  class="absolute inset-0 flex items-center justify-center">
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                </Motion>
                <span :class="{ 'opacity-0': isLoading }"> Login </span>
              </UiButton>
            </Motion>

            <!-- Divider -->
            <Motion
              :initial="{ opacity: 0, scaleX: 0 }"
              :animate="{ opacity: 1, scaleX: 1 }"
              :transition="{ duration: 0.6, delay: 1.1 }"
              class="after:border-muted relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span class="bg-card text-muted-foreground relative z-10 px-2">
                or continue with
              </span>
            </Motion>

            <!-- Social Login Buttons -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.6, delay: 1.2 }"
              class="grid grid-cols-3 gap-4">
              <!-- Apple Button -->
              <Motion
                :variants="socialButtonVariants"
                :initial="'idle'"
                :whileHover="'hover'"
                :whileTap="'tap'"
                :transition="{ duration: 0.2 }">
                <UiButton variant="outline" type="button" class="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-5 h-5">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor" />
                  </svg>
                  <span class="sr-only">Login with Apple</span>
                </UiButton>
              </Motion>

              <!-- Google Button -->
              <Motion
                :variants="socialButtonVariants"
                :initial="'idle'"
                :whileHover="'hover'"
                :whileTap="'tap'"
                :transition="{ duration: 0.2 }">
                <UiButton variant="outline" type="button" class="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-5 h-5">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  <span class="sr-only">Login with Google</span>
                </UiButton>
              </Motion>

              <!-- Meta Button -->
              <Motion
                :variants="socialButtonVariants"
                :initial="'idle'"
                :whileHover="'hover'"
                :whileTap="'tap'"
                :transition="{ duration: 0.2 }">
                <UiButton variant="outline" type="button" class="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-5 h-5">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                      fill="currentColor" />
                  </svg>
                  <span class="sr-only">Login with Meta</span>
                </UiButton>
              </Motion>
            </Motion>
          </form>
        </Motion>

        <!-- Right side - Image placeholder -->
        <Motion
          :initial="{ opacity: 0, x: 50 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.3 }"
          class="bg-primary relative hidden md:block">
          <div class="absolute inset-0 flex items-center justify-center">
            <Motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :animate="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 0.8, delay: 1.0 }"
              class="z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-2 text-black shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
              <NuxtImg src="/favicon.png" class="w-24" alt="paperless_logo" />
            </Motion>
          </div>
        </Motion>
      </UiCardContent>
    </UiCard>
  </Motion>
</template>
