<template>
  <div class="book-carousel">
    <div class="book-grid">
      <div class="book" v-for="(book, index) in displayedBooks" :key="book._id"
        :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
        <img :src="'/api/uploads/' + book.thumbnail" alt="Book Image" />
        <div class="book-details">
          <p class="book-title">{{ truncate(book.bookTitle) }}</p>
          <p class="author">{{ book.author }}</p>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">Trước</button>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">Sau</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  data() {
    return {
      currentPage: 0,
      booksPerPage: 15,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.books.length / this.booksPerPage);
    },
    displayedBooks() {
      const start = this.currentPage * this.booksPerPage;
      return this.books.slice(start, start + this.booksPerPage);
    },
  },
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    truncate(text, length = 20) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
  },
};
</script>
<style>
.book-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 5 cuốn sách trên 1 hàng */
  gap: 10px;
  /* Khoảng cách giữa các cuốn sách */
  margin-bottom: 20px;
}

.book {
  flex-basis: 18%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #9a9999;
  border-radius: 5px;
  margin: 1%;
  overflow: hidden;
  /* Thêm thuộc tính này */
}

.book img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  /* Có thể giữ nguyên hoặc thay đổi thành 'contain' nếu cần */
  border-radius: 5px;
}

.book-details {
  text-align: center;
}

.book-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.author {
  margin-top: 5px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  /* Điều chỉnh kích thước nút */
}

.pagination button {
  padding: 10px;
}
</style>
