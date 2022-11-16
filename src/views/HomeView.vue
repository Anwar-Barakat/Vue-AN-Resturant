<template>
    <NavigationBar />
    <div class="container">
        <UserLocations :locations="this.listOfLocations" />
    </div>
</template>

<script>
import { mapActions } from "vuex";
import NavigationBar from "@/components/Navbar/Navbar.vue";
import UserLocations from "@/components/Locations/UserLocations.vue";
import axios from "axios";
export default {
    name: "HomeView",
    data() {
        return {
            name: "",
            userId: "",
            listOfLocations: [],
        };
    },
    async mounted() {
        let user = localStorage.getItem("user-info");
        if (!user) this.redirectTo({ link: "register" });
        else {
            this.userId = JSON.parse(user).id;
            let result = await axios.get(
                `http://localhost:3000/locations?userId=${this.userId}`
            );
            if (result.status == 200) {
                console.log(result.data);
                this.listOfLocations = result.data;
            }
        }
    },
    methods: {
        ...mapActions(["redirectTo"]),
    },
    components: {
        NavigationBar,
        UserLocations,
    },
};
</script>
