<template>
  <nav class="navbar navbar-expand ">
    <div class="navbar-brand-container">
      <img src="../../img/logosachv3.png" alt="Logo" class="logo">
      <div class="mr-auto navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'book' }" class="nav-link" :class="{ active: $route.name === 'book' }">
            <h6><b>Quản lý kho sách</b></h6>
            <i class="fa-solid fa-book"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'borrow' }" class="nav-link" :class="{ active: $route.name === 'borrow' }">
            <h6><b>Quản lý mượn sách</b></h6>
            <i class="fa-solid fa-book-reader"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'reader' }" class="nav-link" :class="{ active: $route.name === 'reader' }">
            <h6><b>Quản lý người đọc</b></h6>
            <i class="fa-solid fa-user"></i>
          </router-link>
        </li>
      </div>
    </div>
    <div class="logout-container">
      <button class="btn btn-danger button-logout" @click="logout">
        Đăng Xuất
      </button>
    </div>
  </nav>
</template>

<script>
import Authorization from "@/services/admin/authorization.service.js";
export default {
  computed: {},
  name: "app-header-admin",
  methods: {
    async logout() {
      // Xử lý đăng xuất ở đây
      try {
        const respone = await Authorization.logOut();
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Open Sans', sans-serif;
  line-height: 28px;
}

/* Navbar Styling */
.navbar-expand {
  background-color: #FFF;
  /* Màu nền trắng */
  border-bottom: 5px solid rgba(31, 184, 211, 0.568);
  /* Đường viền dưới */
  min-height: 60px;
  /* Chiều cao tối thiểu */
  margin-bottom: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* Đổ bóng nhẹ */
  display: flex;
  align-items: center;
  padding: 10px 30px 10px 30px;
  /* Khoảng cách cho navbar */
}

.navbar-brand-container {
  display: flex;
  align-items: center;
}

.logo img {
  max-width: 50px;
  /* Kích thước logo */
  height: auto;
  /* Giữ tỷ lệ hình ảnh */
  margin-right: 20px;
  /* Khoảng cách bên phải logo */
}

.navbar-nav {
  display: flex;
  justify-content: center;
  /* Căn giữa thanh chọn */
  align-items: center;
  /* Căn giữa theo chiều dọc */
  gap: 20px;
  /* Khoảng cách giữa các mục */
  margin-left: 50px;
  margin-top: 100px;
  /* Khoảng cách bên trái */
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #7c81a58b;
  /* Màu chữ mặc định */
  text-transform: uppercase;
  /* Chữ in hoa */
  font-weight: 500;
  /* Độ dày chữ */
  padding: 15px 10px;
  /* Khoảng cách trong từng mục */
  background-color: transparent;
  /* Nền trong suốt */
  transition: all 0.3s ease;
  /* Hiệu ứng chuyển tiếp */
  border-radius: 5px;
  /* Bo góc cho các mục */
  position: relative;
  /* Để sử dụng pseudo-element */
}

.nav-link:hover {
  color: #6fb3dd;
  /* Màu chữ khi hover */
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  /* Khoảng cách từ chữ đến gạch chân */
  left: 0;
  width: 100%;
  /* Chiều rộng gạch chân */
  height: 2px;
  /* Độ dày của gạch chân */
  background-color: #6fb3dd;
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
  /* Khoảng cách bên trái cho biểu tượng */
}

.logout-container {
  margin-left: auto;
  /* Tự động căn trái */
  margin-right: 20px;
  /* Khoảng cách bên phải */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* Căn phải cho nút đăng xuất */
}

.btn-danger {
  padding: 10px 20px;
  /* Khoảng cách cho nút */
  background-color: #6fb3dd;
  /* Màu nền nút */
  border-color: #6fb3dd;
  /* Màu viền nút */
  color: black;
  /* Màu chữ trong nút */
  font-weight: 500;
  /* Độ dày chữ */
}

h6,
.fa-solid,
.span {
  color: #000;
  /* Màu chữ mặc định */
}
</style>
