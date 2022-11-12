<template>
    <NavigationBar />
    <section class="form-container">
        <h3>Update Profile</h3>
        <form>
            <div class="box">
                <input
                    type="text"
                    placeholder="type your name"
                    maxlength="20"
                />
            </div>
            <div class="box">
                <input
                    type="email"
                    placeholder="type your email"
                    maxlength="50"
                />
            </div>
            <div class="box">
                <input
                    type="password"
                    placeholder="type your password"
                    maxlength="20"
                />
            </div>
            <div class="row">
                <div class="form-group">
                    <button
                        type="submit"
                        class="btn"
                        @click.prevent="updateProfile()"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import NavigationBar from "@/components/Navbar/Navbar.vue";

export default {
    name: "ProfileForm",
    data() {
        return {
            name: "",
            email: "",
            password: "",
        };
    },
    components: {
        NavigationBar,
    },
    methods: {
        updateProfile() {},
    },
};
</script>

<style></style>
