<template>
    <section class="form-container">
        <h3>register now</h3>
        <form>
            <div class="box">
                <input
                    type="text"
                    placeholder="type your name"
                    maxlength="20"
                    v-model="name"
                />
                <span
                    class="block mt-1 text-red-600 font-semibold text-sm"
                    v-if="v$.name.$error"
                    >{{ v$.name.$errors[0].$message }}</span
                >
            </div>
            <div class="box">
                <input
                    type="email"
                    placeholder="type your email"
                    maxlength="50"
                    v-model="email"
                />
                <span
                    class="block mt-1 text-red-600 font-semibold text-sm"
                    v-if="v$.email.$error"
                    >{{ v$.email.$errors[0].$message }}</span
                >
            </div>
            <div class="box">
                <input
                    type="password"
                    placeholder="type your password"
                    maxlength="20"
                    v-model="password"
                />
                <span
                    class="block mt-1 text-red-600 font-semibold text-sm"
                    v-if="v$.password.$error"
                >
                    {{ v$.password.$errors[0].$message }}
                </span>
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
import { mapActions } from "vuex";
import axios from "axios";
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
    methods: {
        async register() {
            this.v$.$validate();
            if (!this.v$.$error) {
                let result = await axios.post("http://localhost:3000/users", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                if (result.status == 201) {
                    // save data in local storage
                    localStorage.setItem(
                        "user-info",
                        JSON.stringify(result.data)
                    );

                    // redirect
                    this.redirectTo({ link: "home" });
                    console.log("User added Successfully");
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
