<template>
    <h1 class="text-center">User Locations</h1>
    <table
        class="table table-striped table-hover caption-top shadow-sm responsive"
        v-if="locations.length > 0"
    >
        <caption>
            List of Locations ({{
                locations.length
            }})
        </caption>
        <thead class="table-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(location, index) in locations" :key="index">
                <th scope="row">{{ location.id }}</th>
                <td>{{ location.title }}</td>
                <td>{{ location.phone }}</td>
                <td>{{ location.address }}</td>
                <td>
                    <router-link
                        :to="{
                            name: 'locations.delete',
                            params: { locationId: location.id },
                        }"
                    >
                        <button class="btn-sm btn-danger text text-danger">
                            <FontAwesome icon="trash" />
                        </button>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="alert alert-warning" v-else>No Locations Added</div>
    <router-link
        :to="{ name: 'locations.add', params: { pageTitle: 'Add Location' } }"
        class="d-flex fit-content"
    >
        <button type="button" class="btn btn-primary">Add Location</button>
    </router-link>
</template>

<script>
export default {
    name: "UserLocations",
    props: ["locations"],
};
</script>

<style></style>
