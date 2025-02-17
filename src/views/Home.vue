<template>
  <div style="padding-bottom: 150px;">
    <v-container class="">
      <v-row class="above-the-fold flex-column align-center" style="height: 100vh;">
        <v-col cols="3"></v-col>
        <v-col class="flex-grow-0">
          <!-- logo -->
          <v-card color="transparent" flat :height="logoHeight" class="landing-page-logo">
            <img
                src="@/assets/openalex-logo-icon-black-and-white.png"
                class="logo-icon mr-0 colorizable"
            />
            <span
                class="logo-text colorizable"
                :style="'font-size:' + logoHeight * .75 + 'px'"
            >
                OpenAlex
              </span>

          </v-card>
        </v-col>
        <v-col>
          <v-card flat rounded class="color-2 pa-0" max-width="600" style="margin: 0 auto;">
            <div class="pa-5 pb-0 px-6 d-flex align-center">
              Search and analyze the world's research.
              <v-spacer></v-spacer>
              <v-btn icon @click="$vuetify.goTo('#learn-more')">
                <v-icon>mdi-information-outline</v-icon>

              </v-btn>


            </div>
            <div class="pa-5">
              <search-bar/>
            </div>

          </v-card>


        </v-col>
        <v-spacer></v-spacer>
        <v-btn text rounded class="mb-3" @click="$vuetify.goTo('#learn-more')">
          <v-icon>mdi-chevron-down</v-icon>
          Learn more
        </v-btn>
      </v-row>

      <!--        <p style="">-->
      <!--          Inspired by the ancient library of Alexandria, OpenAlex catalogs 250M scholarly works, along with their-->
      <!--          citations, authors, institutional affiliations, and more &mdash; and we're 100% free and open source.-->
      <!--        </p>-->

    </v-container>
      <v-divider id="learn-more" class=""/>
    <div class="color-3 lighten-5 py-4 mb-8">
      <div class="text-center body-2 grey--text pb-2">
        Trusted by hundreds of institutions worldwide, including
      </div>
      <div class="d-flex align-center justify-center flex-wrap user-logo-container"
           :class="{mobile: $vuetify.breakpoint.mobile}">
        <img class="user-logo"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Logo_of_Sorbonne_University.svg/320px-Logo_of_Sorbonne_University.svg.png"
             alt="">
        <img class="user-logo"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Grammarly_logo.svg/320px-Grammarly_logo.svg.png"
             alt="">
        <img class="user-logo tall"
             src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/American_Chemical_Society_logo.svg/240px-American_Chemical_Society_logo.svg.png"
             alt="">
        <!--          <img class="user-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Bristol-Myers_Squibb_logo_%282020%29.svg/800px-Bristol-Myers_Squibb_logo_%282020%29.svg.png" alt="">-->
        <img class="user-logo short"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Logo_EPFL.svg/320px-Logo_EPFL.svg.png"
             alt="">
        <img class="user-logo tall"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo_Bayer.svg/240px-Logo_Bayer.svg.png"
             alt="">
        <img class="user-logo" src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Jisc_logo.png" alt="">
        <img class="user-logo"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Chan_Zuckerberg_Initiative.svg/320px-Chan_Zuckerberg_Initiative.svg.png"
             alt="">
      </div>

    </div>
    <v-container>

      <v-row>
        <v-col cols="12">
          <div class="text-h4 py-9 pt-12">
            OpenAlex is a free global index of
                        <vue-typer
                            class="font-weight-bold d-block d-lg-inline"
                            :text="textToType"
                            :pre-erase-delay='1000'
                        />
          </div>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col cols="12" lg="4" class="">
          <v-card rounded flat class="color-3 fill-height d-flex flex-column">
            <v-card-title class="color-2 mb-3">
              <v-icon left color="black">mdi-earth-plus</v-icon>
              Industry-leading coverage
            </v-card-title>
            <v-card-text class="body-1 flex-grow-1">
              <p>
                We index over <strong>250M</strong> works from 250k sources, with extra coverage of humanities,
                non-English languages, and the Global South.
              </p>
              <p>
                We link these works to 90M disambiguated authors and 100k institutions, as well as enriching them with
                topic information, SDGs, citation counts, and much more.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn text rounded href="https://help.openalex.org" target="_blank">
                <v-icon left>mdi-chart-bar</v-icon>
                About the data
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4" class="">
          <v-card rounded flat class="color-3 fill-height d-flex flex-column">
            <v-card-title class="color-2 mb-3">
              <v-icon left color="black">mdi-lock-open-variant</v-icon>
              Open, top to bottom
            </v-card-title>
            <v-card-text class="body-1 flex-grow-1">
              <p>
                Export all your search results for free. For more flexibility use our API or even download the whole
                dataset. It's all CC0-licensed so you can share and reuse it as you like!
              </p>
              <p>
                Want to see how it works? 100% of our source code is open, too.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn text rounded href="https://docs.openalex.org/" target="_blank">
                <v-icon left>mdi-cog-outline</v-icon>
                API
              </v-btn>
              <v-btn text rounded href="https://docs.openalex.org/download-all-data/openalex-snapshot" target="_blank">
                <v-icon left>mdi-database-outline</v-icon>
                Data
              </v-btn>
              <v-btn text rounded href="https://github.com/ourresearch" target="_blank">
                <v-icon left>mdi-code-braces</v-icon>
                Code
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4" class="">
          <v-card rounded flat class="color-3 fill-height d-flex flex-column">
            <v-card-title class="color-2 mb-3">
              <v-icon left color="black">mdi-hand-heart</v-icon>
              Sustainably not-for-profit
            </v-card-title>
            <v-card-text class="body-1 flex-grow-1">
              <p>
                OpenAlex is made by OurResearch, a nonprofit dedicated to making research open. And we've got a decade's
                experience keeping tools like Unpaywall sustainably open with a freemium business model.
              </p>
              <p>
                If you'd like to upgrade your OpenAlex experience, check our our Premium subscription.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn text rounded href="https://ourresearch.org/" target="_blank">
                <v-icon left>mdi-account-multiple-outline</v-icon>
                About us
              </v-btn>
              <v-btn text rounded href="https://help.openalex.org/pricing" target="_blank">
                <v-icon left>mdi-diamond-stone</v-icon>
                Upgrade
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>


      </v-row>
      <!--      <v-divider class="mt-12" />-->

    </v-container>
  </div>


  <!--        <homepage-user-logos/>-->

  <!--        <homepage-selling-points />-->

  <!--        <homepage-testimonials />-->


