<template>
  <div
    id="messages-sidebar"
    class="absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transition-transform duration-200 ease-in-out"
    :class="msgSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="sticky top-16 bg-white dark:bg-slate-900 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 dark:border-slate-700 md:w-72 xl:w-80 h-[calc(100dvh-64px)]">

      <div>
        <!-- Group body -->
        <div class="px-5 py-4">
          <!-- Search form -->
          <form class="relative">
            <label for="msg-search" class="sr-only">Search</label>
            <input id="msg-search" class="form-input w-full pl-9 bg-white dark:bg-slate-800" type="search" placeholder="Search…" v-model="searchContacts" />
            <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
              <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </form>
          <!-- Direct messages -->
          <!-- <DirectMessages :msgSidebarOpen="msgSidebarOpen" @close-msgsidebar="$emit('close-msgsidebar')" /> -->
          <div class="mt-4">
            <ul class="mb-6">
              <li class="-mx-2" v-for="conversation in conversations" :key="conversation.id">
                <template v-for="participant in conversation.participants" :key="participant.id">
                  <button v-if="participant.messageable_id != auth_id" class="flex items-center justify-between w-full p-2 rounded hover:bg-indigo-500/20 transition duration-200 ease-in-out"
                    :class="active_conversation == conversation.id ? 'bg-indigo-500/30' : ''" 
                    @click.stop="$emit('close-msgsidebar')"
                    @click="$emit('activate-conversation', conversation.id, participant); active_conversation = conversation.id;"
                  >
                    <div class="flex items-center truncate">
                      <img class="w-8 h-8 rounded-full mr-2" :src="participant.messageable.avatar" width="32" height="32" alt="User 01" />
                      <div class="truncate">
                        <span class="text-sm font-medium text-slate-800 dark:text-slate-100">{{ participant.messageable.name }}</span>
                      </div>
                      <div v-if="participant.is_admin">(Admin)</div>
                    </div>
                    <div v-if="conversation.unread_count > 0" class="flex items-center ml-2">
                      <div class="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2">{{ conversation.unread_count }}</div>
                    </div>
                  </button>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, inject } from 'vue'
import ChannelMenu from './ChannelMenu.vue'
import DirectMessages from './DirectMessages.vue'
import Channels from './Channels.vue'
import moment from 'moment'

export default {
  name: 'MessagesSidebar',
  props: ['msgSidebarOpen', 'activateConversation'],
  components: {
    ChannelMenu,
    DirectMessages,
    Channels
  },
  setup(props) {
    const $http = inject('$http')
    const sidebarOpen = ref(false)
    const msgSidebarOpen = ref(true)
    const contentArea = ref(null)
    const conversations = ref([])
    const const_conversations = ref([])
    const active_conversation = ref('')
    const conversation_log = ref([])
    const auth_id = ref('')
    const receiver = ref(null)
    const searchContacts = ref('')
    const refChatLogPS = ref('')
    const messagesSidebar = ref('')
    const conversation_ids = ref([])

    const getConversations = async () => {
      let new_conversations
      new_conversations = await $http.get('/conversations')
      conversations.value = new_conversations.data.data.conversations
      const_conversations.value = new_conversations.data.data.conversations
      const_conversations.value.forEach(conversation => {
        conversation_ids.value.push(conversation.id)
      })
      auth_id.value = new_conversations.data.data.user_id
    }

    onMounted(() => {
      getConversations()
    })

    watch(searchContacts, (newQuery, oldQuery) => {
      let new_conversations = []
      if (conversations.value.length > 0 && newQuery.length > 0) {
        new_conversations = conversations.value.filter(conversation => {
            return conversation.participants.find(participant => {
              return participant.messageable.name.toLowerCase().includes(newQuery.toLowerCase())
            })
        })
      } else if (newQuery.length == 0) {
        new_conversations = const_conversations.value
      }
      conversations.value = new_conversations
    })

    return {
      moment,
      auth_id,
      active_conversation,
      conversations,
      searchContacts,
    }
  }
}
</script>