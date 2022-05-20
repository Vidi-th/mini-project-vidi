<template>
    <v-container>
        <v-img v-if="modeBulb"
        alt="IoT Greenhouse Card"
        contain
        src="@/assets/BulbOn.png"
        max-width="200px"
        />


        <v-img v-if="!modeBulb"
        alt="IoT Greenhouse Card"
        contain
        src="@/assets/BulbOff.png"
        max-width="200px"
        />
    </v-container>
</template>

<script>
export default {
    data() {
    return {
      modeBulb: false,
    };
  },
}
</script>