</template>

<script>

import SearchBar from "@/components/SearchBar.vue";
import {VueTyper} from 'vue-typer'

export default {
  name: 'home',
  components: {
    SearchBar,
    VueTyper,
  },
  metaInfo: {
    title: "OpenAlex: The open catalog to the global research system",
    titleTemplate: undefined, // have to override this or it'll get the site title template
  },
  data() {
    return {
      userEmail: "",
      errorMsg: "",
      textToType: [
        "the research ecosystem.",
        "researchers.",
        "scholarly journals.",
        "research institutions.",
        "citations.",
      ]
    }
  },
  computed: {
    logoHeight() {
      return 75

      return this.$vuetify.breakpoint.mobile ?
          50 :
          75
    }
  },
  methods: {},
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.landing-page-logo {

  display: flex;
  align-items: center;
  justify-content: center;

  .logo-icon {
    height: 100%;
  }

  .logo-text {
    margin: 0;
    line-height: 1.2;
    color: #000;
    font-family: Dosis;
    padding-left: .3em;
    font-weight: 500;
  }
}

.user-logo-container {
  &.mobile {
    .user-logo {
      height: 30px;
      &.tall {
        height: 35px;
      }

      &.short {
        height: 25px;
      }
    }

  }

  .user-logo {
    height: 50px;
    margin:20px;
    filter: grayscale(1);
    opacity: .66;

    &.tall {
      height: 70px;
    }

    &.short {
      height: 40px;
    }
  }

}


.above-the-fold {
  /*background: linear-gradient(0deg, rgba(230,230,230,1) 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%);*/
  //background: linear-gradient(0deg, #eee 20%, #fff 20%);
}


</style>
