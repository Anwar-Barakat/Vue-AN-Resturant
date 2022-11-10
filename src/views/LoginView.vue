<template>
    <div class="container">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from "@/components/Login/LoginForm.vue";
import { mapActions } from "vuex";

export default {
    name: "LoginView",
    components: {
        LoginForm,
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (user) this.redirectTo({ link: "home" });
    },
    methods: {
        ...mapActions(["redirectTo"]),
    },
};
</script>

<style></style>
