<template>
  <div class="address_link">
    <a
      :href="
        'https://harmony-hrc-holder.firebaseapp.com/#/address/' + data.address
      "
    >
      {{ data.address }}
    </a>
  </div>
</template>

<script>
export default {
  name: `address`,
  props: ['data'],
};
</script>
<style scoped lang="less">
.address_link {
  a {
    font-family: Courier;
  }
}
</style>
