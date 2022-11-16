<template>
    <button
        type="button"
        class="btn btn-primary d-block"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
    >
        Add New Restaurant
    </button>

    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Restaurant Location
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div
                            class="alert alert-success alert-dismissible fade show mb-3"
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
                        <div class="form-group mb-3 text-start">
                            <label for="title">Title</label>
                            <input
                                class="form-control"
                                type="text"
                                id="title"
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
                        <div class="form-group mb-3 text-start">
                            <label for="phone">Phone</label>
                            <input
                                class="form-control"
                                type="tel"
                                id="phone"
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
                        <div class="form-group mb-3 text-start">
                            <label for="address"> Address </label>
                            <input
                                class="form-control"
                                type="text"
                                id="address"
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
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            class="btn btn-primary"
                            @click.prevent="addLocation()"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
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
                        (this.state.title = ""),
                            (this.state.phone = ""),
                            (this.state.address = ""),
                            (this.userId = ""),
                            (this.successMessage = ""),
                            (this.v$.title.$errors[0].$message = "");
                        this.v$.address.$errors[0].$message = "";
                        this.v$.phone.$errors[0].$message = "";
                    }, 2000);
                    this.redirectTo({ link: "home" });
                } else {
                    this.redirectTo({ link: "home" });
                }
            }
        },
        ...mapActions(["redirectTo"]),
    },
};
</script>

<style></style>
