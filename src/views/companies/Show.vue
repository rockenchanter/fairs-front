<script setup>
import IndustryIndicators from '../../components/IndustryIndicators.vue'

const company = {
  id: 1,
  name: 'Microsoft',
  logo: 'https://static.vecteezy.com/system/resources/previews/022/100/816/original/microsoft-logo-transparent-free-png.png',
  short_desc: `
Microsoft, a technological juggernaut that has left an indelible mark on the world of computing and software innovation. Founded by Bill Gates and Paul Allen in 1975, this colossal corporation has grown from a humble startup in a garage to one of the most influential and iconic companies on the planet.
With its headquarters nestled in the picturesque campus of Redmond, Washington, Microsoft is synonymous with the Windows operating system, an integral part of countless computers worldwide. Windows, with its evolving versions, has been the digital gateway for generations, inviting users to explore a digital universe that spans from productivity tools to entertainment and gaming.
Microsoft's software suite extends far beyond Windows, encompassing the ubiquitous Office suite, a productivity powerhouse that has become the lifeblood of businesses, students, and professionals alike. The mere mention of Word, Excel, and PowerPoint conjures images of document creation, number crunching, and dazzling presentations, all made possible by Microsoft's creative software genius.
In the realm of cloud computing, Azure, Microsoft's cloud platform, looms large. Azure offers an expansive playground for businesses and developers to build, deploy, and manage applications and services on a global scale. It's the backbone for countless digital ecosystems, supporting everything from e-commerce websites to cutting-edge artificial intelligence projects.
Microsoft also boasts a significant presence in the gaming industry, with the Xbox brand delivering a thrilling dose of immersive entertainment. Gamers around the world unite under the Xbox banner, battling foes and exploring vast virtual realms, all while forging connections and friendships in the vibrant Xbox Live community.
But Microsoft's influence isn't limited to software and gaming. The acquisition of LinkedIn has solidified its presence in the professional networking sphere, while investments in AI research and development have positioned it at the forefront of the AI revolution. The HoloLens, Microsoft's foray into mixed reality, has the potential to reshape industries from healthcare to education by merging the digital and physical worlds.
As a stalwart of corporate responsibility, Microsoft has taken bold steps in the realm of sustainability, pledging to become carbon negative by 2030. It's a testament to their commitment to not only shape the future of technology but also to protect the future of the planet.
In a world where technology evolves at the speed of thought, Microsoft remains at the forefront of innovation, a pioneer whose influence extends beyond code and algorithms, touching the lives of billions in profound and transformative ways. From Windows to Word to the cloud and beyond, Microsoft is a digital architect, weaving the fabric of our interconnected world, one line of code at a time.'s coffee maker plays the role of office therapist, witnessing emotional breakdowns over spilled coffee like a trusted confidant. Amidst the mundane hum of office life, it's the antics of employees like Jim and Pam's desk pranks, Dwight's beet farming dreams, and Michael's misguided attempts at management that transform paper-selling into a daily dose of comedic gold.`,
  industries: [
    { id: 1, name: 'IT services', icon: 'devices', color: 'blue' },
    { id: 2, name: 'Cloud hosting', icon: 'cloud', color: 'blue' }
  ],
  address: { id: 1, street: 'Somewhere 99', city: 'Los Angeles' },
  exhibitor: {
    name: 'Bill Gates',
    image:
      'https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds'
  },
  fairs: [
    {
      id: 1,
      name: 'SharkFest',
      logo: 'https://gitlab.com/uploads/-/system/project/avatar/25780476/logo-blue.jpg'
    },
    {
      id: 2,
      name: 'Developer Conference',
      logo: 'https://cdn.thedevconf.com.br/img/logo/logo-tdc.png'
    }
  ]
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="7">
        <v-row align="center" class="mb-1">
          <v-col md="8">
            <span class="text-h5">
              <v-avatar :image="company.logo" size="x-large" /> {{ company.name }}</span
            >
          </v-col>
          <v-col class="text-right">
            <v-tooltip :text="company.exhibitor.name">
              <template v-slot:activator="{ props }">
                <v-avatar v-bind="props" size="large" :image="company.exhibitor.image" />
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <div class="mb-5"><IndustryIndicators :industries="company.industries" /></div>
        <p v-html="company.short_desc"></p>
      </v-col>

      <v-col>
        <div class="text-h5 my-4">Find us here</div>
        <v-card
          v-for="fair in company.fairs"
          class="my-4 d-flex justify-start flex-wrap"
          :key="fair.id"
          :to="{ name: 'fairs-show', params: { id: fair.id } }"
        >
          <v-avatar rounded="0" size="80">
            <v-img :src="fair.logo" />
          </v-avatar>
          <v-card-item>
            <div class="text-subtitle-2 font-weight-bold">{{ fair.name }}</div>
            <v-card-subtitle>{{ fair.name }} </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
