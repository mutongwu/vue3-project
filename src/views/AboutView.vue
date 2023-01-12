<script setup>
  // import Mouse from './mouse.vue';
  import RefAndReactive from '../components/refAndReactive.vue';
  const onUpdateCount = (e) => {
    console.log('onUpdateCount', e)
  }
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      <!-- <mouse /> -->
    </p>
    <p>
      <refAndReactive/>
    </p>
    <p>
      <refAndReactive @updateCount="onUpdateCount"/>
    </p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
