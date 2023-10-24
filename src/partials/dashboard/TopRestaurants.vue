<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Top Restaurants</h2>
    </header>
    <div class="p-3">

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-slate-300">
          <!-- Table header -->
          <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">Restaurant</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Orders</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Latest Order</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Created On</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            <!-- Row -->
            <tr v-for="restaurant in restaurants" :key="restaurant.id">
              <td class="p-2">
                <div class="flex items-center">
                  <img :src="restaurant.logo ? restaurant.logo : '../../src/images/icon-01.svg'" width="40" height="40" :alt="restaurant.name" class="rounded-full h-fit" />
                  <router-link :to="{ name: 'restaurant-details', params: { id: restaurant.uuid } }" class="text-slate-800 dark:text-slate-100 hover:text-slate-200">{{ restaurant.name }}</router-link>
                </div>
              </td>
              <td class="p-2">
                <div class="text-left">{{ restaurant.orders_count }}</div>
              </td>
              <td class="p-2">
                <router-link :to="{ name: 'order-details', params: { id: restaurant.orders[restaurant.orders.length - 1].uuid } }" class="text-left text-emerald-500 hover:text-emerald-400">{{ getLatestOrder(restaurant) }}</router-link>
              </td>
              <td class="p-2">
                <div class="text-left text-sky-500">{{ moment(restaurant.created_at).format('Do MMM Y') }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'TopRestaurants',
  props: {
    restaurants: {
      type: Array
    },
  },
  setup(props) {
    const restaurants = props.restaurants
    const getLatestOrder = (restaurant) => {
      let latest = restaurant.orders[restaurant.orders.length - 1];
      if (latest) {
        return latest.uuid.split('-')[0].toUpperCase()
      }
      return 'No Orders'
    }

    return {
      moment,
      restaurants,
      getLatestOrder,
    }
  }
}
</script>