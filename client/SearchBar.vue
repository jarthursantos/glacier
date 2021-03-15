<template>
  <div id="base">
    <div id="wrapper" :class="{ expanded: backdropOpen }" @click.stop>
      <div id="container">
        <div id="icon-container" :class="{ focused }">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
        
        <input type="text" placeholder="Pesquisar" v-model="searchText" @focus="inputFocus" @blur="inputBlur" @keydown="openBackdrop" />

        <div id="loading-container" v-if="isLoading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
            <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
              <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      </div>

      <div id="results" v-if="backdropOpen">
        <strong v-if="!haveResults">Buscas Recentes</strong>
        
        <strong v-if="haveResults">Resultados da pesquisa: {{ results.length }}</strong>
        <ul v-if="haveResults">
          <li tabindex="0" v-for="result in results" :key="result.id">
            {{ result.name }}
          </li>
        </ul>
      </div>
    </div>

    <div id="backdrop" :class="{ open: backdropOpen }" />
  </div>
</template>

<script>
import { debounce } from 'lodash'

const findResults = debounce(async (text, onDone) => {
  console.log(text)
  onDone([{ id: 1, name: 'José Arthur' }, { id: 2, name: 'José Amancio' }])
}, 500)

export default {
  data() {
    return {
      focused: false,
      results: [],
      searchText: '',
      isLoading: false,
      backdropOpen: false
    }
  },
  watch: {
    searchText(text) {
      this.isLoading = true

      findResults(text, (results) => {
        this.isLoading = false
        this.results = results
      })
    }
  },
  computed: {
    haveResults() {
      return this.results.length > 0
    }
  },
  methods: {
    inputFocus() {
      this.focused = true
      this.openBackdrop()
    },
    inputBlur() {
      this.focused = false
    },
    openBackdrop() {
      this.backdropOpen = true
    },
    closeBackdrop() {
      this.backdropOpen = false
    },
    escapeBackdrop({ key }) {
      if (key === 'Escape') {
        this.closeBackdrop()
      }
    }
  },
  mounted() {
    document.body.addEventListener('click', this.closeBackdrop)
    document.body.addEventListener('keydown', this.escapeBackdrop)
  },
  unmounted() {
    document.body.removeEventListener('click', this.closeBackdrop)
    document.body.removeEventListener('keydown', this.escapeBackdrop)
  }
};
</script>

<style scoped>
#base {
  margin-bottom: 32px;
}

#backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  transition: background-color 0.2s ease-in-out;
}

#backdrop.open {
  background-color: rgba(0, 0, 0, 0.8);
  pointer-events: initial;
}

#wrapper {
  position: relative;
  background-color: #fff;
  border-radius: 16px;
  z-index: 2;

  -webkit-box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.15);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.15);
  box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.15);
}

#wrapper.expanded {
  border-end-end-radius: 0;
  border-end-start-radius: 0;
}

#container {
  position: relative;

  height: 48px;
  width: 100%;
  max-width: 900px;
}

#container > input {
  position: absolute;
  z-index: 2;

  border: none;
  background: none;
  font-size: 16px;
  color: #999;
  padding-left: 56px;
  height: 48px;
  width: calc(100% - 56px);

  transition: color 0.2s ease-in-out;
}

#container > input:focus {
  color: #666;
}

#container > input::placeholder {
  color: inherit;
}

#container > #icon-container {
  position: absolute;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;
  width: 56px;
}

#container > #icon-container > svg {
  fill: #999;

  transition: fill 0.2s ease-in-out;
}

#container > #icon-container.focused > svg {
  fill: #666;
}

#container > #loading-container {
  position: absolute;
  z-index: 1;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;
  width: 56px;
}

#container > #loading-container > svg {
  fill: #666;
  height: 24px;
  width: 24px;
}

#results {
  position: absolute;

  background-color: #fff;
  border-top: 1px solid #ddd;
  border-end-end-radius: 16px;
  border-end-start-radius: 16px;
  padding: 12px 16px 16px;
  width: calc(100% - 32px);
}

#results > strong {
  display: block;
  font-weight: 500;
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  margin-left: 6px;
}

ul {
  list-style: none;
}

ul > li {
  background: #eee;
  padding: 8px 12px;
  border-radius: 8px;
  color: #666;
}

ul > li:focus {
  background: #ddd;
  color: #333;
}

ul > li + li {
  margin-top: 8px;
}
</style>