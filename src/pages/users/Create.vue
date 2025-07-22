<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <div class="mb-4 sm:mb-0">
              <h1
                class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"
              >
                Add Rider ✨
              </h1>
            </div>
          </div>
          <form class="bg-slate-50 p-2 rounded" @submit.prevent="onSubmit">
            <div class="px-2">
              <div class="grid grid-cols-4 gap-2">
                <div class="col-span-full font-bold text-xl">
                  Personal Information
                </div>
                <div v-for="user in user_data" :key="user.key">
                  <label
                    class="block text-sm font-medium mb-1"
                    :for="user.key"
                    >{{ user.label }}</label
                  >
                  <input
                    :id="user.key"
                    class="w-full rounded-md border-2 border-slate-400 text-slate-900"
                    type="text"
                    :placeholder="user.label"
                    v-model="user.model"
                  />
                </div>
              </div>
              <div class="grid grid-cols-4 gap-2 mt-4">
                <div class="col-span-full font-bold text-xl">
                  Additional Information
                </div>
                <div v-for="user in user_meta_data" :key="user.key">
                  <label
                    class="block text-sm font-medium mb-1"
                    :for="user.key"
                    >{{ user.label }}</label
                  >
                  <input
                    :id="user.key"
                    class="w-full rounded-md border-2 border-slate-400 text-slate-900"
                    type="text"
                    :placeholder="user.label"
                    v-model="user.model"
                  />
                </div>
              </div>
              <h2 class="my-2 text-slate-700 font-bold text-xl">Documents</h2>
              <div class="grid grid-cols-3 gap-2">
                <div v-for="document in documents" :key="document.key">
                  <label
                    class="block text-sm font-medium mb-1"
                    :for="document.key"
                    >{{ document.label }}</label
                  >
                  <input
                    :id="document.key"
                    :accept="document.accept"
                    v-on:change="onFileChange"
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-end mt-6 mx-2 lg:mx-0">
              <router-link
                class="btn bg-red-600 text-white"
                :to="{
                  name: 'riders',
                }"
                >Cancel</router-link
              >
              <button
                class="btn bg-[#2E5945] hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                ref="submit_button"
                type="submit"
              >
                Create Rider
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import Sidebar from "../../partials/Sidebar.vue";
import Header from "../../partials/Header.vue";
import DeleteButton from "../../partials/actions/DeleteButton.vue";
import DateSelect from "../../components/DateSelect.vue";
import FilterButton from "../../components/DropdownFilter.vue";
import CustomersTable from "../../partials/customers/CustomersTable.vue";
import PaginationClassic from "../../components/PaginationClassic.vue";
import PaginationNumeric from "../../components/PaginationNumeric.vue";
import { useRouter } from "vue-router";
import moment from "moment";
import ModalAction from "../../components/ModalAction.vue";
import { useToast } from "vue-toastification";
import { formatValue } from "../../utils/Utils";

export default {
  name: "User",
  components: {
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    CustomersTable,
    PaginationClassic,
    PaginationNumeric,
    ModalAction,
  },
  setup() {
    const toast = useToast();
    const $http = inject("$http");
    const router = useRouter();
    const sidebarOpen = ref(false);

    const user_data = ref([
      {
        key: "name",
        model: "name",
        type: "text",
        label: "Name",
      },
      {
        key: "email",
        model: "email",
        type: "email",
        label: "Email",
      },
      {
        key: "phone_number",
        model: "phone_number",
        type: "tel",
        label: "Phone Number",
      },
      {
        key: "address",
        model: "address",
        type: "text",
        label: "Address",
      },
      {
        key: "postal_code",
        model: "postal_code",
        type: "text",
        label: "Postal Code",
      },
      {
        key: "city",
        model: "city",
        type: "text",
        label: "City",
      },
    ]);

    const user_meta_data = ref([
      {
        key: "id_number",
        model: "id_number",
        type: "number",
        label: "ID Number",
      },
      {
        key: "kra_pin",
        model: "kra_pin",
        type: "text",
        label: "KRA PIN",
      },
    ]);

    const documents = ref([
      {
        key: "License",
        model: "License",
        accept: ".pdf,.jpg",
        label: "License",
      },
      {
        key: "Birth Certificate",
        model: "birth_certificate",
        accept: ".pdf,.jpg",
        label: "Birth Certificate",
      },
      {
        key: "ID (Front)",
        model: "id_front",
        accept: ".jpg",
        label: "ID Front",
      },
      {
        key: "ID (Back)",
        key: "id_back",
        accept: ".jpg",
        label: "ID Back",
      },
      {
        key: "Passport Photo",
        model: "passport",
        accept: ".jog,.png",
        label: "Passport Photo",
      },
    ]);

    const partners = ref([]);

    const getPartners = async () => {
      await $http.get("/restaurants").then((res) => {
        partners.value = res.data;
      });
    };

    onMounted(() => {
      getPartners();
    });

    const formData = new FormData();

    const rider_files = [];
    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      // console.log(e.target.id)
      rider_files.push({
        file_name: e.target.id,
        file: files[0],
      });
    };

    const onSubmit = async () => {
      user_data.value.forEach((userData) => {
        formData.append(userData.key, userData.model);
      });
      user_meta_data.value.forEach((userData) => {
        formData.append(userData.key, userData.model);
      });

      rider_files.forEach((fileData) => {
        formData.append(`files[${fileData.file_name}]`, fileData.file);
      });

      await $http
        .post("/admin/rider/store", formData)
        .then((res) => {
          toast.success(res.data.message);
          router.push({ name: "riders" });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    };

    return {
      moment,
      formatValue,
      sidebarOpen,

      user_data,
      user_meta_data,
      documents,
      partners,

      onSubmit,
      onFileChange,
    };
  },
};
</script>
<style scoped>
.m_upper::first-letter {
  text-transform: uppercase;
}
</style>
