<template>
  <v-app>

<!--    <v-navigation-drawer-->
<!--        v-model="isSiteNavOpen"-->
<!--        app-->
<!--        floating-->
<!--        color="white"-->
<!--        :mini-variant="$vuetify.breakpoint.lgAndDown"-->
<!--        v-if="$route.name !== 'Home'"-->

<!--    >-->
<!--&lt;!&ndash;        color="hsl(213, 69%, 95%)"&ndash;&gt;-->

<!--      <site-nav :is-mini="$vuetify.breakpoint.lgAndDown" />-->


<!--    </v-navigation-drawer>-->
    <v-progress-linear
        indeterminate
        fixed color="primary"
        style="z-index: 9999"
        v-if="globalIsLoading"
    />
    <v-app-bar
        app
        flat

        color="transparent"
        class="pl-0"
        absolute
    >
<!--        v-if="$vuetify.breakpoint.mobile && $route.name !== 'Home'"-->

      <router-link
          :to="{name: 'Home'}"
          class="logo-link"
      >
        <img
            src="@/assets/openalex-logo-icon-black-and-white.png"
            class="logo-icon mr-0 colorizable"
        />
        <span
            class="logo-text colorizable"
        >
                OpenAlex
              </span>

      </router-link>

      <v-spacer/>

      <search-bar
          v-if="$route.name !== 'Home' && $vuetify.breakpoint.smAndUp"
          style="width: 600px;"
      />
      <v-spacer/>


      <div style="width: 110px" v-if="$vuetify.breakpoint.mdAndUp"></div> <!-- hack to center the search bar... -->
      <v-menu rounded offset-y>
        <template v-slot:activator="{on}">
          <v-btn
              icon
              class="elevation-0 font-weight-regular mr-0"
              v-on="on"
          >
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item href="https://help.openalex.org/" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              User manual
              <v-icon small right class="">mdi-open-in-new</v-icon>
            </v-list-item-title>
          </v-list-item>
          <v-list-item href="https://docs.openalex.org/" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-api</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              API reference
              <v-icon small right class="">mdi-open-in-new</v-icon>
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="help">
            <v-list-item-icon>
              <v-icon>mdi-message-text-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Contact us
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-slot:extension v-if="$route.name !== 'Home' && $vuetify.breakpoint.xsOnly">
        <search-bar style="width: 100%;" />
      <v-spacer/>

      </template>


    </v-app-bar>
    <div>
    </div>
    <v-main >
      <router-view></router-view>
      <site-footer />
    </v-main>

    <v-snackbar
        top
        v-model="$store.state.snackbarIsOpen"
    >
      <v-icon dark left v-if="$store.state.snackbarIcon">{{ $store.state.snackbarIcon }}</v-icon>
      {{ $store.state.snackbarMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn
            icon
            v-bind="attrs"
            @click="$store.commit('closeSnackbar')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>


  </v-app>
</template>

<script>


import {mapActions, mapGetters, mapMutations} from "vuex";
import {sleep} from "./util";
import axios from "axios";
import {filtersFromUrlStr} from "@/filterConfigs";
import SearchBoxNew from "@/components/SearchBoxNew.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteNav from "@/components/SiteNav.vue";
import {url} from "@/url";
import SearchBox from "@/components/EntityTypeSelector.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'App',
  metaInfo: {
    titleTemplate: 'OpenAlex | %s',
    link: [],

    meta: []
  },
  components: {
    SearchBox,
    SearchBoxNew,
    SiteFooter,
    SiteNav,
    SearchBar,
  },


  data: function () {
    return {
      exportProgress: 0,
      isSiteNavOpen: !this.$vuetify.breakpoint.mobile,
      exportObj: {
        progress: 0,
      },
      dialogs: {
        showAlpha: false
      },
      resultsFilters: [],
      url,
    }
  },
  computed: {
    ...mapGetters([
      "searchFacetConfigs",
      "globalIsLoading",
      "entityType",
    ]),

    logoStyle() {
      return "opacity: .7;"
      return `filter: contrast(1000%) invert(100%) sepia(100%) saturate(10000%) brightness(.5) hue-rotate(${this.logoColorRotation}deg);`
    },
    isLocalHost() {
      return window.location.hostname === "localhost"
    },
    exportIsFinished() {
      return this.exportObj.progress === 1
    },
  },
  methods: {
    ...mapMutations([
      "setFiltersZoom",
      "openFacetsDialog",
      "snackbar",
    ]),
    ...mapActions([]),
    async copyToClipboard(content) {
      await navigator.clipboard.writeText(content);
      this.snackbar("Copied to clipboard.")
    },
    cancelExport() {
      this.exportObj = null
      this.$store.state.exportProgressUrl = null
      this.snackbar("Export cancelled.")
    }
  },
  async mounted() {
    setInterval(async () => {
      if (!this.$store.state.exportProgressUrl) return
      const resp = await axios.get(this.$store.state.exportProgressUrl)
      console.log(resp.data)
      this.exportObj = resp.data
      if (this.exportObj === 1) {
        this.exportObj = null
        this.$store.state.exportProgressUrl = null
      }
    }, 1000)
    // await sleep(2000)
    // console.log("disable body scroll")
    // bodyScrollLock.disableBodyScroll()
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to, from) {
        this.resultsFilters = filtersFromUrlStr(
            this.entityType,
            to?.query?.filter
        )
      }
    }
  }
};
</script>
<style lang="scss">

