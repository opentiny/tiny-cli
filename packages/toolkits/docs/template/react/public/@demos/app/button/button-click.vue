<template>
  <button-click-demo></button-click-demo>
</template>

<script>
import ButtonClick from '@/webcomps/button/button-click-webcomp.js'

export default {
  beforeCreate() {
    customElements.define(
      'button-click-demo',
      ButtonClick      
    )
  }
};
</script>