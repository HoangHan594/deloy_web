<template>
  <nav class="navbar navbar-expand">
    <div class="navbar-brand-container">
      <img src="../../img/logosachv3.png" class="logo">
      <div class="mr-auto navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'book-client' }" class="nav-link"
            :class="{ active: $route.name === 'book-client' }">
            <h6><b>Danh mục sách</b></h6>
            <i class="fa-solid fa-book"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'borrow-client' }" class="nav-link"
            :class="{ active: $route.name === 'borrow-client' }">
            <h6><b>Lịch sử mượn</b></h6>
            <i class="fa-solid fa-book-reader"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'profile' }" class="nav-link" :class="{ active: $route.name === 'profile' }">
            <h6><b>{{ getLastName() }} </b></h6>
            <i class="fa-solid fa-user"></i>
            <span class="span">Balance: {{ reader.accountBalance }} VNĐ</span>
          </router-link>

        </li>
      </div>
    </div>
    <!-- <div>
      <router-link :to="{ name: 'profile' }" class="nav-link" :class="{ active: $route.name === 'profile' }">
        <h6><b>{{ getLastName() }} </b></h6>
        <i class="fa fa-user"></i>
      </router-link>
      <span class="nav-link">Balance: {{ reader.accountBalance }} VNĐ</span>
      <span>{{ getLastName() }}</span> | <span>Balance: {{ reader.accountBalance }} VNĐ</span>
    </div> -->

    <div class="logout-container">
      <button class="btn btn-danger button-logout" @click="logout">
        Đăng Xuất
      </button>
    </div>
  </nav>
</template>

<script>
import Authorization from "@/services/client/authorization.service";
import readerService from "@/services/client/reader.service";
import Cookies from 'js-cookie';

export default {
  computed: {},
  data() {
    return {
      token: "",
      reader: {},
    };
  },
  name: "client-app-header",
  methods: {
    async retrieveReaders() {
      try {
        const token = Cookies.get('tokenUser');
        this.token = token;
        let formData = new FormData();
        formData.append("tokenUser", token);
        // Lấy danh sách borrows từ readerService
        this.reader = await readerService.getUserByToken(formData);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin doc gia:', error);
        // Có thể hiển thị thông báo lỗi trên UI nếu cần
      }
    },

    getLastName() {
      if (!this.reader.fullName) return '';
      const parts = this.reader.fullName.trim().split(' ');
      return parts.length > 0 ? parts[parts.length - 1] : '';
    },

    async logout() {
      // Xử lý đăng xuất ở đây
      try {
        const respone = await Authorization.logOut();
        this.$router.push({ name: "login-client" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.retrieveReaders();
  },
};
</script>

<style scoped>
/* General Body Styling */
body {
  font-family: 'Open Sans', sans-serif;
  line-height: 28px;
}

/* Navbar Styling */
.navbar-expand {
  background-color: #FFF;
  border-bottom: 5px solid rgba(31, 184, 211, 0.568);
  min-height: 60px;
  margin-bottom: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 10px 30px 10px 30px;
}

.navbar-brand-container {
  display: flex;
  align-items: flex-start;
}

.logo img {
  max-width: 10px;
  /* Giới hạn kích thước lớn nhất */
  height: auto;
  /* Giữ tỉ lệ hình ảnh */
  margin-right: 20px;
  /* Chuyển sang display block */
}

.navbar-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-left: 50px;
  margin-top: 100px;
  /* Đưa thanh chọn xuống dưới logo */
}

.nav-item {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #7c81a58b;
  /* Màu chữ mặc định */
  text-transform: uppercase;
  font-weight: 500;
  padding: 25px 15px;
  background-color: transparent;
  transition: all 0.3s ease;
  border-radius: 5;
  position: relative;
  /* Để sử dụng pseudo-element */
}

.nav-link:hover {
  color: #6fb3dd7b;
  /* Màu chữ khi hover */
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 8px;
  /* Khoảng cách từ chữ đến gạch chân */
  left: 0;
  width: 100%;
  /* Chiều rộng gạch chân */
  height: 4px;
  /* Độ dày của gạch chân */
  background-color: #6fb3dd7b;
  /* Màu của gạch chân */
  transform: scaleX(0);
  /* Bắt đầu với chiều dài bằng 0 */
  transition: transform 0.3s ease;
  /* Thời gian chuyển tiếp */
}

.nav-link:hover::after {
  transform: scaleX(1);
  /* Khi hover, gạch chân mở rộng */
}

.nav-link.active::after {
  transform: scaleX(1);
  /* Giữ gạch chân khi đang hoạt động */
}

.fa-book,
.fa-book-reader,
.fa-user {
  margin-left: 8px;
  margin-right: 5px;
}

.logout-container {
  margin-left: auto;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.btn-danger {
  padding: 10px 20px;
  margin-top: 80px;
  background-color: #6fb3dd7b;
  border-color: #6fb3dd7b;
  color: black;
  font-weight: 500;
}

h6,
.fa-solid,
.span {
  color: #000;
}
</style>