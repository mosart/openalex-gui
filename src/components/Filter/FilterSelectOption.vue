<template>
  <v-menu
      rounded
      max-width="400"
      class=""
      offset-y
      :close-on-content-click="false"
      v-model="isMenuOpen"
  >
    <template v-slot:activator="{on}">
      <!--    <v-progress-circular v-if="isLoading" size="10" indeterminate class="mr-2" />-->
      <v-chip
          outlined
          label
          class="font-weight-bold option d-block mr-1"
          v-on="on"
          close
          @click:close="deleteMe"
      >
        <span class="mr-2" v-if="isNegated">NOT</span>
        <template v-if="filterDisplayValue">
          {{ filterDisplayValue | truncate(20) }}
        </template>
        <template v-else>
          loading...
        </template>
<!--        <v-icon>mdi-menu-down</v-icon>-->
      </v-chip>
    </template>
    <v-card :loading="isLoading">
      <div class="pa-3 d-flex">
        <div class="content">
          <div class="text-h6">
            {{ filterDisplayValue }}
          </div>
          <div class="caption grey--text">
            {{ myEntityType | pluralize(1)}}
            {{ isEntity ? " · " + myEntityId : "" }}
            <template v-if="0"></template>
          </div>
        </div>
        <v-spacer></v-spacer>

        <v-btn
               class="ml-4"
               icon
               :to="filterId | entityZoomLink"
               v-if="isEntity">
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>


      </div>
      <v-divider v-if="isEntity" />
      <v-card-text class="pa-4" v-if="isEntity">
        <div v-if="alternateNamesString">
          <span class="font-weight-bold">Alternate names: </span>
          <span>{{ alternateNamesString }}</span>
        </div>
        <div v-if="locationStr" class="mt-2">
          <span class="font-weight-bold">Location: </span>
          <span>{{ locationStr }}</span>
        </div>

      </v-card-text>

      <v-divider/>
      <v-card-actions>
        <v-spacer/>



        <v-btn
            class="ml-2"
            text
            rounded
            @click="toggleIsNegated"
            :input-value="isNegated"
            :color="isNegated ? 'primary' : undefined"
        >
          <template v-if="isNegated">
            <v-icon left>mdi-minus-circle-off</v-icon>
            Remove negation
          </template>
          <template v-else>
            <v-icon left>mdi-minus-circle</v-icon>
            Negate
          </template>
        </v-btn>

         <v-btn
            class="ml-2"
            text
            rounded
            @click="deleteMe"
        >
          <v-icon left>mdi-close-circle</v-icon>
          Remove
        </v-btn>



      </v-card-actions>


    </v-card>
  </v-menu>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import {api} from "@/api";
import {entityTypeFromId, isOpenAlexId, shortenOpenAlexId} from "@/util";
import {url} from "@/url";

import {getEntityConfig, getLocationString} from "@/entityConfigs";
import {getFacetConfig} from "@/facetConfigs";

export default {
  name: "FilterOptionChip",
  components: {
  },
  props: {
    disabled: Boolean,
    filterValue: String,
    filterKey: String,
    close: Boolean,
    openMenu: Boolean,
    position: Number,
  },
  data() {
    return {
      foo: 42,
      displayValue: "",
      isLoading: false,
      isMenuOpen: false,
    }
  },
  computed: {
    ...mapGetters([
      "resultsFilters",
      "entityType",
    ]),
    isEntity() {
      if (!this.filterId) return false
      return isOpenAlexId(this.filterId)
    },
    myEntityType(){
      return (this.isEntity) ?
          entityTypeFromId(this.filterId) :
          this.filterConfig.displayName
    },
    filterConfig(){
      return getFacetConfig(this.entityType, this.filterKey)
    },
    filterId() {
      return this.filterValue.replace("!", "")
    },
    menuKey() {
      return this.filterKey + '-' + this.filterId
    },
    myEntityId(){
      if (!this.isEntity) return
      return shortenOpenAlexId(this.filterId)
    },
    isNegated() {
      return this.filterValue[0] === "!"
    },
    subtitle(){
      return "subtitle"
    },
    locationStr(){
      if (!this.filterData) return
      return getLocationString(this.filterData)
    },

    alternateNamesString() {
      return [
        ...this.filterData?.display_name_alternatives ?? [],
        ...this.filterData?.display_name_acronyms ?? [],
        ...this.filterData?.alternate_titles ?? [],

      ].join("; ")
    },
  },
  asyncComputed: {
    filterDisplayValue: async function () {
      this.isLoading = true
      // const resp = await api.makeAutocompleteResponseFromId(this.filterId)
      const displayName = await api.getFilterValueDisplayName(this.filterKey, this.filterId)
      this.isLoading = false
      return displayName
    },
    filterData: async function () {
      if (!this.isEntity) return {}
      this.isLoading = true
      const resp = await api.getEntity(this.filterId)
      this.isLoading = false
      return resp
    },
  },

  methods: {
    getEntityConfig,
    ...mapMutations([
      "snackbar",
    ]),
    ...mapActions([]),
    deleteMe() {
      url.deleteFilterOption(this.entityType, this.filterKey, this.filterValue)
    },
    toggleIsNegated() {
      url.toggleFilterOptionIsNegated(
          this.entityType,
          this.filterKey,
          this.filterValue
      )
    },
  },
  created() {
  },
  async mounted() {
    // setTimeout(()=>{
    //   if (this.$store.state.filterOptionChipOpenMenu === this.menuKey){
    // this.isMenuOpen = true
    //
    //   }
    //
    // }, 100)


  },
  watch: {}
}
</script>

<style scoped lang="scss">
.option {
  font-weight: bold;
  cursor: pointer;

  &:hover {
    //text-decoration:  underline;

  }
}

</style>