<template>
  <div class="list">
    <div class="list__search-wrapper">
      <span class="list__search-icon">
        <Search/>
      </span>
      <input class="list__search-text" type="text" placeholder="Поиск по таблице..." v-model="searchText"/>
    </div>
    <section class="list__table">
      <div class="list__header">
        <div class="list__head list__head--checkbox"></div>
        <div class="list__head list__head--ip">
          <span>IP</span>
          <button v-if="hasCheckedItems" @click="deleteItems">Удалить выбранные</button>
        </div>
        <div class="list__head list__head--country">
          <span></span>Country
          <select v-model="sortWay">
            <option v-for="option in options" :key="option" :value="option.value">{{ option.text }}</option>
          </select>
        </div>
        <div class="list__head list__head--city">City town</div>
        <div class="list__head list__head--status"></div>
      </div>
      <div class="list__table-main">
        <div @click="redirectToDetails(item)" v-for="item in filteredList" :key="item.ip" class="list__item">
          <div class="list__table-item list__table-item--checkbox">
            <input type="checkbox" v-model="item.checked" />
          </div>
          <div class="list__table-item list__table-item--ip">{{ item.ip }}</div>
          <div class="list__table-item list__table-item--country">{{ item.country }}</div>
          <div class="list__table-item list__table-item--city">{{ item.city }}</div>
          <div class="list__table-item list__table-item--status">
            <span v-if="item.status === 'success'"><Success/></span>
            <span v-else-if="item.status === 'fail'"><Fail/></span>
            <span v-else><Load/></span>
          </div>        
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useMyStore } from '../store';
import Fail from '../components/icons/IconFail.vue'
import Success from '../components/icons/IconSuccess.vue'
import Load from '../components/icons/IconLoad.vue'
import Search from '../components/icons/IconSearch.vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useMyStore();

const list = store.list;
const searchText = ref('');
const options = [
  { text: 'A-Z', value: 'direct' },
  { text: 'Z-A', value: 'reverse' }
]

const sortWay = ref(options[0].value);

const filteredList = computed(() => {
  const search = searchText.value.toLowerCase();
  return searchText.value === '' ? list : list.filter(item => item.country.toLowerCase().includes(search));
});

const hasCheckedItems = computed(() => {
  return filteredList.value.some(item => item.checked);
});

const deleteItems = function() {
    const checkedItems = list.filter(item => item.checked === true);
    checkedItems.forEach(item => store.deleteItem(item.ip));
}

const directSort = function() {
  list.sort((a, b) => {
    if(a.country < b.country) { return -1; }
    if(a.country > b.country) { return 1; }
    return 0;
  })
}

const reverseSort = function() {
  list.sort((a, b) => {
    if(a.country > b.country) { return -1; }
    if(a.country < b.country) { return 1; }
    return 0;
  })
}

const onSortList = function() {
  sortWay.value === 'direct' ? directSort() : reverseSort();
}

const redirectToDetails = function(item) {
  console.log('redirectToDetails');
  router.push({ path: '/details', query: { ip: item.ip, city: item.city, country: item.country, code: item.code, isp: item.isp, org: item.org, regionName: item.regionName, zip: item.zip } })
}

onMounted(() => {
  onSortList();
})

watch(
  sortWay,
  () => {
    onSortList();
  },
  { deep: true }
)
</script>

<style lang="scss">
.list {
  &__table {
    width: 80%;
    display: grid;
    grid-template-areas:
    "header"
    "main";
  }

  &__header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  &__table-main {
    width: 100%;
    grid-area: main;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  &__head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    border: 0.5px solid #CCCCCC;
    background-color: #FBFBFB;
    &--checkbox {
      width: 48px;
      max-width: 48px;
    }

    &--ip {
      width: 300px;
    }

    &--country {
      width: 414px;
    }

    &--city {
      width: 430px;
    }

    &--status {
      width: 48px;
      max-width: 48px;
    }
  }

  &__table-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    border: 0.5px solid #CCCCCC;
    background-color: rgb(223, 216, 216);

    &--checkbox {
      width: 48px;
      max-width: 48px;
    }

    &--ip {
      width: 300px;
    }

    &--country {
      width: 414px;
    }

    &--city {
      width: 430px;
    }

    &--status {
      width: 48px;
      max-width: 48px;
    }
  }

  &__item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    &:nth-child(odd) .list__table-item {
      background-color: #FFFFFF;
    }
  }

  &__search-wrapper {
    position: relative;
    width: 620px;
    margin-bottom: 24px;
    border-radius: 4px 0px 0px 0px;
    border: 1px 0px 0px 0px;
    opacity: 0px;
  }

  &__search-icon {
    position: absolute;
    top: 14px;
    left: 14px;
  }

  &__search-text {
    width: 100%;
    height: 44px;
    padding-left: 48px;
    border: 1px solid #DADADA;
  }
}
</style>