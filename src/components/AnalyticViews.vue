<template>
  <v-card rounded flat color="color-3">
    <v-toolbar flat color="" class="color-3">
      <v-toolbar-title class="">
        <v-icon left>mdi-text</v-icon>
        Report
        <!--        ({{ groupByKeys.length }})-->
      </v-toolbar-title>
      <v-spacer/>
      <Action class="ml-2" action="group_by"/>
      <v-menu rounded offset-y>
        <template v-slot:activator="{on}">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="url.setGroupBy([])">
            <v-list-item-icon>
              <v-icon>mdi-restore</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Restore report defaults</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider />
          <v-list-item :href="csvUrl">
            <v-list-item-icon>
              <v-icon>mdi-tray-arrow-down</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Export all</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action-text>.csv</v-list-item-action-text>
          </v-list-item>
          <v-list-item :href="apiUrl" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-api</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>View in API</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action-text>.json</v-list-item-action-text>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-container class="pt-0">
      <v-row dense class="">
        <v-col
            v-for="key in groupByKeys"
            :key="key"

        >
          <!--            cols="12"-->
          <!--            md="6"-->
          <!--            lg="4"-->
          <!--            xl="3"-->
          <group-by
              :filter-key="key"
          />

        </v-col>

      </v-row>

    </v-container>
  </v-card>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import GroupBy from "@/components/GroupBy/GroupBy.vue";
import Action from "@/components/Action/Action.vue";
import {url} from "@/url";
import {filtersFromUrlStr} from "@/filterConfigs";

export default {
  name: "Template",
  components: {
    GroupBy,
    Action,
  },
  props: {},
  data() {
    return {
      foo: 42,
      url,
    }
  },
  computed: {
    ...mapGetters([
      "resultsFilters",
      "entityType",
    ]),
    groupByKeys() {
      return url.getGroupBy(this.$route)
    },
    apiUrl(){
      const myFilters = filtersFromUrlStr(this.entityType, this.$route.query.filter)
      return url.makeGroupByUrl(
          this.entityType,
          this.groupByKeys.join(","),
          {
            filters: myFilters,
            isMultipleGroups: true
          }
      )
    },
    csvUrl(){
      const myFilters = filtersFromUrlStr(this.entityType, this.$route.query.filter)
      return url.makeGroupByUrl(
          this.entityType,
          this.groupByKeys.join(","),
          {
            filters: myFilters,
            isMultipleGroups: true,
            formatCsv: true,
          }
      )
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

<style scoped lang="scss">

</style>