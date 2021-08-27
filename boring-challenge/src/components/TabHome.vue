<template>
	<b-card-text>
		<div class="d-flex justify-content-center border border-dark">	
			<h5 class="font-weight-bold" style="margin:0px; padding:8px">You should {{activity.activity}}</h5>			
		</div>
		<p class="text-capitalize">Type: {{activity.type}}</p>
		<p>
			<b-icon-person-fill
				v-if="activity.participants == 1"
			/>
			<b-icon-people-fill
				v-else-if="activity.participants > 1"
			/>
			<span v-if="activity.participants == 1">{{ activity.participants }} participant </span>
			<span v-else>{{ activity.participants }} participants </span>
		</p>
		<p>
			<label for="price" v-if="activity.price == 0">Price: Free</label>
			<label for="price" v-else-if="activity.price <= 0.3">Price: Low</label>
			<label for="price" v-else-if="activity.price <= 0.6">Price: Medium</label>
			<label for="price" v-else-if="activity.price <= 1">Price: High</label>
			<b-progress
				id="price"
				:value="activity.price"
				:max="max"
				show-progress
				animated
			/>
		</p>
		<p v-if="activity.link != ''">Visit at: <a :href="activity.link">{{activity.link}}</a></p>
		<p>
			<label for="accessibility" v-if="activity.accessibility <= 0.3">Difficulty: Easy</label>
			<label for="accessibility" v-else-if="activity.accessibility <= 0.6">Difficulty: Medium</label>
			<label for="accessibility" v-else-if="activity.accessibility <= 1">Difficulty: Hard</label>
			<b-progress
				id="accessibility"
				:max="max"
				show-progress
				animated
			>
				<b-progress-bar :value="activity.accessibility" v-if="activity.accessibility <= 0.3" variant="success"/>
				<b-progress-bar :value="activity.accessibility" v-else-if="activity.accessibility <= 0.6" variant="warning"/>
				<b-progress-bar :value="activity.accessibility" v-else-if="activity.accessibility <= 1" variant="danger"/>
			</b-progress>
    </p>
	</b-card-text>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		activity: [Array, Object],
		previousActivity: [Array, Object],
	},
	data() {
    return {
      max: 1,
    };
	},
})
</script>

<style scoped>
	.style-activity {
		border-style: solid;
	}
</style>