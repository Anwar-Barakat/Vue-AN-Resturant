<template>
    <NavigationBar />
    <section class="form-container">
        <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
            v-if="showMessage"
        >
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
            {{ showMessage }}
        </div>
        <h3>Update Profile</h3>
        <form>
            <div class="box">
                <input
                    type="text"
                    placeholder="type your name"
                    maxlength="20"
                    v-model="name"
                />
                <small
                    class="text text-danger text-bold fw-bold"
                    v-if="v$.name.$error"
                >
                    {{ v$.name.$errors[0].$message }}
                </small>
            </div>
            <div class="box">
                <input
                    type="email"
                    placeholder="type your email"
                    maxlength="50"
                    v-model="email"
                />
                <small
                    class="text text-danger text-bold fw-bold"
                    v-if="v$.email.$error"
                >
                    {{ v$.email.$errors[0].$message }}
                </small>
            </div>
            <div class="box">
                <input
                    type="password"
                    placeholder="type your password"
                    maxlength="20"
                    v-model="password"
                />
                <small
                    class="text text-danger text-bold fw-bold"
                    v-if="v$.password.$error"
                >
                    {{ v$.password.$errors[0].$message }}
                </small>
            </div>
            <div class="row">
                <div class="form-group">
                    <button
                        type="submit"
                        class="btn"
                        @click.prevent="updateProfile()"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import NavigationBar from "@/components/Navbar/Navbar.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
import { mapActions } from "vuex";

export default {
    name: "ProfileForm",
    data() {
        return {
            v$: useVuelidate(),
            id: "",
            name: "",
            email: "",
            password: "",
            showMessage: "",
        };
    },
    validations() {
        return {
            name: { required, minLength: minLength(3) },
            email: { required, email },
            password: { required, minLength: minLength(8) },
        };
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (user) {
            this.id = JSON.parse(user).id;
            this.name = JSON.parse(user).name;
            this.email = JSON.parse(user).email;
            this.password = JSON.parse(user).password;
        } else {
            this.redirectTo({ link: "home" });
        }
    },
    components: {
        NavigationBar,
    },
    methods: {
        async updateProfile() {
            this.v$.$validate();
            if (!this.v$.$error) {
                let result = await axios.put(
                    `http://localhost:3000/users/${this.id}`,
                    {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    }
                );
                if (result.status == 200) {
                    localStorage.setItem(
                        "user-info",
                        JSON.stringify(result.data)
                    );
                    this.showMessage = "Profile Has Been Updated Successfully";
                }
            }
        },
        ...mapActions(["redirectTo"]),
    },
};
</script>

<style></style>
