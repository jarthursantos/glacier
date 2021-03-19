<template>
  <div class="searchbar__component">
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
          @keydown="openDialog"
          v-model="searchText"
        />

        <ActivityIndicator :loading="isLoading" />

        <ClearButton
          v-if="haveSearchText"
          :click="clearSearchText"
          :loading="isLoading"
        />
      </div>

      <Panel v-if="isShowingPanel">
        <Section label="Pesquisas recentes" v-if="isShowingRecentSearchs">
          <RecentSearchsList
            :searchs="recentSeachs"
            :itemClick="setSearchText"
            :itemRemoveClick="removeSearchItem"
          />
        </Section>

        <Section
          v-if="isShowingResults"
          :label="`Resultados da pesquisa: ${totalResults}`"
        >
          <SearchResultsList
            :results="results"
            :itemClick="resultItemClick"
            :loadNextPage="loadNextPage"
            :isLoading="isLoadingNextPage"
            :haveMoreResults="haveMoreResults"
          />
        </Section>
      </Panel>
    </div>

    <Backdrop :open="isDialogOpen" @click="closeDialog" />
  </div>
</template>

<script>
import { debounce } from "lodash";
import { api } from "../../../services/api";

import Backdrop from "./Backdrop";
import ActivityIndicator from "./ActivityIndicator";
import ClearButton from "./ClearButton";
import Panel from "./Panel";
import RecentSearchsList from "./RecentSearchsList";
import SearchIcon from "./SearchIcon";
import SearchResultsList from "./SearchResultsList";
import Section from "./Section";

const findResults = debounce(async (query, page, onFinish) => {
  const { data } = await api.get("/documents/search", {
    params: { query, page },
  });

  onFinish(data, query);
}, 500);

const RESULTS_PER_PAGE = 5

export default {
  components: {
    Backdrop,
    ClearButton,
    Panel,
    RecentSearchsList,
    SearchIcon,
    Section,
    SearchResultsList,
    ActivityIndicator,
  },

  data() {
    return {
      focused: false,
      searchText: "",
      isDialogOpen: false,
      recentSeachs: ["José Arthur", "Samuel", "Matheus", "João"],
      results: [],
      isLoading: false,
      isLoadingNextPage: false,
      currentPage: 0,
      totalResults: 0,
    };
  },

  watch: {
    searchText(text, oldText) {
      if (text.trim().length === 0) {
        this.results = [];

        return;
      }

      this.openDialog();

      if (!text.startsWith(oldText)) {
        this.results = [];
      }

      this.isLoading = true;

      findResults(text, 0, ({ results, totalResults }, query) => {
        if (query !== text) {
          return;
        }

        this.isLoading = false;
        this.results = results;
        this.totalResults = totalResults;
        this.currentPage = 0
      });
    },
  },

  computed: {
    haveMoreResults() {
      return ((this.currentPage + 1) * RESULTS_PER_PAGE) < this.totalResults
    },

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

    isShowingPanel() {
      return (
        this.isDialogOpen &&
        (this.isShowingRecentSearchs || this.isShowingResults)
      );
    },
  },

  methods: {
    loadNextPage() {
      this.isLoadingNextPage = true
      
      findResults(this.searchText, this.currentPage + 1, ({ results, page, totalResults }) => {
        this.isLoadingNextPage = false;
        this.results = [...this.results, ...results];
        this.currentPage = page
        this.totalResults = totalResults
      });
    },

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
      console.log(item, index);

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
      if (!this.isDialogOpen) {
        this.isDialogOpen = true;

        document.addEventListener("keydown", this.previousFocus);
        document.addEventListener("keydown", this.nextFocus);
      }
    },

    closeDialog() {
      if (this.isDialogOpen) {
        this.isDialogOpen = false;

        document.removeEventListener("keydown", this.previousFocus);
        document.removeEventListener("keydown", this.nextFocus);
      }
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
.searchbar__component {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 0 24px;
}

.searchbar__wrapper {
  position: relative;
  width: 100%;
  opacity: 0.8;
  max-width: 800px;
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