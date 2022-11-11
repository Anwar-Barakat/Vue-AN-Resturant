<template>
    <div class="home"></div>
</template>

<script>
import { mapActions } from "vuex";
// @ is an alias to /src

export default {
    name: "HomeView",
    mounted() {
        let user = localStorage.getItem("user-info");
        if (!user) this.redirectTo({ link: "register" });
    },
    methods: {
        ...mapActions(["redirectTo"]),
    },
};
</script>
