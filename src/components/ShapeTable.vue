<template>
	<v-container v-if="showData" class="rounded-lg ">
		<v-table height="100% " fixed-header>
			<thead class="text-h6 ">
				<tr>
					<th class="font-weight-bold">Timestamp</th>
					<th class="font-weight-bold">Name</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="shape in shapeStore.shapes" :key="shape.timestamp">
					<td>{{ shape.timestamp }}</td>
					<td>{{ shape.name }}</td>
					<td>
						<v-img class="py-8"
							:src="`https://shapy-images.sgp1.digitaloceanspaces.com/shapes/${shape.image}`"
							alt="shape image">
						</v-img>
					</td>
				</tr>
			</tbody>
		</v-table>
	</v-container>
	<v-container v-if="!showData">
		<v-alert text="Error in server: Shape data cannot be fetched" title="Server error" type="error">
		</v-alert>
	</v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import shapeService from '../services.js'
import { useShapeStore } from "../store/shapeStore";
const showData = ref(true)

const shapeStore = useShapeStore();


const pollingId = shapeService.getShapes(
	shapes => {
		shapeStore.setShapes(shapes)
	}, 3000
)

onBeforeUnmount(() => {
	clearInterval(pollingId)
});

//closing ws
// onBeforeUnmount(() => {
// 	if (ws) {
// 		ws.close()
// 	}
// });


</script>