<script setup>
import { ref, onMounted, computed } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import CompanyCard from '@/components/cards/Company.vue'
import FairForm from '@/components/forms/Fair.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import IndustrySelect from '@/components/IndustrySelect.vue'
import IndustryIndicators from '@/components/IndustryIndicators.vue'

const tab = ref('one')
const item = ref({ hall: {}, organizer: {} })
const stalls = ref([])

// composables & pinia stores
const api = useApi()
const ds = useDataStore()
const route = useRoute()
const router = useRouter()

// dialogs
const confDialog = ref(false)
const dialog = ref(false)

// search parameters
const cities = ref([])
const industries = ref([])
const companies = ref([])
const city = ref('')
const invites = ref([])

const guests = ref([])
const addInvite = (invite) => {
  invites.value.push(invite)
}
const sentInvites = computed(() => {
  const sent = []
  for (let invite of invites.value) if (invite.status == 0) sent.push(invite)
  return sent
})
const totalSpaces = computed(() => {
  let amt = 0
  for (let stall of stalls.value) {
    amt += stall.max_amount
  }
  return amt
})
const guestAmount = computed(() => {
  let accepted = 0
  for (let invite of invites.value) {
    if (invite.status == 1) {
      accepted += 1
    }
  }
  return (accepted * 100) / totalSpaces.value
})

const invitationsSent = computed(() => {
  return (invites.value.length * 100) / totalSpaces.value
})

const barColor = computed(() => {
  if (guestAmount.value <= 20) return 'red'
  if (guestAmount.value <= 40) return 'orange'
  if (guestAmount.value <= 65) return 'yellow'
  return 'green'
})

// functions
const findCompanies = async () => {
  const params = {}
  if (industries.value.length) params.industry = industries.value
  if (city.value) params.city = city.value
  const data = await api.getCompanies(params)
  companies.value = data
}

const fetchFair = async (id) => {
  const data = await api.getFair(id)
  item.value = data
  stalls.value = await api.getStalls({ hall_id: data.hall_id })
  const dinv = await api.getInvitations({ fair_id: id })
  invites.value = dinv
  for (let ind of data.industries) industries.value.push(ind.id)
  const ids = []
  for (let fp of item.value.fair_proxies) if (fp.status == 1) ids.push(fp.company_id)
  if (ids.length > 0) {
    const cdata = await api.getCompanies({ id: ids })
    guests.value = cdata
  }
}

const deleteFair = async () => {
  api.deleteFair(item.value.id)
  router.push({ name: 'home' })
}

onMounted(async () => {
  fetchFair(route.params.id)
  const cit = await api.getCities()
  cities.value = cit.cities
})
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) fetchFair(to.params.id)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" color="primary">
          <v-tab prepend-icon="info" value="one">Information</v-tab>
          <v-tab
            prepend-icon="account_circle"
            value="two"
            v-show="guests.length || (ds.roleCheck('organizer') && item.organizer_id == ds.user.id)"
            >Guests ({{ guests.length }})</v-tab
          >
          <v-tab
            v-show="ds.roleCheck('organizer') && item.organizer_id == ds.user.id"
            value="three"
            prepend-icon="mail"
            >Invitations</v-tab
          >
        </v-tabs>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col>
        <v-row>
          <v-col>
            <v-progress-linear height="30" rounded v-model="guestAmount" :color="barColor">
              {{ guests.length }}/{{ totalSpaces }} stalls occupied
            </v-progress-linear>
          </v-col>

          <v-col>
            <v-progress-linear
              v-show="tab == 'three'"
              height="30"
              rounded
              v-model="invitationsSent"
              :color="barColor"
            >
              {{ invites.length }}/{{ totalSpaces }} invitations sent
            </v-progress-linear>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-window v-model="tab">
      <v-window-item value="one">
        <v-row justify="center">
          <v-col>
            <v-row align="center">
              <v-col cols="10">
                <div class="mt-5 mb-2 font-weight-bold text-h4">{{ item.name }}</div>
                <v-btn-group v-if="!item.published" density="compact">
                  <v-dialog>
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" append-icon="edit" color="green" text="edit" />
                    </template>

                    <v-card>
                      <v-card-item>
                        <v-card-title>Edit fair</v-card-title>
                      </v-card-item>
                      <v-card-text>
                        <FairForm :id="item.id" />
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-btn
                    append-icon="delete"
                    color="red"
                    text="delete"
                    @click="confDialog = true"
                  />
                  <ConfirmationDialog
                    :visible="confDialog"
                    @accept="deleteFair"
                    @decline="confDialog = false"
                  />
                </v-btn-group>
              </v-col>

              <v-col>
                <v-tooltip>
                  <template v-slot:activator="{ props }">
                    <v-avatar size="x-large" v-bind="props" :image="item.organizer.image" />
                  </template>
                  {{ item.organizer.name }} {{ item.organizer.surname }}
                </v-tooltip>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-tooltip text="Start" location="bottom">
                  <template v-slot:activator="{ props }">
                    <span class="me-4" v-bind="props">
                      <v-icon color="green" icon="flag" /> {{ item.start }}</span
                    >
                  </template>
                </v-tooltip>
                <v-tooltip text="End" location="bottom">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props" class="me-4">
                      <v-icon color="red" icon="flag_circle" /> {{ item.end }}</span
                    >
                  </template>
                </v-tooltip>
                <IndustryIndicators :industries="item.industries || []" />
              </v-col>
            </v-row>

            <v-row>
              <v-col class="text-subtitle-2">
                <span class="me-5">
                  <v-icon icon="place" /> {{ item.hall.city }}, {{ item.hall.street }}
                </span>
                <v-icon icon="location_city" /> {{ item.hall.name }}
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <p>{{ item.description }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="two">
        <v-row
          justify="center"
          v-show="ds.roleCheck('organizer') && item.organizer_id == ds.user.id"
          class="pa-5"
        >
        </v-row>
        <v-row class="pa-5">
          <v-col md="4" v-for="cmpny in guests" :key="cmpny.id" v-if="guests.length">
            <CompanyCard
              :company="cmpny"
              :trimText="150"
              :deletable="ds.roleCheck('organizer') && ds.user.id == item.organizer_id"
              :fair="item.id"
              :invitable="false"
            />
          </v-col>
          <v-col v-else>
            <v-row>
              <v-col cols="4">
                <div class="text-h3">
                  No guests,<br />
                  yet!
                </div>
              </v-col>
              <v-col>
                <v-img src="/assets/empty.svg" max-height="300" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="three">
        <v-row class="pa-5">
          <v-col class="text-right">
            <v-dialog v-model="dialog">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  text="invite exhibitors"
                  prepend-icon="add"
                  v-show="invites.length < totalSpaces"
                />
              </template>

              <v-card>
                <v-card-item>
                  <v-card-title>Candidates</v-card-title>
                </v-card-item>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <IndustrySelect name="industry" v-model="industries" />
                    </v-col>

                    <v-col>
                      <v-select
                        prepend-inner-icon="location_city"
                        v-model="city"
                        :items="cities"
                        item-value="city"
                        item-title="city"
                        label="City"
                      />
                    </v-col>

                    <v-col>
                      <v-btn @click="findCompanies" append-icon="search" color="red" text="find" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col md="4" sm="6" v-for="cmpny in companies" :key="cmpny.id">
                      <CompanyCard
                        :company="cmpny"
                        :trimText="150"
                        invite
                        :fair="item.id"
                        @invite-sent="addInvite"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>
