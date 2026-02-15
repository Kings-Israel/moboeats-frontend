<template>
  <main class="bg-white dark:bg-slate-900">
    <div class="flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1 bg-white">
          <div
            class="max-w-sm mx-auto w-full px-4 py-8 rounded-md bg-jh-red-700 lg:mt-44"
          >
            <h1 class="text-3xl text-slate-200 font-bold mb-6">
              Welcome back! ✨
            </h1>
            <!-- Form -->
            <form @submit.prevent="login()">
              <div class="space-y-4">
                <div>
                  <label
                    class="block text-sm font-medium mb-1 text-white"
                    for="email"
                    >Email Address</label
                  >
                  <input
                    id="email"
                    class="form-input w-full"
                    type="email"
                    v-model="email"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium mb-1 text-white"
                    for="password"
                    >Password</label
                  >
                  <input
                    id="password"
                    class="form-input w-full"
                    type="password"
                    autoComplete="on"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="flex items-center justify-between mt-6">
                <div class="mr-1">
                  <router-link
                    class="text-sm underline hover:no-underline hidden"
                    to="/reset-password"
                    >Forgot Password?</router-link
                  >
                </div>
                <button
                  class="btn bg-black hover:bg-jh-red-700 text-white ml-3"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div
        class="hidden md:block md:mt-36 lg:mt-72 bg-white"
        aria-hidden="true"
      >
        <img
          src="../images/javahouse.png"
          class="w-[40rem] object-contain rounded-lg"
          alt=""
        />
      </div>
    </div>
  </main>
</template>

<script>
import { ref, inject } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  name: "Signin",
  setup() {
    const $http = inject("$http");
    const router = useRouter();
    const toast = useToast();
    const email = ref("");
    const password = ref("");

    const login = () => {
      $http
        .post("/admin/login", {
          email: email.value,
          password: password.value,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", response.data.data.role);
          localStorage.setItem(
            "permissions",
            JSON.stringify(response.data.data.permissions)
          );
          // if (response.data.data.role == 'supplements-admin') {
          //   router.push('/supplements')
          // } else {
          // }
          router.push({ name: "dashboard" });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };

    return {
      login,
      email,
      password,
    };
  },
};
</script>
