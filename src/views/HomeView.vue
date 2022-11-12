<template>
    <NavigationBar />
</template>

<script>
import { mapActions } from "vuex";
import NavigationBar from "@/components/Navbar/Navbar.vue";
export default {
    name: "HomeView",
    data() {
        return {
            name: "",
        };
    },
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
