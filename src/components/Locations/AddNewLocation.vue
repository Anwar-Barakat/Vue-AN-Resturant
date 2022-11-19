<template>
    <NavigationBar />
    <section class="form-container">
        <h3>Add New Location</h3>
        <form>
            <div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
                v-if="successMessage"
            >
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
                {{ successMessage }}
            </div>
            <div class="modal-body">
                <div class="box mb-3">
                    <input
                        type="text"
                        placeholder="Restaurant Title"
                        v-model.trim="state.title"
                    />
                    <small
                        class="text text-danger text-bold fw-bold"
                        v-if="v$.title.$error"
                    >
                        {{ v$.title.$errors[0].$message }}
                    </small>
                </div>
                <div class="box mb-3">
                    <input
                        type="tel"
                        placeholder="Restaurant Phone"
                        v-model.trim="state.phone"
                    />
                    <small
                        class="text text-danger text-bold fw-bold"
                        v-if="v$.phone.$error"
                    >
                        {{ v$.phone.$errors[0].$message }}
                    </small>
                </div>
                <div class="box mb-3">
                    <input
                        type="text"
                        placeholder="Restaurant Address"
                        v-model.trim="state.address"
                    />
                    <small
                        class="text text-danger text-bold fw-bold"
                        v-if="v$.address.$error"
                    >
                        {{ v$.address.$errors[0].$message }}
                    </small>
                </div>
                <button
                    type="submit"
                    class="btn btn-primary"
                    @click.prevent="addLocation()"
                >
                    Submit
                </button>
            </div>
        </form>
    </section>
</template>

<script>
import NavigationBar from "@/components/Navbar/Navbar.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
    name: "AddNewLocation",
    setup() {
        const state = reactive({
            title: "",
            phone: "",
            address: "",
        });
        const rules = computed(() => {
            return {
                title: { required, minLength: minLength(4) },
                phone: { required, minLength: minLength(10) },
                address: { required, minLength: minLength(10) },
            };
        });
        const v$ = useVuelidate(rules, state);
        return {
            state,
            v$,
        };
    },
    data() {
        return {
            userId: "",
            successMessage: "",
        };
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (!user) this.redirectTo({ link: "login" });
        else this.userId = JSON.parse(user).id;
    },
    methods: {
        async addLocation() {
            this.v$.$validate();
            if (!this.v$.$error) {
                let result = await axios.post(
                    "http://localhost:3000/locations",
                    {
                        title: this.state.title,
                        phone: this.state.phone,
                        address: this.state.address,
                        userId: this.userId,
                    }
                );
                if (result.status == 201) {
                    this.successMessage =
                        "Restaurant Location Has Added Successfully";
                    setTimeout(() => {
                        this.redirectTo({ link: "home" });
                    }, 3000);
                } else {
                    this.redirectTo({ link: "home" });
                }
            }
        },
        ...mapActions(["redirectTo"]),
    },
    components: {
        NavigationBar,
    },
};
</script>

<style></style>
