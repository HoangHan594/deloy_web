<template>
    <div>
        <ClientAppHeader />
        <div class="container mt-3">
            <div class="add-new"><b>Mượn Sách</b></div>
            <div class="form">
                <form @submit.prevent="onSubmit">
                    <div class="form-item">
                        <label class="label" for="bookTitle">Tên sách:</label><br />
                        <input class="input" type="text" id="bookTitle" v-model="formData.bookTitle" readonly />
                    </div>

                    <div class="form-item">
                        <label class="label" for="price">Giá:</label><br />
                        <input class="input" type="number" id="price" v-model="formData.price" readonly />
                    </div>

                    <div class="form-item">
                        <label class="label" for="number">Số lượng:</label><br />
                        <input class="input" type="number" id="quantity" v-model="formData.quantity" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="borrowDate">Ngày mượn:</label><br />
                        <input class="input" type="date" id="borrowDate" v-model="formData.borrowDate" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="returnDate">Ngày trả:</label><br />
                        <input class="input" type="date" id="returnDate" v-model="formData.returnDate" />
                    </div>

                    <div class="form-item">
                        <label class="label">Phương thức thanh toán:</label><br />
                        <div>
                            <input type="radio" id="cash" value="cash" v-model="formData.paymentMethod" />
                            <label for="cash">Tiền mặt</label>
                        </div>
                        <div>
                            <input type="radio" id="account" value="account" v-model="formData.paymentMethod" />
                            <label for="account">Tiền trong tài khoản</label>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary" @click="validateForm">Mượn Sách</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import BookService from "@/services/client/book.service";
import readerService from "@/services/client/reader.service";
import Cookies from 'js-cookie';

export default {
    components: {
    },
    data() {
        return {
            formData: {
                id_book: "",
                bookTitle: "",
                price: 0,
                quantity: 1,
                borrowDate: "",
                returnDate: "",
                paymentMethod: "",
            },
            token: "",
            accountBalance: 0,
            reader: {},
        };
    },
    mounted() {
        this.retrieve(this.$route.params.id);
    },

    methods: {
        async retrieve(bookId) {
            try {
                const book = await BookService.get(bookId);
                if (book) {
                    this.formData.bookTitle = book.bookTitle;
                    this.formData.price = book.price;
                    this.formData.id_book = bookId;
                } else {
                    console.log("Book not found");
                }
                console.log(book);
            } catch (error) {
                console.log(error);
            }
        },

        async updateBook(quantity, paymentMethod) {
            try {
                const token = Cookies.get('tokenUser');
                let formDataToken = new FormData();
                formDataToken.append("tokenUser", token);
                // Lấy thông tin người dùng từ readerService
                this.reader = await readerService.getUserByToken(formDataToken);
                this.accountBalance = this.reader.accountBalance || 0;

                if (this.formData.paymentMethod === "account") {
                    if (this.accountBalance < 5000 * this.formData.quantity) {
                        alert('Số dư tài khoản không đủ để thanh toán.');
                        return;
                    }else{
                        const response = await readerService.updateAccountBalance(quantity, paymentMethod);
                    }
                }

                if (this.formData.paymentMethod === "cash") {
                    alert("Vui lòng đến chuẩn bị tiền mặt để thanh toán");
                }

                const book = await BookService.get(this.formData.id_book);
                if (this.formData.quantity > book.quantity) {
                    alert('Số lượng bạn mượn vượt quá số lượng sách còn lại.');
                    return;
                }

                const formData = new FormData();
                formData.append("id_book", this.formData.id_book);
                formData.append("price", this.formData.quantity);
                formData.append("borrowDate", this.formData.borrowDate);
                formData.append("returnDate", this.formData.returnDate);
                formData.append("paymentMethod", this.formData.paymentMethod);

                const response = await readerService.updateBorrow(this.token, this.formData);
            } catch (error) {
                console.log(error);
            }
        },

        validateForm() {
            if (!this.formData.bookTitle || !this.formData.price || !this.formData.quantity || !this.formData.borrowDate || !this.formData.returnDate || !this.formData.paymentMethod) {
                alert('Vui lòng điền đầy đủ thông tin!');
            }
        },

        async onSubmit() {
            this.validateForm();
            try {
                const quantity = this.formData.quantity;
                const paymentMethod = this.formData.paymentMethod;
                await this.updateBook(quantity, paymentMethod); // Gửi số lượng sách về server
                this.$router.push('/books');
            } catch (error) {
                console.error('Error while borrowing book:', error);
            }
        },

        mounted() {
            this.retrieveReaders();
        },
    },
};
</script>

<style scoped>
.container {
    width: 80%;
    width: 60%;
    height: 750px;
    text-align: center;
    /* margin-top: 10px; */
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-new {
    font-size: 30px;
    margin-top: 10px;
}

.form-item {
    text-align: left;
    padding: 10px;
}

.label {
    font-weight: bold;
}

.input {
    width: 100%;
    /* height: 40px; */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn-primary {
    margin-top: 20px;
    background-color: #a3a09b;
    border: #a3a09b;
}

.btn-primary:hover {
    background-color: #6f6e6d;
}
</style>