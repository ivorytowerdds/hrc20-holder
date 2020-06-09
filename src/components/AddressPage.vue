<style scoped lang="less">
@import '../less/common.less';

.search {
  width: 15em;
  margin-left: @space-md;
  flex: none;
  height: 2em;
  overflow: hidden;
  position: relative;
  color: var(--color-table-text);
  border: 1px solid var(--color-table-text);
  border-radius: 2em;
  .search-icon {
    position: absolute;
    top: 50%;
    left: @space-sm;
    transform: translateY(-50%);
  }
  input[type='text'] {
    border-radius: 2em;
    padding: @space-sm @space-md;
    padding-left: 3em;
    border: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    &::placeholder {
      color: var(--color-table-text);
    }
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
}
</style>

<template>
  <div class="address-page explorer-page page">
    <div class="address-body explorer-body">
      <div v-if="!loading" class="container">
        <div class="explorer-card">
          <header>
            <h1>HRC20 Holders</h1>
          </header>

          <div class="explorer-card-body">
            <PanelPagination
              :pagination="pagination"
              :total="filteredData.length"
            >
              <div class="search">
                <font-awesome-icon class="search-icon" icon="search" />
                <input
                  v-model="searchValue"
                  type="text"
                  placeholder="Address"
                  @keyup.enter="search"
                />
              </div>
            </PanelPagination>
            <BaseGrid
              :sort="sort"
              :columns="columns"
              :data="dataList"
              :on-row-click="() => ({})"
            />
          </div>
        </div>
      </div>
      <div v-else class="container">
        <loading-message />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingMessage from './LoadingMessage';
import BaseGrid from './BaseGrid';
import PanelPagination from './BaseGrid/PanelPagination';
import axios from 'axios';
import { formatNumber, shortDecimals } from '../filter';
import Address from './fields/Address';

export default {
  name: 'AddressPage',
  components: {
    LoadingMessage,
    BaseGrid,
    PanelPagination,
  },
  data() {
    return {
      loading: true,
      allTxs: [],
      sort: {
        property: null,
        order: `asc`,
      },
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
      searchValue: '',
    };
  },
  watch: {
    $route() {
      // if (this.$route.params.address !== (this.address && this.address.id)) {
      //   this.getAddress();
      // }
    },
  },
  computed: {
    txCount() {
      return this.allTxs.length;
    },
    page() {
      return this.$route.query.page - 1 || 0;
    },
    filteredData() {
      return this.allTxs
        .slice()
        .filter(r =>
          this.searchValue ? r.address.includes(this.searchValue) : true
        );
    },
    dataList() {
      const { property, order } = this.sort;
      const { pageIndex, pageSize } = this.pagination;

      let data = this.filteredData.slice();

      if (property && order) {
        data = data.sort((a, b) => {
          a = a[property];
          b = b[property];

          if (typeof a === 'number') {
            return order === 'asc' ? a - b : b - a;
          }

          return order === 'asc' ? a > b : a < b;
        });
      }

      data = data.splice(pageIndex * pageSize, pageSize);

      return data;
    },
    columns() {
      let props = [
        {
          title: `Address`,
          value: `address`,
          key: item => item.address,
          align: 'left',
          // width: '96px',
          renderComponent: Address,
        },
      ];

      return props;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    changePage(value) {
      this.$router.replace({
        name: 'HomePage',
        query: { page: value + 1, txType: this.$route.query.txType },
      });
    },
    getData() {
      axios
        .get('https://harmony-explorer-mainnet.firebaseio.com/HRC-holder.json')
        .then(response => {
          const { data } = response;
          const resData = [];
          let i = 0;
          while (data.address[i] !== undefined) {
            resData.push({
              address: data.address[i],
            });
            i++;
          }
          this.allTxs = resData;
          this.loading = false;
        });
    },
  },
};
</script>
