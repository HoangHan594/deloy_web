<template>
    <ClientAppHeader />
    <div class="profile-container">
        <h1>Thông Tin Cá Nhân</h1>
        <div v-if="reader">
            <div class="profile-item">
                <strong>Họ và Tên:</strong>
                <span>{{ reader.fullName }}</span>
            </div>
            <div class="profile-item">
                <strong>Email:</strong>
                <span>{{ reader.email }}</span>
            </div>
            <div class="profile-item">
                <strong>Số Điện Thoại:</strong>
                <span>{{ reader.phone }}</span>
            </div>
            <div class="profile-item">
                <strong>Địa Chỉ:</strong>
                <span>{{ reader.address }}</span>
            </div>
            <div class="profile-item">
                <strong>Số Dư Tài Khoản:</strong>
                <span>{{ reader.accountBalance }}</span>
                <button class="btn btn-success" @click="handleAddFundsClick" :disabled="fundsButtonClicked">
                    Nạp thêm tiền
                </button>
            </div>

            <!-- Hiển thị thông tin ngân hàng nếu đã tồn tại -->
            <div v-if="reader.bankAccount">
                <div class="profile-item">
                    <strong>Số Tài Khoản Ngân Hàng:</strong>
                    <span>{{ reader.bankAccount.accountNumber }}</span>
                </div>
                <div class="profile-item">
                    <strong>Tên Ngân Hàng:</strong>
                    <span>{{ reader.bankAccount.bankName }}</span>
                </div>
                <div class="profile-item">
                    <strong>Tên Chủ Tài Khoản:</strong>
                    <span>{{ reader.bankAccount.accountHolderName }}</span>
                </div>
                <button class="btn btn-primary" @click="openUpdateBankAccountModal">Cập Nhật Thông Tin Ngân
                    Hàng</button>
            </div>
            <div v-else>
                <p>Chưa có thông tin tài khoản ngân hàng.</p>
                <button class="btn btn-primary" @click="openAddBankAccountModal">Thêm Tài Khoản Ngân Hàng</button>
            </div>
        </div>
        <div v-else>
            <p>Đang tải dữ liệu...</p>
        </div>
        <button class="btn btn-primary" @click="editProfile">Chỉnh Sửa Thông Tin</button>

        <!-- Modal nạp thêm tiền -->
        <div v-if="showAddFundsModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeAddFundsModal">&times;</span>
                <h2>Nạp thêm tiền</h2>
                <input type="number" v-model="amountToAdd" placeholder="Nhập số tiền" />
                <div v-if="reader.bankAccount">
                    <strong>Số tài khoản ngân hàng:</strong>
                    <span>{{ reader.bankAccount.accountNumber }}</span>
                </div>
                <button class="btn btn-primary" @click="addFunds">Nạp tiền</button>
            </div>
        </div>

        <!-- Modal thêm thông tin ngân hàng -->
        <div v-if="showAddBankAccountModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeAddBankAccountModal">&times;</span>
                <h2>Thêm Tài Khoản Ngân Hàng</h2>
                <input type="text" id="newBankAccountNumber" v-model="newBankAccountNumber"
                    placeholder="Số tài khoản ngân hàng" />
                <input type="text" id="newBankName" v-model="newBankName" placeholder="Tên ngân hàng" />
                <input type="text" id="newAccountHolderName" v-model="newAccountHolderName"
                    placeholder="Tên chủ tài khoản" />
                <button class="btn btn-primary" @click="addBankAccount">Thêm</button>
            </div>
        </div>

        <!-- Modal cập nhật thông tin ngân hàng -->
        <div v-if="showUpdateBankAccountModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeUpdateBankAccountModal">&times;</span>
                <h2>Cập Nhật Thông Tin Ngân Hàng</h2>
                <input type="text" v-model="updateBankAccountNumber" placeholder="Số tài khoản ngân hàng" />
                <input type="text" v-model="updateBankName" placeholder="Tên ngân hàng" />
                <input type="text" v-model="updateAccountHolderName" placeholder="Tên chủ tài khoản" />
                <button class="btn btn-primary" @click="updateBankAccount">Cập nhật</button>
            </div>
        </div>
    </div>
</template>


