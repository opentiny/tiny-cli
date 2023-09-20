<template>
  <button-round-demo></button-round-demo>
</template>
<script>
import ButtonRound from '@/webcomps/button/button-round-webcomp.js'

export default {
  beforeCreate() {
    customElements.define(
      'button-round-demo',
      ButtonRound      
    )
  }
}
</script>
