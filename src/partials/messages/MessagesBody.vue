<template>
  <div ref="refChatLogPS" id="conversation-log">
    <div class="grow px-4 sm:px-6 md:px-5 py-1" v-for="message in conversationLog" :key="message.id">
      <!-- Chat msg -->
      <div class="flex items-start mb-4 last:mb-0" v-if="message.sender.id === receiverData.messageable.id">
        <img class="rounded-full mr-4" :src="message.sender.avatar" width="40" height="40" alt="User 01" />
        <div>
          <div class="text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-3 rounded-lg rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-md mb-1">
            {{ message.body }}
          </div>
          <div class="flex items-center justify-between">
            <div class="text-xs text-slate-500 font-medium">{{moment(message.created_at).format('DD MMM YYYY H:m A')}}</div>
          </div>
        </div>
      </div>
      <!-- Chat msg -->
      <div class="flex justify-end items-start mb-4 last:mb-0" v-else>
        <div>
          <div class="text-sm bg-[#2E5945] dark:bg-slate-800 text-white dark:text-slate-100 p-3 rounded-lg rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-md mb-1">
            {{ message.body }}
          </div>
          <div class="flex items-center justify-between">
            <div class="text-xs text-slate-500 font-medium">{{moment(message.created_at).format('DD MMM YYYY H:m A')}}</div>
          </div>
        </div>
        <img class="rounded-full ml-4" :src="message.sender.avatar" width="40" height="40" alt="User 01" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { ref, onMounted, nextTick, watch } from 'vue'
export default {
  name: 'MessagesBody',
  props: ['conversationLog', 'receiverData'],
  setup(props) {
    const refChatLogPS = ref('')

    watch(() => props.conversationLog, (conversationLog) => {
      if (conversationLog.length > 0) {
        nextTick(() => {
          var container = refChatLogPS.value
          container.scrollTop = container.scrollHeight;
          console.log(container.scrollTop)
        })
      }
    })

    return {
      moment,
      refChatLogPS,
    }
  }
}
</script>