<template>
  <Card>
    <div class="item__container">
      <div class="item__header">
        <div class="item__header-icon">
          <i class="ms-Icon ms-Icon--TextDocument" aria-hidden="true"></i>
        </div>

        <div class="item__header-data">
          <strong>José Arthur Santos da Silva</strong>
          <small>704.751.094-06</small>
        </div>
      </div>

      <div class="item__actions">
        <button class="item__actions-show-more">
          Ver detalhes
        </button>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '../../Card'

export default {
  components: {
    Card
  }
};
</script>

<style scoped>
.item_container {
  display: flex;
  flex-direction: column;
}

.item__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px 0 16px;
}

.item__header > .item__header-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 12px;
  height: 32px;
  min-width: 32px;
}

.item__header > .item__header-icon > i {
  color: #666;
  font-size: 24px;
}

.item__header-data {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.item__header-data > strong {
  color: #201f1e;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item__actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  padding: 12px 0;
  border-top: 1px solid #edebe9;
}

.item__actions-show-more {
  background: none;
  border: 1px solid;
  border-color: #fff;
  line-height: 16px;
  font-size: 12px;
  border-radius: 2px;
  color: #0078D4;
}

.item__actions-show-more:focus-visible,
.item__actions-show-more:hover {
  color: #005A9E;
  text-decoration-line: underline;
}
</style>