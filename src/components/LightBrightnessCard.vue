<template>
    <v-container>
        <ApolloQuery
        :query="gql => gql`
            query MyQuery {
                sensor {
                    light_brightness
                }
            }
        `"
      >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred
          {{ error }}
        </div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo"> 
            <div
            v-for="(item, index) in lastarr(data.sensor)" 
            :key=index
            >
            <v-img
            alt="IoT Light Brightness"
            class="white--text align-center"
            contain
            src="@/assets/cardLightBright.jpg"
            max-width="450px"
            >
                <div
                class="d-flex justify-center mb-6"
                >
                    <v-card-title class="display-3"> {{item}}%</v-card-title>
                </div>
            </v-img>
            </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      </ApolloQuery>
    </v-container>
</template>

<script>
export default {
    setup() {
        
    },
    methods:{
        lastarr(data){
            let lastElement = data[data.length - 1];
            console.log(lastElement);
            return lastElement;
        },
    }
}
</script>