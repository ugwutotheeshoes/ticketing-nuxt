<template>
  <main>
    <nav class="u-flex u-cross-center u-main-space-between u-padding-32">
      <h2 class="logo u-padding-16 eyebrow-heading-1 u-color-text-pink">
        <NuxtLink to="/">PINK CUSTOMER SUPPORT</NuxtLink>
      </h2>
      <NuxtLink to="/">
        <span class="button"> GO BACK HOME </span>
      </NuxtLink>
    </nav>
    <div class="container">
      <h2 class="eyebrow-heading-1 u-text-center u-padding-64">
        support requests
      </h2>
      <ul class="list">
        <li class="box" v-for="doc in docs" :key="doc.$id">
          <div class="u-flex u-cross-center u-main-space-between">
            <div class="u-grid">
              <div class="u-flex u-cross-center u-main-space-between">
                <span class="text eyebrow-heading-1"> {{ doc.name }} </span>
                <div class="tag">
                  <span class="icon-check-circle" aria-hidden="true"></span>
                  <span class="text">{{ doc.status }}</span>
                </div>
              </div>
              <span class="text">{{ doc.request.slice(0, 200) }}</span>
            </div>
            <NuxtLink :to="`/request/${doc.$id}`">
              <span
                class="name button icon-cheveron-right"
                aria-hidden="true"
              ></span>
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import { FetchDocuments } from "@/components/FetchDocuments.js";
import { Client, Databases } from "appwrite";
import "@/app.css";
export default {
  data() {
    return {
      docs: [],
    };
  },
  async mounted() {
    const client = new Client();
    const databases = new Databases(client);
    client
      .setEndpoint("OUR_API_ENDPOINT") // Your API Endpoint
      .setProject("OUR_PROJECT_ID"); // Your project ID
    // export const
    const response = await databases.listDocuments(
      "OUR_DATABASE_ID",
      "OUR_COLLECTION_ID"
    );
    console.log(response);
    const data = response.documents.slice().reverse();
    // Filter the data array and push values that serve as the beginning of a support request to the docs variable
    data.filter((item) => {
      if (item.email !== null) {
        this.docs.push(item);
      }
    });
  },
};
</script>
