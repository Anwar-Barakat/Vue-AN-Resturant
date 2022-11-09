<template>
    <section class="form-container">
        <h3>register now</h3>
        <form action="" method="post">
            <div class="box">
                <input
                    type="text"
                    name="name"
                    placeholder="type your name"
                    maxlength="20"
                    required
                    v-model="name"
                />
            </div>
            <div class="box">
                <input
                    type="email"
                    name="email"
                    placeholder="type your email"
                    maxlength="50"
                    oninput="this.value = this.value.replace(/\s/g, '')"
                    required
                    v-model="email"
                />
            </div>
            <div class="box">
                <input
                    type="password"
                    name="password"
                    placeholder="type your password"
                    maxlength="20"
                    oninput="this.value = this.value.replace(/\s/g, '')"
                    required
                    v-model="password"
                />
            </div>
            <div class="row">
                <p>
                    You have an account ?
                    <a href="" @click.prevent="redirectTo({ link: 'login' })">
                        here
                    </a>
                </p>
            </div>
            <div class="row">
                <div class="form-group">
                    <button type="submit" class="btn" @click="register()">
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
export default {
    name: "RegisterForm",
    data() {
        return {
            name: "",
            password: "",
            email: "",
        };
    },
    methods: {
        ...mapActions(["redirectTo"]),
    },
};
</script>

<style></style>
