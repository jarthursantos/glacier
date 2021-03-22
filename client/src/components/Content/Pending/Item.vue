<template>
  <Card>
    <div class="item__container">
      <div class="item__header">
        <!-- <div class="item__header-icon">
          <i class="ms-Icon ms-Icon--TextDocument" aria-hidden="true"></i>
        </div> -->

        <div class="item__header-data">
          <strong>José Arthur Santos da Silva</strong>
          <small>704.751.094-06</small>
        </div>
      </div>
        
      <div class="item__header-time">
        <i class="ms-Icon ms-Icon--Clock" aria-hidden="true"></i>
        <small>{{ elapsedTime }}</small>
      </div>

      <div class="item__actions">
        <button class="item__actions-show-more">
          <span>Ver detalhes</span>
        </button>
      </div>
    </div>
  </Card>
</template>

<script>
import { formatDistanceToNow, format, isSameDay, subDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Card from '@/components/Card'

export default {
  components: {
    Card
  },

  props: {
    requestedAt: {
      type: Date,
      default: subDays(new Date(), 0)
    }
  },

  computed: {
    elapsedTime() {
      if (isSameDay(new Date(), this.requestedAt)) {
        return formatDistanceToNow(this.requestedAt, { addSuffix: true, locale: ptBR })
      }

      return format(this.requestedAt, 'dd/MM/yyyy')
    }
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
  padding-top: 24px;
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

.item__header-time {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px 0;
}

.item__header-time > * + * {
  margin-left: 4px;
}

.item__actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  padding: 12px 0;
  border-top: 1px solid #edebe9;
}

.item__actions > * + * {
  margin-left: 16px;
}

.item__actions-show-more {
  display: flex;
  flex-direction: row;
  align-items: center;

  background: none;
  border: 1px solid;
  border-color: #fff;
  font-size: 12px;
  border-radius: 2px;
  color: #0078D4;
}

.item__actions-show-more > i {
  font-size: 14px;
  margin-right: 4px;
}

.item__actions-show-more:focus-visible,
.item__actions-show-more:hover {
  color: #005A9E;
  text-decoration-line: underline;
}
</style>