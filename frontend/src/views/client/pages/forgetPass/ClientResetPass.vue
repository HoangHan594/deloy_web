<template>
    <div class="reset-password">
        <form @submit.prevent="resetPassword">
            <label for="newPassword">New Password:</label>
            <input type="password" v-model="newPassword" id="newPassword" required />
            <button type="submit">Reset Password</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
import AuthorizationServiceClient from "../../../../services/client/authorization.service";

export default {
    data() {
        return {
            newPassword: '',
            message: '',
            token: ''
        };
    },
    created() {
        this.token = new URLSearchParams(window.location.search).get('token');
    },
    methods: {
        async resetPassword() {
            try {
                const response = await AuthorizationServiceClient.resetPassword(this.token, this.newPassword);
                this.message = response.message;
                this.$router.push('/profile');
                alert("Đã đổi mật khẩu thành công");
            } catch (error) {
                console.error('Error resetting password:', error);
                this.message = 'Có lỗi xảy ra khi đặt lại mật khẩu.';
            }
        },
    },
};
</script>

<style scoped>
/* Thêm CSS nếu cần
  .reset-password {
    /* CSS cho component 
  }*/
</style>