<template>
  <!--  <div class="entity-zoom-container">-->
  <div>

  <v-container v-if="data" flat class="" min-height="100vh">
    <v-row>
      <v-col>
        <v-alert type="error" prominent v-if="data.is_retracted">
          <v-row align="center">
            <v-col class="grow">
              This work has been <strong>retracted.</strong>

            </v-col>
            <v-col class="shrink">
              <v-btn icon href="https://en.wikipedia.org/wiki/Retraction_in_academic_publishing" target="_blank">
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>

            </v-col>
          </v-row>
        </v-alert>
        <div class="d-flex">
          <div class="">
            <div
                class="text-h2"
                v-html="$prettyTitle(data.display_name)"
            />
            <div class="mt-2 mb-4">
              <span v-if="data.publication_year">{{ data.publication_year }} </span>
              <span>{{ data.type }}</span>
              <span class="mx-1">by</span>
              <work-authors-string :authorships="data.authorships"/>
              <span v-if="data?.primary_location?.source?.display_name"> in
            <router-link :to="data.primary_location.source.id | entityZoomLink">
              {{ data.primary_location.source.display_name }}.
            </router-link>
             </span>

            </div>

          </div>


        </div>
        <div class="d-flex">
          <work-linkouts :data="data"/>
        </div>

      </v-col>
    </v-row>
    <v-row class="mt-8">
      <!--        <v-col cols="4" v-if="abstract">-->
      <!--          -->
      <!--        </v-col>-->


      <v-col cols="8">
        <!-- AUTHORS -->
        <v-card rounded flat color="#E9F2FB">
          <v-card-title>
            Authors
          </v-card-title>
          <v-list color="#E9F2FB">
            <entity-work-author
                v-for="author in data.authorships"
                :key="author.id"
                :author="author"
            />

          </v-list>
        </v-card>
        <v-card rounded flat color="#E9F2FB" class="mt-3">
          <v-card-title>
            Versions
          </v-card-title>
          <v-list color="#E9F2FB">

            <entity-work-source
                v-for="(loc, i) in data.locations"
                :loc="loc"
                :is-canonical="loc.landing_page_url === primaryLocationUrl"
                :key="i"
            />

          </v-list>
        </v-card>
      </v-col>


      <!-- CITATIONS STUFF -->
      <v-col cols="4">
        <v-row>
          <v-col cols="6">
            <v-card rounded flat color="#E9F2FB" class=text-right>
              <div class="pa-3 pb-0">
                Cited by
              </div>
              <div class="text-h3 pa-3">
                {{ data.cited_by_count }}
              </div>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card rounded flat color="#E9F2FB" class="pa-4">
              <span class="font-weight-bold">{{ data.referenced_works.length }}</span>
              outgoing references
            </v-card>
            <v-card rounded flat color="#E9F2FB" class="pa-4 mt-2">
              <span class="font-weight-bold">{{ data.related_works.length }}</span>
              related works
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="abstract">
          <v-card rounded flat color="#E9F2FB">
            <v-card-title>
              Abstract
            </v-card-title>
            <v-card-text>
              {{ abstract }}
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>

      <!-- VERSIONS STUFF -->


    </v-row>

  </v-container>

  <v-card v-if="0" outlined class="ma-1">
    <v-card-title>
      Citations
    </v-card-title>
    <div class="pa-4 pt-0">
      <div class="mt-3">
        <span class="pt-6 font-weight-bold">
          <span>Cited by: </span>
        </span>
        <span class="pt-6">
          <link-to-search
              :count="data.cited_by_count"
              entity-type="works"
              filter-key="cites"
              :filter-value="data.id"
          />
        </span>
      </div>

      <!--    References  -->
      <div>
        <span class="font-weight-bold">
          <span>Cites: </span>
        </span>
        <span class="">
          <link-to-search
              :count="data.referenced_works.length"
              entity-type="works"
              filter-key="cited_by"
              :filter-value="data.id"
          />
        </span>
      </div>
      <!--    Related works  -->
      <div>
        <span class="font-weight-bold">
          <span>Related: </span>
        </span>
        <span class="">
          <link-to-search
              :count="data.related_works.length"
              entity-type="works"
              filter-key="related_to"
              :filter-value="data.id"
          />
        </span>
      </div>
    </div>
  </v-card>


  <!--    <v-card outlined class="ma-1">-->
  <!--      <v-card-title>-->
  <!--        Versions-->
  <!--      </v-card-title>-->
  <!--      <v-list class="pa-0">-->

  <!--        <entity-work-source-->
  <!--            v-for="(loc, i) in data.locations"-->
  <!--            :loc="loc"-->
  <!--            :is-canonical="loc.landing_page_url === primaryLocationUrl"-->
  <!--            :key="i"-->
  <!--        />-->
  <!--      </v-list>-->
  <!--    </v-card>-->


  <div class="padded-part pa-4">

    <!--      <v-alert v-if="authorshipsToShow >= 100" type="warning" dense text>-->

    <!--        <strong>More than 100 authors.</strong> Only the top 100 are shown below.-->
    <!--      </v-alert>-->


    <div class="">


      <!--    Author list-->


      <!--    Concepts list-->
      <!--        <div v-if="data.concepts.length">-->
      <!--        <span class="font-weight-bold">-->
      <!--          Concepts:-->
      <!--        </span>-->
      <!--          <span>-->
      <!--          <concepts-list :concepts="data.concepts" :is-clickable="true"/>-->
      <!--        </span>-->
      <!--        </div>-->


    </div>
  </div>


  <v-expansion-panels flat accordion multiple>

    <v-expansion-panel v-if="data.grants && data.grants.length">
      <v-divider/>
      <v-expansion-panel-header>
        Funders <span class="caption ml-1">({{ data.grants.length }})</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="body-1">
        <v-list nav dense class="pa-0">
          <v-list-item
              v-for="(grant, i) in data.grants"
              :key="i"
              two-line
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ grant.funder_display_name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ grant.award_id }}
              </v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>


    <!--      <v-expansion-panel>-->
    <!--        <v-divider/>-->
    <!--        <v-expansion-panel-header>-->
    <!--          Locations <span class="caption ml-1">({{ data.locations.length }})</span>-->
    <!--        </v-expansion-panel-header>-->
    <!--        <v-expansion-panel-content>-->
    <!--          -->
    <!--        </v-expansion-panel-content>-->
    <!--      </v-expansion-panel>-->

  </v-expansion-panels>

  <!--  <pre>-->
  <!--    {{ data.locations }}-->
  <!--  </pre>-->

  </div>


