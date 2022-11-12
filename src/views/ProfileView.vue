<template>
    <ProfileForm />
</template>

<script>
import ProfileForm from "@/components/Profile/ProfileForm.vue";
import { mapActions } from "vuex";

export default {
    name: "ProfileView",
    components: {
        ProfileForm,
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (!user) this.redirectTo({ link: "login" });
    },
    methods: {
        ...mapActions(["redirectTo"]),
    },
};
</script>

<style></style>
