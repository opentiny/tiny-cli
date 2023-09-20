<template>
  <div>
    <alert-base-demo></alert-base-demo>
  </div>
</template>

<script>
import AlertBase from '@/webcomps/alert/base.js'
export default {
  beforeCreate() {
    customElements.define(
      'alert-base-demo',
      AlertBase      
    )
  }
}
</script>
