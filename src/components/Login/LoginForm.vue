<template>
    <section class="form-container">
        <h3>login now</h3>
        <form action="" method="post">
            <div class="box">
                <input
                    type="email"
                    name="email"
                    placeholder="type your email"
                    maxlength="50"
                    oninput="this.value = this.value.replace(/\s/g, '')"
                    required
                />
            </div>
            <div class="box">
                <input
                    type="password"
                    name="password"
                    placeholder="type your password"
                    maxlength="50"
                    oninput="this.value = this.value.replace(/\s/g, '')"
                    required
                />
            </div>
            <div class="row">
                <p>
                    Don't have an account ?
                    <a
                        href=""
                        @click.prevent="redirectTo({ link: 'register' })"
                    >
                        here
                    </a>
                </p>
            </div>
            <div class="row">
                <div class="form-group">
                    <button type="submit" class="btn">sign in</button>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "LoginForm",
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
