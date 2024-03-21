<template>
  <div class="main">
    <form class="main__form" @submit.prevent="submitForm" method="post" action="/your-server-endpoint">
      <textarea class="main__textarea" name="list" v-model="text" id="1" cols="30" rows="10" placeholder="введите ip адреса"></textarea>
      <button class="main__button" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useMyStore } from '../store';

const router = useRouter();
const store = useMyStore();

const text = ref('');

const submitForm = async function() {
  const items = text.value.split(' ');
  const regex = /^\d+\.\d+\.\d+\.\d+$/;

  const ips = items.filter(str => regex.test(str));
  console.log('ips', ips);
  await store.fetchIPData(ips);
  router.push('/list');
}

onMounted(() => {
  store.clearList()
})
</script>
  
<style lang="scss">
.main {
  padding: 60px;

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
  }

  &__textarea {
    width: 620px;
    padding: 16px;
    border: 1px solid #DADADA;
    margin-bottom: 24px;
  }

  &__button {
    width: 125px;
    outline: none;
    border: none;
    background: #F2F0F0;
    padding: 12px 20px 12px 20px;
    border-radius: 4px 0px 0px 0px;
    opacity: 0px;
  }
}
</style>


<!-- 1.1.1.1 2.2.2.2 3.3.3.3 4.4.4.4 5.5.5.5 6.6.6.6 7.7.7.7 8.8.8.8 -->