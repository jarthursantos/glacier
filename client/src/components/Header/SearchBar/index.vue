<template>
  <div class="searchbar__wrapper" :class="{ active: isActive }" @click.stop>
    <div class="searchbar__container">
      <SearchIcon />

      <input
        ref="searchInput"
        type="text"
        placeholder="Pesquisar"
        @focus="inputFocus"
        @blur="inputBlur"
        @click="inputFocus"
        v-model="searchText"
      />

      <ClearButton v-if="haveSearchText" :click="clearSearchText" />
    </div>

    <Panel v-if="isDialogOpen">
      <Section label="Pesquisas recentes" v-if="isShowingRecentSearchs">
        <RecentSearchsList
          :searchs="recentSeachs"
          :itemClick="setSearchText"
          :itemRemoveClick="removeSearchItem"
        />
      </Section>

      <Section
        :label="'Resultados da pesquisa: ' + results.length"
        v-if="isShowingResults"
      >
        <SearchResultsList :results="results" :itemClick="resultItemClick" />
      </Section>
    </Panel>
  </div>

  <Backdrop :open="isDialogOpen" @click="closeDialog" />
</template>

<script>
import Backdrop from "./Backdrop";
import ClearButton from "./ClearButton";
import Panel from "./Panel";
import RecentSearchsList from "./RecentSearchsList";
import SearchIcon from "./SearchIcon";
import SearchResultsList from "./SearchResultsList";
import Section from "./Section";

export default {
  components: {
    Backdrop,
    ClearButton,
    Panel,
    RecentSearchsList,
    SearchIcon,
    Section,
    SearchResultsList,
  },

  data() {
    return {
      focused: false,
      searchText: "",
      isDialogOpen: false,
      recentSeachs: ["José Arthur", "Samuel", "Matheus", "João"],
      results: [
        {
          id: 1,
          name: "Rubens Garcia",
          cpf: "481.805.982-0",
          proposal: {
            number: 3990807,
            status: "Cancelada",
          },
          contract: {
            client: "ABEV",
            number: "ABEV00001337",
          },
          operator: "SulAmérica Saúde",
        },
      ],
    };
  },

  computed: {
    haveSearchText() {
      return this.searchText.length !== 0;
    },

    isActive() {
      return this.isDialogOpen || this.focused || this.haveSearchText;
    },

    isShowingRecentSearchs() {
      return this.recentSeachs.length > 0 && this.searchText.length === 0;
    },

    isShowingResults() {
      return this.results.length > 0 && this.searchText.length !== 0;
    },
  },

  methods: {
    previousFocus({ key }) {
      if (key === "ArrowDown") {
        console.log("previousFocus");
      }
    },

    nextFocus({ key }) {
      if (key === "ArrowUp") {
        console.log("nextFocus");
      }
    },

    clearSearchText() {
      this.searchText = "";

      if (this.isDialogOpen) {
        this.$refs.searchInput.focus();
      }
    },

    resultItemClick(item, index) {
      console.log({ item, index });

      this.closeDialog();
    },

    setSearchText(text) {
      this.searchText = text;
      this.$refs.searchInput.focus();
    },

    removeSearchItem(_, index) {
      this.recentSeachs.splice(index, 1);
      this.$refs.searchInput.focus();
    },

    inputFocus() {
      this.focused = true;
      this.openDialog();
    },

    inputBlur() {
      this.focused = false;
    },

    openDialog() {
      this.isDialogOpen = true;

      document.addEventListener("keydown", this.previousFocus);
      document.addEventListener("keydown", this.nextFocus);
    },

    closeDialog() {
      this.isDialogOpen = false;

      document.removeEventListener("keydown", this.previousFocus);
      document.removeEventListener("keydown", this.nextFocus);
    },

    escapeDialog(event) {
      if (event.key === "Escape") {
        this.closeDialog();
      }
    },
  },

  mounted() {
    document.body.addEventListener("keydown", this.escapeDialog);
  },

  unmounted() {
    document.body.removeEventListener("keydown", this.escapeDialog);
  },
};
</script>

<style>
.searchbar__wrapper {
  position: relative;
  width: 100%;
  opacity: 0.8;
  max-width: 550px;
  margin: 0 24px;
}

.searchbar__wrapper:hover,
.searchbar__wrapper.active {
  opacity: 1;
}

.searchbar__container {
  background-color: #fff;
  border-radius: 2px;

  position: relative;
  height: 32px;
  z-index: 1;
}

input {
  position: absolute;
  top: 0;
  bottom: 0;
  padding-left: 42px;
  width: 100%;

  background: none;
  border: none;
  color: #004578;
  font-size: 14px;
  line-height: 20px;
}

input::placeholder {
  color: inherit;
}
</style>