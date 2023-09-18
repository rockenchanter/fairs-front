<script setup>
import { ref } from 'vue'
import IndustryIndicators from '../../components/IndustryIndicators.vue'

const tab = ref('four')

const hall = {
  id: 1,
  name: 'Arabasta Hall',
  description: 'Arabasta Hall awesome description lies here before your very eyes stranger',
  images: [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/18245680/pexels-photo-18245680/free-photo-of-escalators-in-hall-of-the-shopping-mall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/3831826/pexels-photo-3831826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ],
  fairs: [
    {
      id: 1,
      start_date: '31.12.2023',
      industries: [
        { id: 1, name: 'Medical Services', icon: 'medical_services', color: 'red' },
        { id: 2, name: 'School & Education', icon: 'school', color: 'blue' }
      ],
      organizer: {
        name: 'John Doe',
        image:
          'https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      short_desc:
        'Aenean aliquam finibus viverra. Aenean ac quam vel lacus pharetra ornare. Phasellus vestibulum elit in lacus porttitor tristique.  Aliquam varius blandit mauris, at pellentesque ligula matti',
      industry: 'IT',
      image:
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Sacred Heart Fair'
    },
    {
      id: 2,
      start_date: '31.12.2023',
      industries: [{ id: 1, name: 'Medical Services', icon: 'medical_services', color: 'red' }],
      organizer: {
        name: 'John Doe',
        image:
          'https://images.pexels.com/photos/2100650/pexels-photo-2100650.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      short_desc:
        'Aenean aliquam finibus viverra. Aenean ac quam vel lacus pharetra ornare. Phasellus vestibulum elit in lacus porttitor tristique.  Aliquam varius blandit mauris, at pellentesque ligula matti',
      industry: 'housing',
      image:
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Potato Fair'
    },
    {
      id: 3,
      start_date: '31.12.2023',
      industries: [{ id: 1, name: 'Medical Services', icon: 'medical_services', color: 'red' }],
      organizer: {
        name: 'John Doe',
        image:
          'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      short_desc:
        'Aenean aliquam finibus viverra. Aenean ac quam vel lacus pharetra ornare. Phasellus vestibulum elit in lacus porttitor tristique.  Aliquam varius blandit mauris, at pellentesque ligula matti',
      industry: 'farming',
      image:
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Potato Fair'
    },
    {
      id: 4,
      start_date: '31.12.2023',
      industries: [{ id: 1, name: 'Medical Services', icon: 'medical_services', color: 'red' }],
      organizer: {
        name: 'John Doe',
        image:
          'https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      short_desc:
        'Aenean aliquam finibus viverra. Aenean ac quam vel lacus pharetra ornare. Phasellus vestibulum elit in lacus porttitor tristique.  Aliquam varius blandit mauris, at pellentesque ligula matti',
      industry: 'education',
      image:
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Potato Fair'
    },
    {
      id: 5,
      start_date: '31.12.2023',
      industries: [{ id: 1, name: 'Medical Services', icon: 'medical_services', color: 'red' }],
      organizer: {
        name: 'John Doe',
        image:
          'https://images.pexels.com/photos/804009/pexels-photo-804009.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      short_desc:
        'Aenean aliquam finibus viverra. Aenean ac quam vel lacus pharetra ornare. Phasellus vestibulum elit in lacus porttitor tristique.  Aliquam varius blandit mauris, at pellentesque ligula matti',
      industry: 'energy',
      image:
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Potato Fair'
    }
  ],
  address: { id: 1, city: 'Rzeszów', street: 'Pigonia 1', zipcode: '13-333' },
  stalls: [
    {
      id: 1,
      price: 100,
      image:
        'https://images.pexels.com/photos/8475194/pexels-photo-8475194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Standard',
      electricity: false,
      size: 5,
      network: true,
      support: false,
      amount: 10
    },
    {
      id: 2,
      price: 200,
      image:
        'https://images.pexels.com/photos/4173321/pexels-photo-4173321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Pro',
      electricity: true,
      size: 10,
      network: true,
      support: false,
      amount: 20
    },
    {
      id: 3,
      price: 300,
      image:
        'https://images.pexels.com/photos/8050435/pexels-photo-8050435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Ultimate',
      electricity: true,
      size: 10,
      network: true,
      support: true,
      amount: 5
    }
  ]
}
</script>

<template>
  <v-tabs v-model="tab" bg-color="primary">
    <v-tab prepend-icon="info" value="one">Information</v-tab>
    <v-tab prepend-icon="collections" value="two">Gallery</v-tab>
    <v-tab prepend-icon="event" value="three">Events</v-tab>
    <v-tab prepend-icon="storefront" value="four">Stalls</v-tab>
  </v-tabs>

  <v-container>
    <v-window v-model="tab">
      <v-window-item value="one">
        <div class="mb-5 text-h4">{{ hall.name }}</div>
        <p>{{ hall.description }}</p>
      </v-window-item>

      <v-window-item value="two">
        <v-row>
          <v-col cols="12" md="4" v-for="img in hall.images" :key="img.id">
            <v-img :src="img.url" />
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="three">
        <v-row>
          <v-col class="text-right">
            <v-btn prepend-icon="home" text="house your next event" color="primary" />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="10">
            <v-timeline side="end">
              <v-timeline-item v-for="fair in hall.fairs" size="large">
                <template v-slot:icon>
                  <v-avatar size="x-large" :image="fair.organizer.image"></v-avatar>
                </template>

                <v-card>
                  <v-card-item>
                    <v-card-title class="d-flex justify-space-between align-center">
                      <v-row>
                        <v-col>
                          {{ fair.name }}
                        </v-col>
                        <v-col class="text-right"> </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-subtitle>
                      <v-icon icon="date_range" start />
                      <span>{{ fair.start_date }}</span>
                    </v-card-subtitle>

                    <div class="py-2">
                      <div class="font-weight-light text-medium-emphasis">
                        {{ fair.short_desc }}
                      </div>
                    </div>
                  </v-card-item>

                  <v-card-actions>
                    <IndustryIndicators :industries="fair.industries" />
                    <v-spacer />
                    <v-btn text="read more" :to="{ name: 'fairs-show', params: { id: fair.id } }" />
                  </v-card-actions>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="four">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="stall in hall.stalls" :key="hall.id">
              <v-card elevation="3">
                <v-img :src="stall.image" />
                <v-card-item>
                  <v-card-title class="d-flex">
                    {{ stall.name }}
                    <v-spacer />
                    <v-chip prepend-icon="attach_money" variant="outlined">
                      {{ stall.price }}
                    </v-chip>
                  </v-card-title>
                </v-card-item>
                <v-card-text>
                  <div class="d-flex flex-wrap">
                    <v-chip
                      class="mt-2 me-2"
                      :prepend-icon="stall.network ? 'wifi' : 'wifi_off'"
                      :color="stall.network ? 'green' : 'red'"
                      >Network</v-chip
                    >
                    <v-chip
                      class="mt-2 me-2"
                      :prepend-icon="stall.electricity ? 'power' : 'power_off'"
                      :color="stall.electricity ? 'amber' : 'red'"
                      >Electricity</v-chip
                    >
                    <v-chip
                      class="mt-2 me-2"
                      :prepend-icon="stall.support ? 'support_agent' : 'block'"
                      :color="stall.support ? 'green' : 'red'"
                      >Staff support</v-chip
                    >
                    <v-chip class="mt-2 me-2" prepend-icon="aspect_ratio" color="blue">{{
                      stall.size
                    }}</v-chip>
                    <v-chip class="mt-2 me-2" prepend-icon="tag" color="teal-darken-4">{{
                      stall.amount
                    }}</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>
