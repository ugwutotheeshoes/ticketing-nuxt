<template>
  <div>
    <nav class="u-flex u-cross-center u-main-space-between u-padding-32">
      <h2 class="logo u-padding-16 eyebrow-heading-1 u-color-text-pink">
        <NuxtLink to="/">PINK CUSTOMER SUPPORT</NuxtLink>
      </h2>
      <NuxtLink to="/requests">
        <span class="button"> SUPPORT REQUESTS</span>
      </NuxtLink>
    </nav>
    <form @submit.prevent="submitForm">
      <h2 class="eyebrow-heading-1 u-text-center u-padding-64">
        write a request
      </h2>
      <div class="u-grid u-cross-center u-main-center u-padding-16">
        <label for="email">Full Name:</label>
        <input
          placeholder="Full Name"
          type="text"
          id="name"
          v-model="name"
          required
        />
        <label for="email">Email:</label>
        <input
          placeholder="Email"
          type="email"
          id="email"
          v-model="email"
          required
        />
        <label for="request">Request:</label>
        <textarea
          class="input-text"
          placeholder="Request"
          cols="100"
          rows="10"
          type="text"
          id="request"
          v-model="request"
          required
        />

        <button class="button" type="submit">
          <span class="text">Submit</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Client, Databases, ID } from "appwrite";

export default {
  data() {
    return {
      name: "",
      email: "",
      request: "",
    };
  },
  methods: {
    async submitForm() {
      const client = new Client();
      const databases = new Databases(client);
      client
        .setEndpoint("OUR_API_ENDPOINT") // Your API Endpoint
        .setProject("OUR_PROJECT_ID"); // Your project ID
      try {
        const response = await databases.createDocument(
          "OUR_DATABASE_ID",
          "OUR_COLLECTION_ID",
          ID.unique(),
          {
            name: this.name,
            email: this.email,
            request: this.request,
            status: "open",
          }
        );
        this.name = "";
        this.email = "";
        this.request = "";
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
