<!-- src/views/client/pages/forgetPass/RequestResetPassword.vue -->
<template>
    <div class="bg">
        <a href="/admin/auth/login" class="logo-link">
            <img class="logo" src="../../../../img/logoWeb.png" alt="">
        </a>
        <div class="request-reset-password">
            <form @submit.prevent="requestPasswordReset">
                <div class="login">Yêu Cầu Đổi Mật Khẩu</div>
                <label for="email"><b>Email:</b></label>
                <input class="input" type="email" v-model="email" id="email" required />
                <button class="button" type="submit">Request Password Reset</button>
            </form>
            <p v-if="message">{{ message }}</p>
        </div>
    </div>
</template>

<script>
import AuthorizationServiceClient from "../../../../services/client/authorization.service";

export default {
    data() {
        return {
            email: '',
            message: '',
        };
    },
    methods: {
        async requestPasswordReset() {
            try {
                const response = await AuthorizationServiceClient.requestPasswordReset(this.email);
                this.message = response.message;
                window.alert('Yêu cầu đổi mật khẩu đã được gửi. Hãy kiểm tra mail của bạn.');
            } catch (error) {
                console.error('Error requesting password reset:', error);
                this.message = 'Có lỗi xảy ra khi yêu cầu đặt lại mật khẩu.';
            }
        },
    },
};
</script>

<style scoped>
html {
    height: 100%;
    margin: 0;
}

.logo {
    position: absolute;
    top: 10%;
    left: 5%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 25%;
    height: auto;
}

.login {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 500;
    color: rgb(0, 0, 0);
    padding-bottom: 20px;
}

.bg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-size: cover;
    background-image: url('../../../../img/login.png');
}

.request-reset-password {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    width: 80%;
    max-width: 500px;
    height: 350px;
    text-align: center;
    padding: 20px;
    margin-top: 10px;
    background-color: #f5f5f59a;
    /* background-color: transparent; */
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.189);
    /* background-color: rgba(150, 148, 148, 0.5); */
    /* Nền mờ đen */

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.input {
    margin-left: 5px;
    border-radius: 5px;
}

.button {
    margin-left: 10px;
    border-radius: 5px;
}
</style>