</template>


<script>
import ConceptsList from "../ConceptsList.vue";
import Authorship from "../Authorship.vue";
import EntityIcon from "./EntityIcon.vue";

import {createSimpleFilter} from "../../filterConfigs";
import LinkToSearch from "../LinkToSearch.vue";
import {unravel, sleep} from "../../util";

import {mapActions, mapMutations, mapGetters} from "vuex";
import LinkToEntity from "../LinkToEntity.vue";
import WorkLinkouts from "@/components/WorkLinkouts.vue";
import WorkAuthorsString from "@/components/WorkAuthorsString.vue";
import EntityWorkSource from "@/components/Entity/EntityWorkSource.vue";
import EntityWorkAuthor from "@/components/Entity/EntityWorkAuthor.vue";
// import {url} from "../url";
import EntityIdsMenuItem from "@/components/Entity/EntityIdsMenuItem.vue";

export default {
  name: "EntityWork",
  components: {
    LinkToEntity,
    ConceptsList,
    Authorship,
    EntityIcon,
    LinkToSearch,
    WorkLinkouts,
    WorkAuthorsString,
    EntityWorkSource,
    EntityWorkAuthor,
    EntityIdsMenuItem,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      showAuthorDetails: false,
      maxAuthorshipsToShowAtFirst: 10,
      tab: 0,
    }
  },
  methods: {
    ...mapMutations([
      "snackbar"
    ]),
    ...mapActions([]),
    async copyPermalinkToClipboard() {
      await navigator.clipboard.writeText(this.data.id);
      this.snackbar("Permalink copied to clipboard.")
      // alert('Copied!');
    },


  },
  computed: {
    ...mapGetters([]),
    workIsFreeAtPublisher() {
      return ["gold", "bronze", "hybrid"].includes(this.data.open_access.oa_status)
    },
    abstract() {
      if (!this.data.open_access.is_oa) return
      return unravel(this.data.abstract_inverted_index)
    },
    fulltextUrl() {
      // this is kind of hacky because the oa data we get back from the api has weird holes.
      if (this.data.open_access.oa_url) return this.data.open_access.oa_url
      else if (this.data.open_access.is_oa) return this.data.primary_location.source.url
      else return null
    },
    apiUrl() {
      const shortId = this.data.id.replace("https://openalex.org/", "")
      return `https://api.openalex.org/works/${shortId}`
    },
    authorshipsCount() {
      return this.data.authorships.length
    },

    authorshipsHaveAtLeastOneInstitution() {
      return this.data.authorships.some(a => {
        return a.institutions.length
      })
    },
    linkToIncomingCitations() {
      const filter = createSimpleFilter("works", "cites", this.data.id)
      return {
        name: "Serp",
        params: {entityType: "works"},
        query: {filter: filter.asStr},
      }
    },
    linkToReferences() {
      const filter = createSimpleFilter("works", "cited_by", this.data.id)
      return {
        name: "Serp",
        params: {entityType: "works"},
        query: {filter: filter.asStr},
      }
    },
    linkToRelatedWorks() {
      const filter = createSimpleFilter("works", "related_to", this.data.id)
      return {
        name: "Serp",
        params: {entityType: "works"},
        query: {filter: filter.asStr},
      }
    },

    truncatedAuthorshipsCount() {
      return Math.max(this.data.authorships.length - this.maxAuthorshipsToShowAtFirst, 0)
    },
    authorshipsToShow() {
      return this.data.authorships.slice(0, 100)

      // if (!this.authorshipsCount) return []
      // const sliceAt = (this.showAuthorDetails) ? Infinity : this.maxAuthorshipsToShowAtFirst
      // return this.data.authorships.slice(0, sliceAt)
    },
    primaryLocationUrl() {
      return this.data.primary_location.landing_page_url;
    }
  },
  created() {
  },
  mounted() {

  },
  watch: {
    "data.id": function (to, from) {
      console.log("EntityWork new ID", to)
      this.showAuthorDetails = false
    }
  }
}
</script>

<style lang="scss" scoped>
.entity-buttons {
  width: 100%;
}

table {
  td.font-weight-bold {
    white-space: nowrap;
    vertical-align: top;
    color: #555;
    font-size: 15px;
  }
}

.entity-zoom-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}


</style>