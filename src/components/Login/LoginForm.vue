<template>
    <section class="form-container">
        <div
            class="alert alert-danger alert-dismissible fade show"
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
        <h3>login now</h3>
        <form>
            <div class="box">
                <input
                    type="email"
                    placeholder="type your email"
                    maxlength="50"
                    v-model="state.email"
                />
                <small
                    class="text text-danger text-bold fw-bold"
                    v-if="v$.email.$error"
                    >{{ v$.email.$errors.$message }}</small
                >
            </div>
            <div class="box">
                <input
                    type="password"
                    placeholder="type your password"
                    maxlength="50"
                    v-model="state.password"
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
                    Don't have an account ?
                    <a
                        href=""
                        @click.prevent="redirectTo({ link: 'register' })"
                        class="link"
                    >
                        here
                    </a>
                </p>
            </div>
            <div class="row">
                <div class="form-group">
                    <button type="submit" class="btn" @click.prevent="login()">
                        sign in
                    </button>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
    name: "LoginForm",
    setup() {
        const state = reactive({
            password: "",
            email: "",
        });
        const rules = computed(() => {
            return {
                email: { required, email },
                password: { required, minLength: minLength(8) },
            };
        });
        const v$ = useValidate(rules, state);
        return {
            state,
            v$,
        };
    },
    data() {
        return {
            showMessage: "",
        };
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (user) this.redirectTo({ link: "home" });
    },
    methods: {
        async login() {
            this.v$.$validate();
            if (!this.v$.$error) {
                let result = await axios.get(
                    `http://localhost:3000/users?email=${this.state.email}&password=${this.state.password}`
                );
                if (result.status == 200 && result.data.length > 0) {
                    localStorage.setItem(
                        "user-info",
                        JSON.stringify(result.data)
                    );
                    this.redirectTo({ link: "home" });
                } else {
                    this.showMessage = "User not found";
                }
            }
        },
        ...mapActions(["redirectTo"]),
    },
};
</script>
