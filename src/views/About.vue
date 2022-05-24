<template>
    <v-container fluid>
        <div
        class="d-flex justify-start mb-8"
        >
            <h1 class="order-1 mx-auto"> IoT for Greenhouse </h1>
        </div>
        <div
        class="d-flex justify-center mb-6"
        >
            <v-card
                class="order-1 mx-auto"
                max-width="400"
            >
                <v-img
                class="white--text align-end"
                height="290px"
                src="@/assets/greenhouseimage.png"
                >
                </v-img>
            </v-card>
        </div>
        <div class="text-center mx-auto display-1">This project is an implementation of the Internet of Things.</div>
        <div class="text-center mx-auto display-1">In this website we can monitor conditions of greenhouse by looking at each of the sensors and can</div>
        <div class="text-center mx-auto display-1">see the actuators in the greenhouse are working or not and changes treshold for actuactor</div>
        
        <div
        class="d-flex justify-start mt-10 mb-8"
        >  
            <v-card
                class="order-1 ms-auto"
                max-width="400"
            >
                <v-img
                class="white--text align-end"
                height="290px"
                src="@/assets/ava.jpg"
                >
                </v-img>
            </v-card>
            <v-card
                class="order-2 me-auto"
                max-width="450"
                outlined
            >
                <v-list-item three-line>
                <v-list-item-content>
                    <div class="text-overline mb-4">
                    Created By
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                    Vidityar Adith Nugroho
                    </v-list-item-title>
                    <v-list-item-subtitle>Teknik Komputer - Institut Teknologi Sepuluh Nopember</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                    href="https://www.linkedin.com/in/vidityara/"
                >
                    About Me
                </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>