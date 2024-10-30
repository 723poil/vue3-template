<template>
  <t-row>
    <t-col :cols="tCols[12]">
      <t-card>
        <template #title>title</template>
        <template #content>content</template>
      </t-card>
    </t-col>
  </t-row>
</template>
<script setup lang="ts">
import { tCols } from "~/type/css/t.cols";

definePageMeta({
  layout: "vertical-nav-layout",
});
</script>
