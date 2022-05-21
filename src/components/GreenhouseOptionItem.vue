<template>
    <v-container>
        <v-select
        v-model="data.name"
        :items="data.name"
        item-text="name"
        label="Select"
        return-object
        single-line
        item-color="#E5E5E5"
        ></v-select>
    </v-container>
</template>

<script>
export default {
    name: "GreenhouseItem",
    props: {
        data: Object,
        id: Number,
    },
}
</script>