.v-main {
  background-color: #fff;
}
$color-3: hsl(210, 60%, 98%);
$color-2: hsl(213, 69%, 95%);
$color-1: hsl(213, 72%, 88%);
$color-0: hsl(212, 77%, 82%);


.color-3 {background-color: $color-3 !important;}
.color-2 {background-color: $color-2 !important;}
.color-1 {background-color: $color-1 !important;}
.color-0 {background-color: $color-0 !important;}


.hover-color-3:hover {background-color: $color-3 !important; transition: background-color 500ms;}
.hover-color-2:hover {background-color: $color-2 !important; transition: background-color 500ms;}
.hover-color-1:hover {background-color: $color-1 !important; transition: background-color 500ms;}
.hover-color-0:hover {background-color: $color-0 !important; transition: background-color 500ms;}


.v-card.factoid-card {
  //background-color: #EEF5FC;
  background-color: $color-2;
  border: none;
  box-shadow: none;
  .v-card__title {
    background-color: $color-1;
  }
  .v-card__text {
    padding-top:12px;
    background-color: white;
  }
  .v-card__actions {
    //background-color: $color-1;

  }
}

.v-card.button-card {
  transition: background-color 300ms;
  $card-start-color: hsl(213, 72%, 88%);
  background-color: $color-1;

  border: none;
  &:hover {
    background-color: $color-0;
    &.no-hover {
      background-color: $color-1;
    }

  }
}

.v-toolbar__extension {
  padding: 4px;
}

.keyboard-shortcut {
  color: #9e9e9e; // vuetify grey--text
  border: 1px solid #ccc;
  padding: 0 5px;
  border-radius: 5px;

}

// don't show when a card has focus because we don't care.
.v-card--link:focus:before {
  opacity: 0;
}

html, body {
  // THIS IS REQUIRED to disable styles that Vuetify applies,
  // which keep the v-scroll-lock directive from working.
  overflow: initial;
}

.theme--dark.v-card {
  background-color: #444;
}

.theme--dark.v-sheet {
  background-color: #444;

}


.v-btn--active.no-active::before {
  opacity: 0.00005 !important;
}


.v-btn.v-size--default {
  //opacity: 0.00005 !important;
  font-size: 1rem;
}

.v-btn {
  font-weight: 500;
  letter-spacing: normal;
  text-transform: none;
}

//.v-navigation-drawer__content {
//  overflow-y: hidden !important;
//}

.theme--light.v-list-item--active::before {
  //opacity: 0;
}

$logo-link-height: 35px;


.logo-link {
  text-decoration: none;
  width: 151px;
  display: flex;
  align-items: center;
  //padding-left: 30px;
  .logo-icon {
    height: $logo-link-height;
    //margin-top: -5px;
  }

  .logo-text {
    //padding: 0 14px;

    padding-left: .3em;
    line-height: 1.2;
    //border-left: 1px solid #333;
    color: #000;


    font-family: Dosis;
    font-size: $logo-link-height * 0.75;
    font-weight: 500;
  }
}

// https://stackoverflow.com/a/40444657
//.colorizable { filter: contrast(1000%) invert(100%) sepia(100%) saturate(10000%) brightness(.4) hue-rotate(70deg);}


.v-btn--active.no-active {
  //text-decoration: underline !important;
  //border-bottom: 3px solid #333;
}

body {
  //font-size: 16px;

  .v-application {
    //background: #F7F9FC !important;
    background: #fff !important;

    .rounded {
      border-radius: 15px !important;
    }

    .body-1, .body-2 {
      letter-spacing: normal !important;
    }

    .body-1 {
      font-size: 16px !important;
    }

    .body-2 {
      font-size: 14px !important;
    }

    .subtitle-1 {
      font-size: 17px !important;
    }

    .text-h6 {
      line-height: 1.3;
    }

    .text-initial {
      text-transform: initial !important;
    }
  }
}

.low-key-button {
  text-transform: none !important;
  font-weight: normal !important;
  letter-spacing: 0 !important;
}

.v-icon.mdi-checkbox-blank-outline,
.v-icon.mdi-checkbox-blank-circle-outline {
  //opacity: 0.2 !important;
}

.v-icon.mdi-plus {
  //opacity: .7 !important;
}

.v-list-item__icon {
  //margin-top: 8px !important;
}

.v-list-item__action, {
  align-self: flex-start;
  margin-top: 8px;
}

.v-list--two-line.v-list--dense .v-list-item {
  min-height: unset;
}

.v-list-item {
  min-height: unset !important;

  .v-list-item__content {
    padding: 10px 0 !important;
  }
}

.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 8px;
}



.v-expansion-panel-content__wrap {
  //padding: 0 16px 16px;
}

.capitalize-first-letter::first-letter {
  text-transform: uppercase !important;
}

img.site-footer-logo {
  width: 60px;

}

.page {
  margin-top: 50px;
}

.v-tabs--icons-and-text .v-tab {
  font-size: 12px !important;
  text-transform: capitalize;
}


</style>
