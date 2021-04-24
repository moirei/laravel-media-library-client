<template>
  <data-table :data="data" />
</template>

<script>
import DataTable from "./DataTable";

export default {
  components: { DataTable },
  props: {
    name: { type: String, required: true },
  },
  beforeMount(){
    this.data = require(`./data/${this.name}.js`).default
  },
  data: () => ({ data: [] }),
};
</script>
