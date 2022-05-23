<template>
    <v-container>
        {{listGreenhouse(data.nama, id)}}
    </v-container>
</template>

<script>
export default {
    name: "GreenhouseItem",
    props: {
        data: Object,
        id: Number,
    },
    data(){
        return {
            inputData:"",
        }
    },
    methods:{
        listGreenhouse(param, id){
            this.$emit("list-greenhouse", param, id);
        }
    }
}
</script>