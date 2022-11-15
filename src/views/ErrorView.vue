<template>
    <div id="main">
        <div class="fof">
            <h1>Error 404</h1>
            <router-link
                :to="{ name: 'home', params: { pageTitle: 'Home Page' } }"
            >
                <a href="" class="btn">Return To Home Page</a>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "ErrorView",
    mounted() {
        let user = localStorage.getItem("user-info");
        if (!user) {
            this.redirectTo({ link: "login" });
        }
    },
};
</script>

<style>
#main {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
}
.fof h1 {
    font-size: 50px;
    padding-right: 12px;
    animation: type 0.5s alternate infinite;
}

@keyframes type {
    from {
        box-shadow: inset -3px 0px 0px #888;
    }
    to {
        box-shadow: inset -3px 0px 0px transparent;
    }
}
</style>
