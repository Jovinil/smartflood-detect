<template>
    <div class="flex flex-col h-auto md:h-full md:flex-1 p-4 px-6 shadow-xl z-50 bg-gray-200 dark:bg-gray-950 min-h-screen relative">

      <SidebarModal/>

      <div class="mb-5 flex items-center">
        <div class="flex-1">
          <UInputMenu 
            icon="i-lucide-search"
            color="neutral"
            variant="outline"
            v-model="deviceValue" 
            option-attribute ="deviceName"
            :items="devices"
            @update:model-value="mapStore.handleDeviceSelect(deviceValue)"
          />
        </div>
        
        <div>
          <DarkModeToggle />
        </div>
      </div>

      <form @submit.prevent="handleUpdateDevice" method="post" class="flex-1 flex flex-col">
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
              <p>The water level is {{ environmentalData?.currentWaterLevel }}cm</p>
            </div>
           
            <div>
              <p>Date(MM-DD-YY) / time {{ new Date(environmentalData?.updatedAt ?? 0).toLocaleString() }}</p>
            </div>

            <div class="flex justify-between">
              <p>Status Level ({{ environmentalData?.currentWaterLevelStatus }})</p>
            </div>
          </div>
           
         
         
        </template>
      </UCollapsible>

      <div class="my-4 flex-1">
        <StatusCard/>
      </div>

      <!-- button control -->
      <div class="ms-auto mt-3 md:mt-auto flex gap-2" v-if="user">
        <div class="ms-auto gap-2 flex">
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
            @click="mapStore.editEnabled ? mapStore.saveEdit() : mapStore.enableEdit(deviceValue)"
          />
        </div>
      </div>
      </form>
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import { useMapStore } from '~/app/stores/useMapStore';
import { useLocationStore } from '~/app/stores/useLocationStore';
import { useCurrentUser } from 'vuefire'
import type { FormError, FormSubmitEvent } from '@nuxt/ui';
import { getDatabase, ref as dbRef } from 'firebase/database';

const db = getDatabase();

const user = useCurrentUser();
const mapStore = useMapStore();
const locationStore = useLocationStore();
const { errorMessage, updateDevice } = useLocation();
const { devices, device } = useLocationStore();

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

interface DeviceInfo {
    label: string,
    moduleID: string,
    deviceName: string,
    locationName: string,
    longitude: number,
    latitude: number,
    currentWaterLevel?: number,
    currentWaterLevelStatus?: 'safe' | 'warning' | 'danger',
    deviceStatus: 'active' | 'inactive',
    updatedAt?: number | null
}


const deviceValue = computed({
  get: () => locationStore.device,
  set: (val) => locationStore.setDevice(val!)
})

// HANDLE THE REALTIME SHOWING OF DATA
const deviceRef = computed(() => {
  const id = deviceValue.value?.moduleID
  return id ? dbRef(db, `locations/${id}`) : null
})

const environmentalData = useDatabaseObject<DeviceInfo>(deviceRef);

const handleUpdateDevice = async () => {

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

  await locationStore.fetchDevicesLazy(true);
}

</script>