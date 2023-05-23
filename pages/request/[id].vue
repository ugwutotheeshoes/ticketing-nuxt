<template>
  <main>
    <nav class="u-flex u-cross-center u-main-space-between u-padding-32">
      <h2 class="logo u-padding-32 eyebrow-heading-1 u-color-text-pink">
        <NuxtLink to="/">PINK CUSTOMER SUPPORT</NuxtLink>
      </h2>
      <NuxtLink to="/requests">
        <span class="button"> GO BACK TO REQUESTS </span>
      </NuxtLink>
    </nav>
    <div>
      <h2 class="eyebrow-heading-1 u-text-left u-padding-32">
        CUSTOMER: {{ customer.name }}
      </h2>
      <ul class="list">
        <li v-for="doc in docs" :key="doc.$id">
          <div class="u-flex u-cross-center u-main-space-between">
            <h2 class="u-x-small u-bold u-text-right u-margin-inline-start-32">
              {{ new Date(doc.$createdAt) }}
            </h2>
          </div>
          <div class="u-grid">
            <p class="text u-normal u-text-right u-padding-32">
              {{ doc.request }}
            </p>
          </div>
        </li>
      </ul>
      <form @submit.prevent="updateForm">
        <div class="u-grid u-cross-center u-main-center u-padding-32">
          <label for="request">Comment:</label>
          <textarea
            class="input-text"
            placeholder="Comment"
            cols="100"
            type="text"
            id="request"
            v-model="request"
            required
          />
          <button class="button" type="submit">
            <span class="text">Add Comment</span>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
// import SingleRequest from "@/components/SingleRequestPage";
import { useRouter, useRoute } from "vue-router";
import { Client, Databases, ID } from "appwrite";
import { FetchDocuments } from "@/components/FetchDocuments";
export default {
  //   components: {
  //     SingleRequest,
  //   },
  data() {
    const router = useRouter();
    const isIdMatch = router.currentRoute.value.params.id;
    return {
      requestId: isIdMatch,
      request: "",
      docs: [],
      customer: [],
    };
  },
  async mounted() {
    const client = new Client();
    const databases = new Databases(client);
    client
      .setEndpoint("OUR_API_ENDPOINT") // Your API Endpoint
      .setProject("OUR_PROJECT_ID"); // Your project ID
    // Instance to fetch a customer's name
    const singleDocument = await databases.getDocument(
      "OUR_DATABASE_ID",
      "OUR_COLLECTION_ID",
      `${this.requestId}`
    );
    this.customer = singleDocument;
    const comments = await FetchDocuments;
    const MatchComments = comments.documents;
    MatchComments.filter((item) => {
      if (item.name === this.requestId || item.$id === this.requestId) {
        this.docs.push(item);
      }
    });
  },
  methods: {
    async updateForm() {
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
            request: this.request,
            email: null,
            name: this.requestId,
          }
        );
        this.docs.push(response);
        this.request = "";
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
