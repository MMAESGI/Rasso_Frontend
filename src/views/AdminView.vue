<template>
    <Tabs value="0">
        <TabList>
            <Tab value="0" class="flex-1">{{ t("admin.validate-tab") }}</Tab>
            <Tab value="1" class="flex-1">{{ t("admin.rejected-tab") }}</Tab>
            <Tab value="2" class="flex-1">{{ t("admin.all-events-tab") }}</Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">
                <ValidateEvents />
            </TabPanel>
            <TabPanel value="1">
                <RejectedEvents />
            </TabPanel>
            <TabPanel value="2">
                <AllEvents />
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>

<script setup lang="ts">
import AllEvents from '@/components/admin/AllEvents.vue';
import RejectedEvents from '@/components/admin/RejectedEvents.vue';
import ValidateEvents from '@/components/admin/ValidateEvents.vue';
import { Tabs, TabList, Tab, TabPanel, TabPanels } from 'primevue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>