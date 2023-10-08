<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <!-- <img class="w-8 h-8 rounded-full" :src="UserAvatar" width="32" height="32" alt="User" /> -->
      <div class="flex items-center truncate">
        <span class="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{{ user.name }}</span>
        <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </div>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1" :class="align === 'right' ? 'right-0' : 'left-0'">
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <li>
            <span class="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3" @click="logout">Sign Out</span>
          </li>
        </ul>
      </div> 
    </transition>
  </div>
</template>

<script>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import UserAvatar from '../images/user-avatar-32.png'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  name: 'DropdownProfile',
  props: ['align'],
  data() {
    return {
      UserAvatar: UserAvatar,
    }
  },  
  setup() {
    const http = inject('$http')
    const router = useRouter()
    const toast = useToast()
    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)

    const user = JSON.parse(localStorage.getItem("user"))

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
      dropdownOpen.value = false
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    const logout = () => {
      http.post('/logout')
        .then(response => {
          console.log(response)
          router.push({ name: 'auth-login' })
        })
        .catch(error => {
          toast.error(error.response.data.data)
        })
    }

    return {
      dropdownOpen,
      trigger,
      dropdown,
      user,
      logout
    }
  }
}
</script>