<template>
  <button-type-demo></button-type-demo>
</template>
<script>
import ButtonType from '@/webcomps/button/button-type-webcomp.js'

export default {
  beforeCreate() {
    customElements.define(
      'button-type-demo',
      ButtonType      
    )
  }
}
</script>
