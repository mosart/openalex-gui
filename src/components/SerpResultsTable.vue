<template>
  <v-card flat rounded class="py-3">
    <table v-if="resultsCount" class="serp-results-table">
      <thead>
      <tr>
        <results-table-header
            v-for="config in headerConfigs"
            :key="config.key"
            :config="config"
        />
        <th key="new-column-button">
          <action action="column"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <results-table-row
          v-for="result in resultsObject.results"
          :key="result.id"
          :entity="result"
      />
      </tbody>
    </table>
  </v-card>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import VueJsonPretty from 'vue-json-pretty'

import {url} from "@/url";


import ResultWork from "./Result/ResultWork.vue";
import ResultAuthor from "./Result/ResultAuthor.vue";
import ResultSource from "./Result/ResultSource.vue";
import ResultPublisher from "./Result/ResultPublisher.vue";
import ResultFunder from "@/components/Result/ResultFunder.vue";
import ResultInstitution from "./Result/ResultInstitution.vue";
import ResultConcept from "./Result/ResultConcept.vue";
import {entityTypes} from "../util";
import router from "../router";
import ResultsTableHeader from "@/components/ResultsTable/ResultsTableHeader.vue";
import ResultsTableRow from "@/components/ResultsTable/ResultsTableRow.vue";
import ActionMenuItem from "@/components/Action/Action.vue";
import ExportButton from "@/components/ExportButton.vue";
import {getFacetConfig} from "@/facetConfigs";
import Action from "@/components/Action/Action.vue";

export default {
  name: "SerpResultsList",
  components: {
    Action,
    VueJsonPretty,

    ResultWork,
    ResultAuthor,
    ResultSource,
    ResultPublisher,
    ResultFunder,
    ResultInstitution,
    ResultConcept,

    ResultsTableHeader,
    ResultsTableRow,

    ActionMenuItem,
    ExportButton,


  },
  props: {
    resultsObject: Object,
  },
  data() {
    return {
      resultsPerPage: 25, // not editable now, but could be in future
      // activeSortKey: "cited_by_count:desc",
    }
  },
  computed: {
    ...mapGetters([
      "entityConfig",
      "entityType",
    ]),
    headerKeys() {
      return this.$route.query.column?.split(",") ?? []
    },
    headerConfigs() {
      return this.headerKeys
          .map(key => {
            return getFacetConfig(this.entityType, key)
          })

    },
    resultComponentName() {
      return "result-" + this.entityConfig.nameSingular
    },
    resultsCount() {
      return this.resultsObject.meta.count
    },


  },

  methods: {
    ...mapMutations([
      "snackbar",
    ]),
    ...mapActions([]),


  },
  created() {
  },
  mounted() {
  },
  watch: {}
}
</script>

<style lang="scss">
table.serp-results-table {

  th {
    padding: 0 10px;
    white-space: nowrap;
    background: #fff;
    display: table-cell;
    text-align: left;
    vertical-align: center;
    border-bottom: 1px solid #eee;

    .header-cell-contents {
      position: absolute;
      padding-top: 10px;
      top: 0;

    }

    .header-width {
      visibility: hidden;
      display: block;
      height: 0;
    }

    &.title-header {
      text-align: left;
      padding-left: 70px;

    }

  }
}


div.serp-results-list {
  .v-list-item__title, .v-list-item__subtitle {
    white-space: normal !important;
    line-height: 1.4 !important;
  }

}

.vjs-tree-node.is-highlight, .vjs-tree-node:hover {
  background-color: transparent !important;
}
</style>