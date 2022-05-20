<template>
    <v-container>
        <div
        class="d-flex"
        >
            <v-btn
            class="order-1 pa-3 mt-7"
            v-bind="attrs"
            v-on="on"
            >
            <v-icon>mdi-home-automation</v-icon>
            </v-btn>
            
            <v-select
            class="order-2 pa-3 mt-4"
            v-model="select"
            :items="items"
            item-text="state"
            label="Select"
            return-object
            single-line
            ></v-select>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
    return {
      select: { state: 'GH Surabaya'},
        items: [
          { state: 'GH Surabaya'},
          { state: 'GH Madiun'},
        ],
    };
  },
}
</script>