<script setup>
  import {ref, onMounted, watch, reactive} from 'vue';
  // 自定义事件
  const emit = defineEmits(['updateCount'])
  const a = ref(100);
  const name = 'jack';
  const onClick = (e) => {
    console.log(this, e);
    a.value += 1;
    common += 1;
    another.value += 1;
    emit('updateCount', common)
  }
  // function onClick2(e) {
  //   console.log(this, e)
  //   a.value += 1;
  // }
  onMounted(() => {
    console.log('onMounted', this)
  })

  onMounted(function() {
    console.log('onMounted2', this)
  })
  /*
    在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令。
    在上面的例子中，vFocus 即可以在模板中以 v-focus 的形式使用。
    在没有使用 <script setup> 的情况下，自定义指令需要通过 directives 选项注册：
   */
  // 注册局部自定义指令： v + 指令名（驼峰形式，对应模板的pascal形式）
  const vHighLight = {
    mounted: (el) => {
      el.style.color = 'red'
    }
  }

  let list = ref([{name: 100}])
  console.log('list', list);
  watch(list, (newVal) => {
    console.log('ref list changed newVal', newVal, newVal[0]);
  }, {
    deep: true
  })
  const updateList = () => {
    // list.value.push({name: 'jack'})
    list.value[0].name = Math.random()
  }


  let list2 = reactive([{name: 100}])
  console.log('list2', list2);
  watch(list2, (newVal) => {
    console.log('reactve list changed newVal', newVal, newVal[0]);
  }, {
    // @see https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiWatch.ts#L207
    // deep: false // reactive 对象默认是true，且不能修改为false。
    // immediate: true,
  })
  const updateList2 = () => {
    // list2.push({name: 'jack'})
    list2[0].name = Math.random()
  }

</script>
<script>
import {ref} from 'vue';
let common = 1000;
let another = ref(500);
</script>
<template>
  <div class="ref-reactive">
    <p>ref List: {{list}}</p> <input type="button" @click="updateList" value="update ref list"/>
    <p>reactive List: {{list2}}</p> <input type="button" @click="updateList2" value="update reactive list"/>
    <h1>This is ref-reactive {{a}}, {{common}},</h1>
    <!-- 如果启用该行代码，则 common 的值 在两个组件的模板会【实时】更新。 -->
    <p> {{another}}</p>
    <p>
      <input type="button" name="click" value="click" @click="onClick"/>
    </p>
    <p v-high-light>test directive</p>
  </div>
</template>

<style>
</style>
