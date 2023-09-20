<template>
  <alert-center-demo></alert-center-demo>
</template>

<script lang="jsx">
import AlertCenter from '@/webcomps/alert/center.js'


export default {
  beforeCreate() {
    customElements.define(
      'alert-center-demo',
      AlertCenter      
    )
  }
}
</script>
