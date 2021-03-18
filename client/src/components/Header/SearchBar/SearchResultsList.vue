<template>
  <perfect-scrollbar @ps-y-reach-end="onScrollReachEnd" ref="scrollbar">
    <ul>
      <li v-for="(result, index) in results" :key="result.id">
        <button
          class="recent-result-item__container"
          @click="itemClick(result, index)"
        >
          <div class="recent-result-item__client-line">
            <div class="field name">
              <strong>Nome</strong>
              <div>{{ result.name }}</div>
            </div>

            <div class="field">
              <strong>CPF</strong>
              <div>{{ result.cpf }}</div>
            </div>

            <div class="field">
              <strong>Status</strong>
              <div>{{ result.status }}</div>
            </div>
          </div>

          <div class="recent-result-item__proposal-line">
            <div class="field">
              <strong>Entidade</strong>
              <div>{{ result.entity }}</div>
            </div>

            <div class="field">
              <strong>Matricula</strong>
              <div>{{ result.contract }}</div>
            </div>

            <div class="field">
              <strong>Nº Proposta</strong>
              <div>{{ result.proposal }}</div>
            </div>

            <div class="field">
              <strong>Operadora</strong>
              <div>{{ result.operator }}</div>
            </div>
          </div>
        </button>
      </li>
    </ul>

    <div v-if="isLoading" class="recent-result-item__loading-container">
      <LoadingIndicator />
    </div>
  </perfect-scrollbar>
</template>

<script>
import LoadingIndicator from "../../LoadingIndicator";

export default {
  components: {
    LoadingIndicator,
  },

  props: {
    results: Array,
    haveMoreResults: Boolean,
    isLoading: Boolean,
    itemClick: {
      type: Function,
      default: (item, index) => {
        console.log(item, index);
      },
    },
    loadNextPage: {
      type: Function,
      default: () => {},
    },
  },

  methods: {
    onScrollReachEnd() { // event
      if (!this.haveMoreResults) return;

      this.loadNextPage();

      // this.$refs.scrollbar.ps.update()
    },
  },
};
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

.recent-result-item__container {
  display: flex;
  flex-direction: column;

  background: none;
  border: none;
  border-color: #fff;
  color: #666;
  font-size: 13px;
  padding: 8px 16px;

  width: 100%;
}

.recent-result-item__container:focus-visible,
.recent-result-item__container:hover {
  background-color: #eee;
  border-color: #eee;
}

.recent-result-item__client-line {
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
}

.recent-result-item__client-line > div + div {
  margin-left: 16px;
}

.recent-result-item__proposal-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 4px;
  width: 100%;
}

.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.field.name {
  flex: 1;
}

strong {
  font-weight: 500;
  color: #666;
}

.recent-result-item__loading-container {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;
  border-top: 1px dashed #ddd;
}

.recent-result-item__loading-container > svg {
  fill: #666;
  height: 24px;
  width: 24px;
}
</style>