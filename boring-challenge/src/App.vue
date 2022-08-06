<template>
  <div id="app">
    <b-container class="d-flex justify-content-center align-items-center min-vh-100">
      <b-card no-body class="w-75">
        <b-tabs card>
          <b-tab title="Home" active>
            <TabHome @activityToSave="handleActivityToSave"/>
          </b-tab>
          <b-tab title="Saved">
            <SavedActivities :activity="activityToSave"/>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueCompositionAPI, { defineComponent, ref } from '@vue/composition-api'
import TabHome from "./components/TabHome.vue";
import SavedActivities from "./components/SavedActivities.vue";
import {Activity} from "@/Types/types";

Vue.use(VueCompositionAPI)
export default defineComponent({
  components: {
    TabHome,
    SavedActivities,
  },
  setup() {
    const activityToSave = ref();

    function handleActivityToSave(activity: Activity) {
      activityToSave.value = activity;
    }
    return {
      handleActivityToSave,
      activityToSave,
    }
  },
})
</script>

<style scoped></style>
