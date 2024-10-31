<template>
  <div>
    <ClientAppHeader />
    <div class="container mt-3">
      <div class="page row">

        <div class="col-md-10">
          <ClientInputSearch v-model="searchText" />
        </div>

        <div>
          <select v-model="selectedGenre" @change="filterByGenre" class="custom-select custom-margin">
            <option value="">Tất cả thể loại</option>
            <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>

        <div class="mt-3 col-12">
          <ClientBookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
          <p v-else>Không có sách trong kho.</p>
        </div>
        <!-- Overlay và phần chi tiết sách -->
        <div v-if="activeBook" class="overlay-container">
          <div class="overlay" @click="closeOverlay"></div>
          <div class="book-details-container">
            <div>
              <h4>
                Chi tiết đầu sách
                <i class="fa-solid fa-book"></i>
              </h4>
              <ClientBookDetail :book="activeBook" />
              <router-link :to="{
                name: 'borrow-book',
                params: { id: activeBook._id },
              }">
                <span class="btn btn-borrow">
                  <i class="fas fa-edit"></i> Mượn sách
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ClientAppFooter />
  </div>
</template>

<script>
import ClientBookDetail from "@/components/client/ClientBookDetail.vue";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientInputSearch from "@/components/client/ClientInputSearch.vue";
import ClientBookList from "@/components/client/ClientBookList.vue";
import BookService from "@/services/client/book.service";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";

export default {
  components: {
    ClientBookDetail,
    ClientInputSearch,
    ClientBookList,
    ClientAppHeader,
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
      selectedGenre: "",
      genres: [], // Biến để lưu danh sách thể loại
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    booksStrings() {
      return this.books.map((book) => {
        const {
          id_publisher,
          bookTitle,
          price,
          quantity,
          publishYear,
          author,
          thumbnail,
          genre,
          weight,
          packagingSize,
          pageNumber,
        } = book;
        return [
          id_publisher,
          bookTitle,
          price,
          quantity,
          publishYear,
          author,
          thumbnail,
          genre,
          weight,
          packagingSize,
          pageNumber,
        ].join("");
      });
    },
    filteredBooks() {
      let filtered = this.books;
      if (this.searchText) {
        filtered = filtered.filter((_book, index) =>
          this.booksStrings[index].includes(this.searchText)
        );
      }
      if (this.selectedGenre) {
        filtered = filtered.filter(book => book.genre === this.selectedGenre);
      }
      return filtered;
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
        this.genres = [...new Set(this.books.map(book => book.genre))]; // Lấy danh sách thể loại duy nhất
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.searchText = "";
      this.activeIndex = -1;
      this.selectedGenre = "";
    },
    borrowBook(book) {
      // Xử lý việc mượn sách
    },
    closeOverlay() {
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
}

/*.custom-margin {
  margin-left: -109%;
  padding-right: 40px;
  margin-top: 50px; 
}*/

.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.book-details-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.btn-borrow {
  /* padding: 15px 30px; */
  font-size: 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  margin-left: 26%;
  margin-top: 10px;
}

.btn-borrow:hover {
  background-color: #cc0000;
}
</style>
