<template>
  <v-row>
    <v-col md="4" v-for="company in companies" :key="company.id">
      <CompanyCard :company="company" />
    </v-col>
  </v-row>
</template>

<script setup>
import CompanyCard from '@/components/cards/Company.vue'

const companies = [
  {
    id: 1,
    name: 'Microsoft',
    logo: 'https://static.vecteezy.com/system/resources/previews/022/100/816/original/microsoft-logo-transparent-free-png.png',
    short_desc:
      'Microsoft is a multinational technology corporation headquartered in Redmond, Washington, known for developing, licensing, and selling a wide range of software, hardware, and cloud computing services. Founded by Bill Gates and Paul Allen in 1975.',
    industries: [
      { id: 1, name: 'IT services', icon: 'devices', color: 'blue' },
      { id: 2, name: 'Cloud hosting', icon: 'cloud', color: 'blue' }
    ],
    address: { id: 1, street: 'Somewhere 99', city: 'Los Angeles' }
  },
  {
    id: 2,
    name: 'Sacred Heart Hospital',
    logo: 'https://live.staticflickr.com/2169/2233568571_55b9d87e59_b.jpg',
    short_desc:
      'The place where surgeons wield scalpels and sarcasm with equal precision, and where the vending machines dispense both Band-Aids and badly needed coffee in emergency doses.Dr. Jan Itor, the enigmatic custodian of Sacred Heart Hospital, is known for his uncanny ability to be everywhere, from the hallways to the darkest corners of the janitorial closet. ',
    industries: [
      { id: 3, name: 'Medical services', icon: 'medical_services', color: 'red' },
      { id: 4, name: 'Insurance', icon: 'local_atm', color: 'green' }
    ],
    address: { id: 1, street: 'Greed 101', city: 'Greater Sacramento' }
  },
  {
    id: 1,
    name: 'Dunder Mifflin',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Dunder_Mifflin%2C_Inc.svg',
    short_desc:
      "Dunder Mifflin, the paper purveyor extraordinaire, where reams of office paper become the unsung heroes of the 9-to-5 grind, and the copy machine harbors more secrets than a spy agency. In this peculiar realm, conference room meetings turn into improv comedy shows, desk chairs serve as swivel-based entertainment, and the break room's coffee maker plays the role of office therapist, witnessing emotional breakdowns over spilled coffee like a trusted confidant. Amidst the mundane hum of office life, it's the antics of employees like Jim and Pam's desk pranks, Dwight's beet farming dreams, and Michael's misguided attempts at management that transform paper-selling into a daily dose of comedic gold.",
    industries: [{ id: 5, name: 'Paper & Fax', icon: 'print', color: 'purple' }],
    address: { id: 1, street: 'Shenanigans 7', city: 'Scranton' }
  }
]
</script>
