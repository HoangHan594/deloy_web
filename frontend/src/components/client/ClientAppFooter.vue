<template>
  <footer class="app-footer">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <p>&copy; 2024 Công ty sách. Mọi quyền được bảo lưu.</p>
          <router-link to="/about">Giới thiệu</router-link> |
          <router-link to="/contact">Liên hệ</router-link> |
          <router-link to="/policy">Chính sách</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.app-footer a {
  color: black;
  margin: 0 10px;
  text-decoration: none;
}

.app-footer a:hover {
  color: #fff;
}

.app-footer {
  background-color: #eeeeee;
  color: black;
  padding: 20px 0;
  text-align: center;
  margin-top: 80px;
  /* margin-bottom:0px; */
  position: relative;
  border-top: 5px solid rgba(31, 184, 211, 0.568);
}
</style>