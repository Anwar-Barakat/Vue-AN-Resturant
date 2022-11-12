<template>
    <NavigationBar />
    <div class="home"></div>
</template>

<script>
import { mapActions } from "vuex";
import NavigationBar from "@/components/Navbar/Navbar.vue";
export default {
    name: "HomeView",
    mounted() {
        let user = localStorage.getItem("user-info");
        if (!user) this.redirectTo({ link: "register" });
    },
    methods: {
        ...mapActions(["redirectTo"]),
    },
    components: {
        NavigationBar,
    },
};
</script>
