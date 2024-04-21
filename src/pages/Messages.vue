<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div ref="contentArea" class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="relative flex h-full">

          <!-- Messages sidebar -->
          <MessagesSidebar :msgSidebarOpen="msgSidebarOpen" @close-msgsidebar="msgSidebarOpen = false" @activateConversation="getConversation" />

          <!-- Messages body -->
          <div class="grow flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out" :class="msgSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'">
            <MessagesHeader :msgSidebarOpen="msgSidebarOpen" @toggle-msgsidebar="msgSidebarOpen = !msgSidebarOpen" :receiverData="receiver" />
            <MessagesBody :conversationLog="conversation_log" :receiverData="receiver" />
            <MessagesFooter @sendMessage="sendMessage" :receiverData="receiver" />
          </div>
          
        </div>
      </main>

    </div> 

  </div>
</template>

<script>
import moment from 'moment'
import { ref, onMounted, watch, inject } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import MessagesSidebar from '../partials/messages/MessagesSidebar.vue'
import MessagesHeader from '../partials/messages/MessagesHeader.vue'
import MessagesBody from '../partials/messages/MessagesBody.vue'
import MessagesFooter from '../partials/messages/MessagesFooter.vue'

export default {
  name: 'Messages',
  components: {
    Sidebar,
    Header,
    MessagesSidebar,
    MessagesHeader,
    MessagesBody,
    MessagesFooter,
  }, 
  setup() {
    const $http = inject('$http')
    const echo = inject('echo')
    const sidebarOpen = ref(false)
    const msgSidebarOpen = ref(true)
    const contentArea = ref(null)
    const conversations = ref([])
    const const_conversations = ref([])
    const active_conversation = ref('')
    const conversation_log = ref([])
    const auth_id = ref('')
    const receiver = ref(null)
    const files = ref([])
    const searchContacts = ref('')
    const refChatLogPS = ref('')
    const messagesSidebar = ref('')
    const refMessageTextInput = ref('')
    const refMessageText = ref('')
    const messagesBox = ref('')
    const docsInput = ref('')
    const conversation_ids = ref([])

    const handleScroll = (top = true) => {
      contentArea.value.scrollTop = top ? 0 : 99999999
    }

    const getConversation = async (id, receiver_data) => {
      active_conversation.value = id
      const response = await $http.get('/conversations/'+id)
      receiver.value = receiver_data
      if (response.data.data.data.length > 0) {
        conversation_log.value = response.data.data.data
        // nextTick(() => {
        //   var container = refChatLogPS.value
        //   container.scrollTop = container.scrollHeight;
        //   if (window.innerWidth < 1536) {
        //     messagesSidebar.value.classList.add('hidden')
        //     messagesBox.value.classList.remove('hidden')
        //   }
        //   refMessageTextInput.value.focus()
        //   if (conversation_ids.value[id]) {
        //     conversation_ids.value[id].classList.add('hidden');
        //   }
        // })
      }
    }

    const uploadFile = () => {
      docsInput.value.click()
    }

    const uploadFiles = (e) => {
      files.value = e.target.files
    }

    const downloadFile = (file) => {
      $http.get(file.file_url, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: file.file_type });
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = file.file_name
          link.click()
          URL.revokeObjectURL(link.href)
        })
        .catch(console.error)
    }

    const formatBytes = (bytes, decimals = 2) => {
      if (!+bytes) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    const sendMessage = async (text) => {
      const formData = new FormData()
      // formData.append('conversation_id', active_conversation.value)
      formData.append('message', text)
      // // Read selected files
      // Array.from(files.value).forEach((file, index) => {
      //   formData.append('files['+index+']', file)
      // })
      const response = await $http.post('/conversation/'+active_conversation.value+'/reply', formData)
      console.log(response.data.data)
      conversation_log.value.push(response.data.data.data)
      files.value = []
      // nextTick(() => {
      //   var container = refChatLogPS.value
      //   container.scrollTop = container.scrollHeight;
      //   if (window.innerWidth < 1536) {
      //     messagesSidebar.value.classList.add('hidden')
      //     messagesBox.value.classList.remove('hidden')
      //   }
      // })
    }

    onMounted(() => {
      handleScroll()
      const email = JSON.parse(localStorage.getItem('user')).email
      echo
        .channel(email)
        .listen('.new.message', (e) => {
            if (active_conversation.value && (e.message.conversation_id === active_conversation.value)) {
              conversation_log.value.push(e.message)
              nextTick(() => {
                var container = refChatLogPS.value
                container.scrollTop = container.scrollHeight;
              })
            } else {
                // Check if conversation exists
                let index = conversations.value.findIndex(conversation => conversation.id === e.conversation.id)
                if (index >= 0) {
                  conversations.value.forEach((conversation, key) => {
                    if (conversation.id === e.conversation.id) {
                      conversations.value.splice(key, 1)
                      conversations.value.unshift(e.conversation)
                    }
                  })
                } else {
                  // If Conversation does not exist, create new and add to list of conversations
                  conversations.value.unshift(e.conversation)
                }
            }
        });
    })

    watch(msgSidebarOpen, () => {
      msgSidebarOpen.value ? handleScroll() : handleScroll(false)
    })
    
    watch(searchContacts, (newQuery, oldQuery) => {
      let new_conversations = []
      if (conversations.value.length > 0 && newQuery.length > 0) {
        new_conversations = conversations.value.filter(conversation => {
          return conversation.participants.find(participant => {
            return participant.messageable.first_name.toLowerCase().includes(newQuery.toLowerCase()) || participant.messageable.last_name.toLowerCase().includes(newQuery.toLowerCase())
          })
        })
      } else if (newQuery.length == 0) {
        new_conversations = const_conversations.value
      }
      conversations.value = new_conversations
    })

    return {
      sidebarOpen,
      msgSidebarOpen,
      contentArea,
      refChatLogPS,
      messagesSidebar,
      messagesBox,
      refMessageTextInput,
      refMessageText,
      docsInput,

      conversations,
      const_conversations,
      active_conversation,
      conversation_log,
      auth_id,
      receiver,
      files,
      searchContacts,

      getConversation,
      sendMessage,
      uploadFile,
      uploadFiles,
      downloadFile,
      formatBytes,

      moment,
    }  
  }
}
</script>