<template>
  <div>
    <p>The saved activities are here</p>
    <p v-for="(activity, index) in activities" :key="index">
      {{ activity }}
    </p>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "@vue/composition-api";
import {Activity} from "@/Types/types";

export default defineComponent({
  props: {
    activity: {
      type: Object as () => Activity,
      required: false,
    }
  },
  setup(props) {

    // const activities = computed(() => {
      // activities.value.push(props.activity);
    // });


    return {
      activities: [1,2,3],
    }
  }
});
</script>