<script>
import readerService from "@/services/client/reader.service";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import Cookies from 'js-cookie';

export default {
    components: {
        ClientAppHeader,
    },
    data() {
        return {
            reader: {},
            showAddFundsModal: false,
            showAddBankAccountModal: false,
            showUpdateBankAccountModal: false,
            amountToAdd: 0,
            bankAccountNumber: "",
            newBankAccountNumber: "",
            newBankName: "",
            newAccountHolderName: "",
            updateBankAccountNumber: "",
            updateBankName: "",
            updateAccountHolderName: "",
            fundsButtonClicked: false,
        };
    },
    methods: {
        async retrieveReaders() {
            try {
                const token = Cookies.get('tokenUser');
                let formData = new FormData();
                formData.append("tokenUser", token);
                // Lấy thông tin người dùng từ readerService
                this.reader = await readerService.getUserByToken(formData);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        },
        openAddFundsModal() {
            this.showAddFundsModal = true;
        },
        closeAddFundsModal() {
            this.showAddFundsModal = false;
        },
        openAddBankAccountModal() {
            this.showAddBankAccountModal = true;
        },
        closeAddBankAccountModal() {
            this.showAddBankAccountModal = false;
        },
        openUpdateBankAccountModal() {
            this.updateBankAccountNumber = this.reader.bankAccount?.accountNumber || '';
            this.updateBankName = this.reader.bankAccount?.bankName || '';
            this.updateAccountHolderName = this.reader.bankAccount?.accountHolderName || '';
            this.showUpdateBankAccountModal = true;
        },
        closeUpdateBankAccountModal() {
            this.showUpdateBankAccountModal = false;
        },

        async handleAddFundsClick() {
            if (this.fundsButtonClicked) return;
            this.fundsButtonClicked = true;
            this.openAddFundsModal();
        },
        async addFunds() {
            try {
                const bankAccountNumber = this.reader.bankAccount?.accountNumber;
                if (!bankAccountNumber) {
                    console.error('Số tài khoản ngân hàng không được tìm thấy.');
                    return;
                }
                const payload = {
                    amount: this.amountToAdd,
                    bankAccountNumber
                };
                await readerService.addFunds(payload);

                // Đóng modal và vô hiệu hóa nút
                this.closeAddFundsModal();
                this.fundsButtonClicked = true;
            } catch (error) {
                console.error('Lỗi khi nạp tiền:', error);
            }
        },

        async addBankAccount() {
            try {
                const payload = {
                    accountNumber: this.newBankAccountNumber,
                    bankName: this.newBankName,
                    accountHolderName: this.newAccountHolderName
                };
                await readerService.updateBankAccount(payload); // Sử dụng hàm cập nhật để thêm thông tin ngân hàng
            } catch (error) {
                console.error('Lỗi khi thêm tài khoản ngân hàng:', error);
            }
        },

        async updateBankAccount() {
            try {
                const token = Cookies.get('tokenUser');
                const payload = {
                    accountNumber: this.updateBankAccountNumber,
                    bankName: this.updateBankName,
                    accountHolderName: this.updateAccountHolderName
                };
                await readerService.updateBankAccount(payload);

                alert('Cập nhật thông tin tài khoản ngân hàng thành công!');

                this.closeUpdateBankAccountModal();
            } catch (error) {
                console.error('Lỗi khi cập nhật thông tin tài khoản ngân hàng:', error);
            }
        },

        // formatAccountBalance(balance) {
        //     return parseFloat(balance).toFixed(2); // Giữ lại 2 chữ số thập phân
        // },


        editProfile() {
            this.$router.push({ name: 'edit-profile' });
        }
    },
    mounted() {
        this.retrieveReaders();
        this.closeAddBankAccountModal();
        this.closeUpdateBankAccountModal();
        this.closeAddFundsModal();
    }
};
</script>


<style scoped>
.profile-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

.profile-item {
    margin-bottom: 10px;
}

.profile-item strong {
    display: block;
}

.btn {
    margin-top: 10px;
}

.btn-success {
    margin-left: 10px;
    background-color: #a3a09b;
    border-radius: 1px solid #a3a09b;
    color: black;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    background-color: #a3a09b;
}
</style>