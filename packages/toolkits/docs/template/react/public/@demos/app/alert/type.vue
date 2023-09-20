<template>
  <div>
    <alert-type-demo></alert-type-demo>
  </div>
</template>

<script lang="jsx">
import AlertType from '@/webcomps/alert/title.js'
export default {
  beforeCreate() {
    customElements.define(
      'alert-type-demo',
      AlertType      
    )
  }
}
</script>
