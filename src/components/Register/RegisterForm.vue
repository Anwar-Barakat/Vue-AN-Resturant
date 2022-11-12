<template>
    <section class="form-container">
        <h3>register now</h3>
        <form>
            <div class="box">
                <input
                    type="text"
                    placeholder="type your name"
                    maxlength="20"
                    v-model.trim="name"
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
                    v-model.trim="email"
                />
                <small
                    class="text text-danger text-bold fw-bold"
                    v-if="v$.email.$error"
                    >{{ v$.email.$errors[0].$message }}</small
                >
            </div>
            <div class="box">
                <input
                    type="password"
                    placeholder="type your password"
                    maxlength="20"
                    v-model.trim="password"
                />
                <small
                    class="text text-danger text-bold fw-bold"
                    v-if="v$.password.$error"
                >
                    {{ v$.password.$errors[0].$message }}
                </small>
            </div>
            <div class="row">
                <p>
                    You have an account ?
                    <a
                        href=""
                        class="link"
                        @click.prevent="redirectTo({ link: 'login' })"
                    >
                        here
                    </a>
                </p>
            </div>
            <div class="row">
                <div class="form-group">
                    <button
                        type="submit"
                        class="btn"
                        @click.prevent="register()"
                    >
                        Register
                    </button>
                </div>
            </div>
        </form>
    </section>
</template>

<style lang="scss" scoped></style>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
    name: "RegisterForm",
    data() {
        return {
            v$: useValidate(),
            name: "",
            password: "",
            email: "",
        };
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (user) this.redirectTo({ link: "home" });
    },
    methods: {
        async register() {
            this.v$.$validate();
            if (!this.v$.$error) {
                let result = await axios.post("http://localhost:3000/users", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                console.log("User added Successfully");
                if (result.status == 201) {
                    // save data in local storage
                    localStorage.setItem(
                        "user-info",
                        JSON.stringify(result.data)
                    );

                    // redirect
                    this.redirectTo({ link: "home" });
                } else console.log("User added Failed");
            }
        },
        ...mapActions(["redirectTo"]),
    },
    validations() {
        return {
            name: { required, minLength: minLength(3) },
            email: { required, email },
            password: { required, minLength: minLength(8) },
        };
    },
};
</script>

<style></style>
