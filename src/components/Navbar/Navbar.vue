<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container">
            <a
                href="https://postimages.org/"
                class="logo navbar-brand"
                target="_blank"
                ><img
                    src="https://i.postimg.cc/QCyRWB1P/IMG-20220826-172957-743-removebg-preview.png"
                    alt="IMG-20220826-172957-743-removebg-preview"
                />
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div
                class="collapse navbar-collapse justify-content-end"
                id="navbarNav"
            >
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link
                            exact
                            class="nav-link"
                            :to="{
                                name: 'home',
                                params: { pageTitle: 'Home Page' },
                            }"
                        >
                            <a> Home </a>
                        </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="dropdownId"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Info
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownId">
                            <router-link :to="{ name: 'profile' }">
                                <a href="#" class="dropdown-item">Profile</a>
                            </router-link>
                            <a
                                href="#"
                                class="dropdown-item"
                                @click.prevent="logout()"
                            >
                                logout
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "NavigationBar",
    methods: {
        logout() {
            localStorage.clear();
            this.redirectTo({ link: "login" });
        },
        ...mapActions(["redirectTo"]),
    },
};
</script>

<style scoped lang="scss">
.logo {
    img {
        max-width: 45px;
    }
}
a {
    text-decoration: none;
}
.nav-link.router-link-exact-active,
.nav-link:hover {
    color: var(--main-color);
    font-weight: bold;
}
</style>
