<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <nav class="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
      <ul class="flex justify-center">
        <li class="ml-3 first:ml-0">
          <a v-if="prev_page" @click="changePage(prev_page)" class="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500 hover:cursor-pointer">&lt;- Previous</a>
          <span v-else class="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">&lt;- Previous</span>
        </li>
        <li class="ml-3 first:ml-0">
          <a v-if="next_page" @click="changePage(next_page)" class="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500 hover:cursor-pointer">Next -&gt;</a>
          <span v-else class="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">Next -&gt;</span>
        </li>
      </ul>
    </nav>
    <div class="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
      Showing <span class="font-medium text-slate-600 dark:text-slate-300">{{ from }}</span> to <span class="font-medium text-slate-600 dark:text-slate-300">{{ to }}</span> of <span class="font-medium text-slate-600 dark:text-slate-300">{{ total_items }}</span> results
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationClassic',
  props: {
    next_page: {
      type: String,
    },
    prev_page: {
      type: String,
    },
    from: {
      type: Number
    },
    to: {
      type: Number
    },
    total_items: {
      type: Number,
    }
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page)
    }
  }
}
</script>