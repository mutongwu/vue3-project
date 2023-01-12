## vue3 迁移注意
### Vue.prototype 挂载
取消了对 Vue.prototype 的全局挂载，可以改用 app.config.globalProperties 来实现
```javascript
// before - Vue 2
Vue.prototype.$http = () => {}

// after - Vue 3
const app = createApp({})
app.config.globalProperties.$http = () => {}

```
也就是是说，在【选项式】，还是可以通过 this.$http 来访问；但是在 【组合式】风格代码编写中，这种挂载就没有必要了。
可以通过 provide/inject 来实现，或者手动引入：
```javascript
import axios from 'axios';

// provide
const app = Vue.createApp(App);
app.provide('$axios', axios);  // Providing to all components during app creation

// inject
const { inject } = Vue;
...
setup() {
  const $axios = inject('$axios');   // injecting in a component that wants it
  // $axios.get(...)
}
```

### v-model 定义
1. 修改了默认的属性跟事件名称
  1. prop: value -> modelValue;
  2. event: input -> update:modelValue;
2. 移除了组件定义的 model 属性（自定义属性），直接在模板上定义。
3. 移除了 .sync 修饰符
4. 支持多个 v-model
5. 支持自定义修饰符
```javascript
// vue2  写法
<ChildComponent v-model="pageTitle" />

<!-- would be shorthand for: -->
<ChildComponent :value="pageTitle" @input="pageTitle = $event" />

// 组件定义
<template>
  <div>
    {{value}}
  </div>
</template>
{
  props: ['value'],
  methods: {
    onChange() {
      this.$emit('input', newValue)
    }
  }
}
```

```javascript
//定义 <!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
// 使用
<CustomInput v-model="searchText" />

```

2. 移除了组件定义的 model 属性（自定义属性），直接在模板上定义。

```javascript
//定义 <!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>

// 使用
<MyComponent v-model:title="bookTitle" />

```   
3. 移除了内置 .sync 修饰符。从写法上，可以直接用 v-model 统一

```javascript

// 定义属性 xxx，以及 emit 事件 update:xxx
{
  props: ['title'],
  methods: {
    onChange() {
      this.$emit('update:title', newValue)
    }
  }
}
// 使用
<MyComponent :title.sync="bookTitle" />

// vue3
defineProps(['title'])
defineEmits(['update:title'])

// 使用
<MyComponent v-model:title="bookTitle" />

```   

### ref模板引用
1. 需要用 ref 定义一个同名的顶层变量，传入 null ; 如果是在 v-for中，则应该传入数组 []
```javascript

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const child = ref(null);
const childArr = ref([]);
</script>

<template>
  <Child ref="child" />
  <div>
    <Child ref="childArr" v-for="item in list" :key="item.key" />
  </div>
</template>
```
2. 默认 setup 定义的变量都是私有不对外的。需要想要访问子 组件的方法/属性，需要手动用 defineExpose 声明
```javascript
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>

// usage
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null);
onMounted(() => {
  child.value.a // 访问 子组件实例 的方法/属性
})
</script>
<Child ref="child" />
```

### data 属性，不在支持 对象，必须是返回对象的函数；mixin 机制下， data只做顶层合并，不再作深合并。
```javascript
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}
// vue2 
{
  "user": {
    "id": 2,
    "name": "Jack"
  }
}
// vue3
{
  "user": {
    "id": 2,
  }
}

```

### mount 挂载根节点，不再是替换目标节点，而是作为 目标节点 的子节点（innerHTML插入）。

https://v3-migration.vuejs.org/