<template>
    <div class="edit-profile-container">
        <h1>Chỉnh Sửa Thông Tin Cá Nhân</h1>
        <div v-if="reader">
            <form @submit.prevent="updateProfile">
                <div class="form-group">
                    <label for="fullName">Họ và Tên:</label>
                    <input type="text" id="fullName" v-model="formData.fullName" required />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="formData.email" required />
                </div>
                <div class="form-group">
                    <label for="phone">Số Điện Thoại:</label>
                    <input type="text" id="phone" v-model="formData.phone" required />
                </div>
                <div class="form-group">
                    <label for="address">Địa Chỉ:</label>
                    <input type="text" id="address" v-model="formData.address" required />
                </div>
                <button class="btn btn-primary" type="submit">Cập Nhật</button>
                <button class="btn btn-secondary" @click="cancelEdit">Hủy</button>
            </form>
        </div>
        <div v-else>
            <p>Đang tải dữ liệu...</p>
        </div>
    </div>
</template>

<script>
import readerService from "@/services/client/reader.service";
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            reader: {},
            formData: {
                fullName: "",
                email: "",
                phone: "",
                address: ""
            }
        };
    },
    methods: {
        async retrieveReader() {
            try {
                const token = Cookies.get('tokenUser');
                let formData = new FormData();
                formData.append("tokenUser", token);
                this.reader = await readerService.getUserByToken(formData);

                // Khởi tạo form với dữ liệu hiện tại
                this.formData.fullName = this.reader.fullName || '';
                this.formData.email = this.reader.email || '';
                this.formData.phone = this.reader.phone || '';
                this.formData.address = this.reader.address || '';
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        },

        async updateProfile() {
            try {
                // const token = Cookies.get('tokenUser');
                const formData = new FormData();
                // formData.append("tokenUser", token);
                formData.append("fullName", this.formData.fullName);
                formData.append("email", this.formData.email);
                formData.append("phone", this.formData.phone);
                formData.append("address", this.formData.address);

                await readerService.updateProfile(formData);

                // Thông báo thành công và quay lại trang profile
                alert('Thông tin cá nhân đã được cập nhật!');
                this.$router.push({ name: 'profile' });
            } catch (error) {
                console.error('Lỗi khi cập nhật thông tin:', error);
                alert('Có lỗi xảy ra khi cập nhật thông tin.');
            }
        },

        cancelEdit() {
            this.$router.push({ name: 'profile' });
        }
    },
    mounted() {
        this.retrieveReader();
    }
};
</script>

<style scoped>
.edit-profile-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.btn {
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-primary {
    background-color: #717273;
    color: #fff;
    margin-right: 5px;
}

.btn-secondary {
    background-color: #717273;
    color: #fff;
}

.btn-primary:hover {
    background-color: #8b8b8b;
    color: #fff;
}

.btn-secondary:hover {
    background-color: #8b8b8b;
    color: #fff;
}
</style>
