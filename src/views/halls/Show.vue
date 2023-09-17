<template>
  <v-tabs v-model="tab" bg-color="primary">
    <v-tab prepend-icon="info" value="one">Information</v-tab>
    <v-tab prepend-icon="collections" value="two">Gallery</v-tab>
    <v-tab prepend-icon="event" value="three">Events</v-tab>
  </v-tabs>

  <v-container>
    <v-window v-model="tab" class="mt-5">
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
    </v-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import IndustryIndicators from '../../components/IndustryIndicators.vue'

const tab = ref('three')

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
  address: { id: 1, city: 'Rzeszów', street: 'Pigonia 1', zipcode: '13-333' }
}
</script>
