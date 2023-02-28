<template>
  <div>
    <tiny-button-group :data="groupData" v-model="checkedVal"></tiny-button-group>
    <span>当前选中值：{{ checkedVal }}</span>
  </div>
</template>

<script>
import { ButtonGroup } from '@opentiny/vue';

export default {
  components: {
    TinyButtonGroup: ButtonGroup
  },
  data() {
    return {
      checkedVal: '1G',
      groupData: [
        { text: '1G', value: '1G' },
        { text: '2G', value: '2G' },
        { text: '3G', value: '3G' }
      ]
    };
  }
};
</script>