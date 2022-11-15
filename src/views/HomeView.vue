<template>
    <NavigationBar />
    <AddNewLocation />
</template>

<script>
import { mapActions } from "vuex";
import NavigationBar from "@/components/Navbar/Navbar.vue";
import AddNewLocation from "@/components/Locations/AddNewLocation.vue";
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
        AddNewLocation,
    },
};
</script>
