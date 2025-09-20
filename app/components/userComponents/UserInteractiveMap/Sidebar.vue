<template>
    <div class="flex flex-col h-auto md:h-full md:flex-1 p-4 rounded-md shadow-xl z-50 bg-gray-200 dark:bg-gray-950 min-h-0">

      <div class="mb-5 flex  items-center">
        <div class="flex-1">
          <UInputMenu 
            icon="i-lucide-search"
            color="neutral"
            variant="outline"
            v-model="deviceValue" 
            option-attribute ="deviceName" 
            :items="deviceList" 
          />
        </div>
        
        <div>
          <DarkModeToggle />
        </div>
      </div>


      <form @submit.prevent="handleUpdateDevice" method="post">
      <UCollapsible v-model:open="openOne" class="flex flex-col gap-2 w-full mb-3" 
      :ui="{
        content: 'bg-gray-100 dark:bg-gray-700 rounded-sm px-3 py-2'
      }">
        <UButton
          label="Device Information"
          color="primary"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />

        <template #content>
          <div class="flex flex-col gap-2">
            <div>
               <p v-if="!mapStore.editEnabled">{{ deviceValue.deviceName }}</p>

              <UInput 
                v-else
                v-model="deviceValue.deviceName"
                color="neutral" 
                variant="outline" 
                placeholder="Device Name"
                class="w-full" 
              />
            </div>

            <div>
              <div class="flex flex-col" v-if="!mapStore.editEnabled">
                <p>{{ deviceValue.locationName }}</p>
                <p>(lng: {{ deviceValue.longitude }}, lat: {{ deviceValue.latitude }})</p>
              </div>
           
              <template v-else>
              <UInput 
                color="neutral"
                variant="outline"
                disabled 
                v-model="mapStore.position.lng"
                @input="$emit('update:mapStore.position.lng', mapStore.position.lng)"
                placeholder="Double click on the map to set / Drag the pin" 
                class="w-full"
                />
                <UInput 
                color="neutral"
                variant="outline"
                disabled 
                v-model="mapStore.position.lat"
                placeholder="Double click on the map to set / Drag the pin" 
                class="w-full"
                />
                </template>
            </div>

            <div>
              <p v-if="!mapStore.editEnabled">{{ deviceValue.deviceStatus }}</p>

              <UInputMenu 
                v-else
                color="neutral"
                variant="outline"
                v-model="deviceValue.deviceStatus" 
                value-key="id" 
                :items="status" 
              />
            </div>
          </div>

        </template>
      </UCollapsible>

      <UCollapsible v-model:open="openTwo" class="flex flex-col gap-2 w-full" 
      :ui="{

        content: 'bg-gray-100 dark:bg-gray-700 rounded-sm px-3 py-2'
      }">
        <UButton
          label="Environmental Data"
          color="primary"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />


        <template #content>
          <div class="flex flex-col gap-2">
            <div>
              <p>The water level is {{ deviceValue.currentWaterLevel }}cm</p>
            </div>
            <div>
              <p>Date(MM-DD-YY) / time</p>
            </div>

            <div class="flex justify-between">
                <p>Status Level({{ deviceValue.currentWaterLevelStatus }})</p>
            </div>
          </div>
           
         
         
        </template>
      </UCollapsible>

      <div class="my-4 flex-1 overflow-y-auto min-h-0">
        <StatusCard/>
      </div>

      <div class="self-end mt-3 md:mt-auto flex gap-2" v-if="user">
        <UButton 
          v-if="mapStore.editEnabled"
          label="Cancel"
          color="primary" 
          variant="outline" 
          size="md"
          icon-position="trailing"
          @click="mapStore.discardEdit()"
        />

        <UButton 
          :label="mapStore.editEnabled ? 'Save Changes' : 'Edit Device Information'"
          color="primary" 
          :variant="mapStore.editEnabled ? 'solid' : 'subtle'" 
          size="md"
          type="submit"
          icon-position="trailing"
          @click="mapStore.editEnabled ? mapStore.saveEdit() : mapStore.enableEdit()"
        />
        
      </div>
      </form>
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import { useMapStore } from '~/app/stores/useMapStore';
import { useLocationStore } from '~/app/stores/useLocationStore';
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser();
const mapStore = useMapStore();
const locationStore = useLocationStore();
const { errorMessage, updateDevice } = useLocation();

await locationStore.fetchDevices()

// import { defineShortcuts } from 'path-to-utils' // or auto-import

const openOne = ref(true)
const openTwo = ref(true)

defineShortcuts({
  o: () => {
    openOne.value = !openOne.value
  },
  p: () => {
    openTwo.value = !openTwo.value
  }
})

// const test = ref(mapStore.position)

// place JSON shit here
const status = ref([
  {
    label: 'Active',
    id: 'active'
  },
  {
    label: 'Inactive',
    id: 'inactive'
  },
])



const deviceList = ref(locationStore.devices)

const deviceValue = ref(deviceList.value[0] || null);

const handleUpdateDevice = async () => {
  console.log(`this is the handle update ${mapStore.address}`);

  const newAddress = mapStore.address || deviceValue.value.locationName || "No address found";
  const newLongitude = mapStore.position.lng || deviceValue.value.longitude;
  const newLatitude = mapStore.position.lat || deviceValue.value.latitude;

  updateDevice(
    deviceValue.value.moduleID, 
    deviceValue.value.deviceName, 
    newAddress,  
    newLongitude,
    newLatitude, 
    deviceValue.value.deviceStatus
  );
  deviceValue.value.label = deviceValue.value.deviceName;
  deviceValue.value.longitude = newLongitude;
  deviceValue.value.latitude  = newLatitude;
  deviceValue.value.locationName = newAddress;


  mapStore.position = {lng: null, lat: null};
  mapStore.address = null;
  
  // locationStore.updateDeviceStore(deviceValue.value);
}
</script>