<template>
  <div>
    <alert-size-demo></alert-size-demo>
  </div>
</template>

<script>
import AlertSize from '@/webcomps/alert/size.js'
export default {
  beforeCreate() {
    customElements.define(
      'alert-size-demo',
      AlertSize      
    )
  }
}
</script>
