<template>
    <!-- Button trigger modal -->
    <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
    >
        Add New Restaurant
    </button>

    <!-- Modal -->
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Restaurant Location
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group mb-3 text-start">
                            <label for="title">Title</label>
                            <input
                                class="form-control"
                                type="text"
                                id="title"
                                placeholder="Restaurant Title"
                                v-model.trim="title"
                            />
                        </div>
                        <div class="form-group mb-3 text-start">
                            <label for="phone">Phone</label>
                            <input
                                class="form-control"
                                type="tel"
                                id="phone"
                                placeholder="Restaurant Phone"
                                v-model.trim="phone"
                            />
                        </div>
                        <div class="form-group mb-3 text-start">
                            <label for="address"> Address </label>
                            <input
                                class="form-control"
                                type="text"
                                id="address"
                                placeholder="Restaurant Address"
                                v-model.trim="address"
                            />
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddNewLocation",
    data() {
        return {
            title: "",
            phone: "",
            address: "",
        };
    },
};
</script>

<style></style>
