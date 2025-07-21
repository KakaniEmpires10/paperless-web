<template>
  <DashboardHeader
    title="Tim"
    description="Halaman ini digunakan untuk menambah dan mengurangi profil pegawai perusahaan untuk ditampilkan di halaman depan" />
    <DashboardTeamFilter :filters="filters" @reset-filters="resetFilters" @openDialog="openDialog" />
    <UiBadge rounded="pill">{{ totalTeam }}</UiBadge>
    <DashboardTeamGrid :teams="filteredTeams" :status="status" :error="error" @refresh="handleRefresh" @openDialog="openDialog" />
    <DashboardTeamDialog :isOpen="dialogState.open" :team="dialogState.team" @refresh="handleRefresh" @close="closeDialog" v-model:open="dialogState.open" />
</template>

<script lang="ts" setup>
import { debouncedWatch } from '@vueuse/core';
import type { Team, TeamFilters } from '~/components/dashboard/team/team.constant';

useHead({
  title: "Tim - Dashboard",
  meta: [
    {
      name: "description",
      content: "Halaman ini digunakan untuk mengelola tim perusahaan Anda.",
    },
  ],
})

const {
  data: fetchData,
  error,
  refresh,
  status,
} = await useAsyncData('teams', () => $fetch('/api/team'));

const handleRefresh = async () => {
  await refresh(); // ini refresh useAsyncData
  teams.value = fetchData.value?.teamMembers || [];
  applyFilters();
};

const teams = ref<Team[]>([]);
const filteredTeams = ref<Team[]>([]);

watch(fetchData, (val) => {
  teams.value = val?.teamMembers || [];
}, { immediate: true });

const dialogState = ref({
  open: false,
  team: null as Team | null,
  test: ""
});
const filters = ref<TeamFilters>({
  search: "",
  role: [],
  status: null,
});

const resetFilters = () => {
  filters.value = {
    search: "",
    role: [],
    status: null,
  };
  applyFilters();
};

// filter logic
const applyFilters = () => {
  const search = filters.value.search.toLowerCase();
  const role = filters.value.role;
  const status = filters.value.status;

  filteredTeams.value = teams.value.filter(team => {
    const matchesSearch =
      team.name.toLowerCase().includes(search) ||
      team.position.toLowerCase().includes(search) ||
      team.bio?.toLowerCase().includes(search) ||
      team.email?.toLowerCase().includes(search) ||
      team.phone?.toLowerCase().includes(search);

    const matchesRole = role.length === 0 || role.includes(team.position);
    const matchesStatus = status === null || team.isActive === status;

    return matchesSearch && matchesRole && matchesStatus;
  });
};


const openDialog = (team?: Team) => {
  dialogState.value.open = true;
  dialogState.value.team = team || null;
};

const closeDialog = () => {
  dialogState.value.open = false;
  dialogState.value.team = null;
};

// Debounced watch on filter change
debouncedWatch(
  filters,
  () => {
    applyFilters();
  },
  { debounce: 300, deep: true }
);

// Initial filter application
onMounted(() => {
  applyFilters();
});

const totalTeam = computed(() => teams.value.length > 0 ? `Anda Memiliki ${teams.value.length} Anggota Tim` : `Anda Tidak Memiliki Anggota Tim`)
</script>