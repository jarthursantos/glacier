<template>
  <perfect-scrollbar>
    <ul>
      <li v-for="search, index in searchs" :key="search">
        <button class="recent-search-item__container" @click="itemClick(search, index)" >
          {{ search }}

          <button tabindex="-1" class="recent-search-item-remove" @click.stop="itemRemoveClick(search, index)">
            remover
          </button>
        </button>
      </li>
    </ul>
  </perfect-scrollbar>
</template>

<script>
export default {
  props: {
    searchs: Array,
    itemClick: {
      type: Function,
      default: (item, index) => {
        console.log(item, index)
      }
    },
    itemRemoveClick: {
      type: Function,
      default: (item, index) => {
        console.log(item, index)
      }
    }
  }
}
</script>

<style scoped>
.ps {
  max-height: 400px;
}

ul {
  display: flex;
  flex-direction: column;
}

li + li {
  border-top: 1px dashed #ddd;
}

.recent-search-item__container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: none;
  border: none;
  border-color: #fff;
  color: #666;
  font-size: 13px;
  padding: 4px 8px 4px 16px;

  width: 100%;
}

.recent-search-item__container:focus-visible,
.recent-search-item__container:hover {
  background-color: #eee;
  border-color: #eee;
}

.recent-search-item-remove {
  background: none;
  border: 1px solid;
  border-color: inherit;
  border-radius: 2px;
  height: 24px;
  padding: 0 8px;
  color: #0078D4;
}

.recent-search-item-remove:focus-visible,
.recent-search-item-remove:hover {
  color: #005A9E;
  text-decoration-line: underline;
}

.recent-search-item-remove:focus-visible {
  border-color: #323130;
}
</style>