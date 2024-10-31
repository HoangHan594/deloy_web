<template>
  <div>
    <AppHeader />
    <div class="container mt-3">
      <div class="page row">
        <div class="col-md-10">
          <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-8">
          <h4>
            Danh Sách Sách Trong Kho
            <i class="fa-solid fa-book"></i>
          </h4>

          <div class="item">
            <button class="btn btn-sm btn-primary custom-margin" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success custom-margin" @click="goToAddBook">
              <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button class="btn btn-sm btn-danger custom-margin" @click="removeAllBooks">
              <i class="fas fa-trash"></i> Xóa tất cả
            </button>

            <select v-model="selectedGenre" @change="filterByGenre" class="custom-select custom-margin">
              <option value="">Tất cả thể loại</option>
              <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
            </select>
          </div>

          <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
          <p v-else>Không có cuốn sách nào.</p>
        </div>

        <div class="mt-3 col-4">
          <div v-if="activeBook">
            <h4>
              Chi tiết đầu sách
              <i class="fa-solid fa-book"></i>
            </h4>
            <BookDetail :book="activeBook" />
            <router-link :to="{
              name: 'book.edit',
              params: { id: activeBook._id },
            }">
              <span class="mt-2 badge badge-warning" style="color: blue">
                <i class="fas fa-edit"></i> Hiệu chỉnh
              </span>
            </router-link>
            <span class="mt-2 badge badge-warning" style="color: red; cursor: pointer"
              @click="removeOneBook(activeBook)">
              <i class="fa-solid fa-trash"></i> Xóa
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookDetail from "@/components/admin/BookDetail.vue";
import AppHeader from "@/components/admin/AppHeader.vue";
import InputSearch from "@/components/admin/InputSearch.vue";
import BookList from "@/components/admin/BookList.vue";
import BookService from "@/services/admin/book.service";

export default {
  components: {
    BookDetail,
    InputSearch,
    BookList,
    AppHeader,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
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
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng book thành chuỗi để tiện cho tìm kiếm.
    booksStrings() {
      return this.books.map((book) => {
        const {
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
    // Trả về các book có chứa thông tin cần tìm kiếm.
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
        //this.books = this.books.filter(book => book.genre);
        this.genres = [...new Set(this.books.map(book => book.genre))]; // Lấy danh sách thể loại duy nhất
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.searchText = "";
      this.activeIndex = -1;
      this.selectedGenre = ""; // Đặt thể loại đã chọn về mặc định
    },
    async removeOneBook(book) {
      if (confirm("Bạn muốn xóa cuốn sách này?")) {
        try {
          await BookService.delete(book._id);
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async removeAllBooks() {
      if (confirm("Bạn muốn xóa tất cả sách?")) {
        try {
          await BookService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddBook() {
      this.$router.push({ name: "book.add" });
    },
    filterByGenre() {
      // Phương thức này sẽ được gọi khi người dùng chọn một thể loại khác
      this.activeIndex = -1; // Đặt chỉ mục đã chọn về mặc định khi thay đổi thể loại
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

.custom-margin {
  margin-right: 10px;
  margin-top: 10px;
  /* hoặc bất kỳ giá trị nào bạn muốn */
}

.custom-select{
  padding-right: 20px;
  padding-bottom: 5px;
}

.item {
  padding-bottom: 10px;
}
</style>
