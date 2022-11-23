<template>
    <NavigationBar />
    <section class="form-container">
        <div
            class="alert alert-info alert-dismissible fade show"
            role="alert"
            v-if="successMessage"
        >
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
            {{ successMessage }}
        </div>
        <h3>Delete "{{ title }}" restaurant ?</h3>
        <form @click.prevent="">
            <div class="box d-flex justify-content-center gap-2">
                <button
                    type="submit"
                    class="btn btn-secondary"
                    @click="goback()"
                >
                    Go Back
                </button>
                <button
                    type="submit"
                    class="btn btn-primary"
                    @click="removeLocation()"
                >
                    Delete
                </button>
            </div>
        </form>
    </section>
</template>

<script>
import NavigationBar from "@/components/Navbar/Navbar.vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
    name: "DeleteLocation",
    data() {
        return {
            title: "",
            address: "",
            phone: "",
            userId: "",
            deleteLocation: "",
            successMessage: "",
        };
    },
    components: { NavigationBar },
    params: ["locationId"],
    mounted() {
        let user = localStorage.getItem("user-info");
        if (!user) {
            this.redirectTo({ link: "login" });
        } else {
            this.userId = JSON.parse(user).id;
            this.deleteLocation = this.$route.params.locationId;
            this.userAccessLocation();
        }
    },
    methods: {
        goback() {
            this.redirectTo({ link: "home" });
        },
        async userAccessLocation() {
            let result = await axios.get(
                `http://localhost:3000/locations?id=${this.deleteLocation}&userId=${this.userId}`
            );
            if (result.status == 200 && result.data.length > 0) {
                this.title = result.data[0].title;
            } else {
                this.redirectTo({ link: "home" });
            }
        },
        async removeLocation() {
            let result = await axios.delete(
                `http://localhost:3000/locations/${this.deleteLocation}`
            );
            if (result.status == 200) {
                this.successMessage = "Location Has Been Deleted Successfully";
                setTimeout(() => {
                    this.redirectTo({ link: "home" });
                }, 2000);
            } else {
                this.redirectTo({ link: "home" });
            }
        },
        ...mapActions(["redirectTo"]),
    },
};
</script>

<style></style>
