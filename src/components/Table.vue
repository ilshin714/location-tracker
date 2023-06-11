<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th v-for="(obj, ind) in config" :key="ind">
          {{ obj.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in theData" key="index">
        <td v-for="(obj, ind) in config" :key="ind">
          <span v-if="obj.type === 'text'"> {{ row[obj.key] }}</span>
          <span v-if="obj.type === 'checkbox'">
            <input
              type="checkbox"
              @click="
                obj => {
                  obj.isChecked = !obj.isChecked;
                }
              "
            />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["theData", "config"],
  methods: {
    checkClicked(obj) {
      obj.isChecked = !isChecked;
    }
  }
};
</script>