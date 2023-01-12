<script setup>
import {ref} from 'vue';
// import {useMouse} from './mouse.js'


// onMounted(() => {
//   console.log('mouse vue')
// });
// const {x, y} = useMouse();
// const x1 = x.value;
// const y1 = y.value;

let x1 = 0;
let y1 = 0;
// setInterval(() => {
//   x1 += 1;
//   y1 += 1;
// }, 1000);

// return {
//   x1,
//   y1
// };
</script>

<template>
  <div>
    Mouse position is at222: {{ x1 }}, {{ y1 }}
    <p>llalal</p>
  </div>
</template>
