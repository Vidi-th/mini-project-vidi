<template>
    <v-container>
        <v-img
        v-if="modeKran"
        alt="IoT Greenhouse Card"
        contain
        src="@/assets/KranOpen.png"
        max-width="200px"
        />

        <v-img
        v-if="!modeKran"
        alt="IoT Greenhouse Card"
        contain
        src="@/assets/KranClose.png"
        max-width="200px"
        />
    </v-container>
</template>

<script>
export default {
    data() {
    return {
      modeKran: false,
    };
  },
}
</script>