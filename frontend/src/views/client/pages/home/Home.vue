<template>
    <AppHeaderHome />
    <div class="homepage">
        <div class="content">
            <h1>BOOKSTORE</h1>
            <p>Để thực hiện mượn sách của cửa hàng
                <br> Vui lòng hãy đăng nhập !
            </p>
            <div>
                <button class="btn1">
                    <router-link to="/auth/login">Đăng Nhập</router-link>
                </button>
                <button class="btn1">
                    <router-link to="/reader/register">Đăng Ký</router-link>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import AppHeaderHome from "./AppHeaderHome.vue";
export default {
    components: {
        AppHeaderHome,
    },
}

</script>

<style>
.homepage {
    width: 100%;
    height: 100vh;
    opacity: 0.6;
    position: relative;
    /* background-position: center; */
    background-size: cover;
    background-image: url('../../../../img/login.png');
}

.content {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    color: black;
}
.content h1 {
    font-size: 80px;
    margin-top: 80px;
    font-weight: 500;
}

.content p {
    margin: 20px auto;
    font-weight: 100;
    line-height: 25px;
    font-weight: bold;
}

.btn1 {
    width: 200px;
    padding: 10px 5px;
    text-align: center;
    margin: 20px 10px;
    border-radius: 25px;
    font-weight: bold;
    border: 2px solid #009688;
    background: transparent;
    color: black;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

</style>