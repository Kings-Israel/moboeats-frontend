import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import Analytics from './pages/Analytics.vue'
import Fintech from './pages/Fintech.vue'
import Customers from './pages/ecommerce/Customers.vue'
// import Orders from './pages/ecommerce/Orders.vue'
import Invoices from './pages/ecommerce/Invoices.vue'
import Shop from './pages/ecommerce/Shop.vue'
import Shop2 from './pages/ecommerce/Shop2.vue'
import Product from './pages/ecommerce/Product.vue'
import Cart from './pages/ecommerce/Cart.vue'
import Cart2 from './pages/ecommerce/Cart2.vue'
import Cart3 from './pages/ecommerce/Cart3.vue'
import Pay from './pages/ecommerce/Pay.vue'
import Campaigns from './pages/Campaigns.vue'
import UsersTabs from './pages/community/UsersTabs.vue'
import UsersTiles from './pages/community/UsersTiles.vue'
import Profile from './pages/community/Profile.vue'
import Feed from './pages/community/Feed.vue'
import Forum from './pages/community/Forum.vue'
import ForumPost from './pages/community/ForumPost.vue'
import Meetups from './pages/community/Meetups.vue'
import MeetupsPost from './pages/community/MeetupsPost.vue'
import CreditCards from './pages/finance/CreditCards.vue'
import Transactions from './pages/finance/Transactions.vue'
import TransactionDetails from './pages/finance/TransactionDetails.vue'
import JobListing from './pages/job/JobListing.vue'
import JobPost from './pages/job/JobPost.vue'
import CompanyProfile from './pages/job/CompanyProfile.vue'
import Messages from './pages/Messages.vue'
import TasksKanban from './pages/tasks/TasksKanban.vue'
import TasksList from './pages/tasks/TasksList.vue'
import Inbox from './pages/Inbox.vue'
import Calendar from './pages/Calendar.vue'
import Account from './pages/settings/Account.vue'
import Notifications from './pages/settings/Notifications.vue'
import Apps from './pages/settings/Apps.vue'
import Plans from './pages/settings/Plans.vue'
import Billing from './pages/settings/Billing.vue'
import Feedback from './pages/settings/Feedback.vue'
import Changelog from './pages/utility/Changelog.vue'
import Roadmap from './pages/utility/Roadmap.vue'
import EmptyState from './pages/utility/EmptyState.vue'
import PageNotFound from './pages/utility/PageNotFound.vue'
import KnowledgeBase from './pages/utility/KnowledgeBase.vue'
import Signin from './pages/Signin.vue'
import Signup from './pages/Signup.vue'
import ResetPassword from './pages/ResetPassword.vue'
import Onboarding01 from './pages/Onboarding01.vue'
import Onboarding02 from './pages/Onboarding02.vue'
import Onboarding03 from './pages/Onboarding03.vue'
import Onboarding04 from './pages/Onboarding04.vue'
import ButtonPage from './pages/component/ButtonPage.vue'
import FormPage from './pages/component/FormPage.vue'
import DropdownPage from './pages/component/DropdownPage.vue'
import AlertPage from './pages/component/AlertPage.vue'
import ModalPage from './pages/component/ModalPage.vue'
import PaginationPage from './pages/component/PaginationPage.vue'
import TabsPage from './pages/component/TabsPage.vue'
import BreadcrumbPage from './pages/component/BreadcrumbPage.vue'
import BadgePage from './pages/component/BadgePage.vue'
import AvatarPage from './pages/component/AvatarPage.vue'
import TooltipPage from './pages/component/TooltipPage.vue'
import AccordionPage from './pages/component/AccordionPage.vue'
import IconsPage from './pages/component/IconsPage.vue'

import Users from './pages/users/Users.vue'
import RestaurantAdmins from './pages/users/RestaurantAdmins.vue'
import Riders from './pages/users/Riders.vue'
import User from './pages/users/Details.vue'
import Restaurants from './pages/restautants/Index.vue'
import SupplementsAdmins from './pages/users/Admins.vue'
import Orders from './pages/orders/Orders.vue'
import Payments from './pages/payments/Payments.vue'
import PaymentDetails from './pages/payments/Details.vue'
import RestaurantDetails from './pages/restautants/Details.vue'
import OrderDetails from './pages/orders/Details.vue'
import Logs from './pages/logs/Index.vue'
import Discount from './pages/discounts/Index.vue'
import MarketingPosters from './pages/marketing/posters/Index.vue'
import Faqs from './pages/faqs/Index.vue'
import Suppliers from './pages/supplements/Suppliers.vue'
import Supplements from './pages/supplements/Index.vue'
import SupplementOrders from './pages/supplements/Orders.vue'
import DietSubscribers from './pages/diet/Subscribers.vue'
import DietSubscriber from './pages/diet/Subscriber.vue'
import DietSettings from './pages/diet/Settings.vue'
import RidersPayout from './pages/payouts/Riders.vue'
import RestaurantsPayout from './pages/payouts/Restaurants.vue'
import Roles from './pages/roles/Index.vue'
import Admins from './pages/admins/Index.vue'
import OrphanageIndex from './pages/orphanages/Index.vue'
import OrphanageDetails from './pages/orphanages/Details.vue'
import CreateRestaurant from './pages/restautants/CreateRestaurant.vue'
import AddOperatingHours from './pages/restautants/AddOperatingHours.vue'
import Countries from './pages/countries/Index.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Dashboard,
      name: 'dashboard',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/users',
      component: Users,
      name: 'users',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/users/:type/:id',
      component: User,
      name: 'user-details',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/restaurant-admins',
      component: RestaurantAdmins,
      name: 'restaurant-admins',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/restaurant-admins/:type/:id',
      component: User,
      name: 'restaurant-admin-details',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/riders',
      component: Riders,
      name: 'riders',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/supplements-admin',
      component: SupplementsAdmins,
      name: 'supplements-admin',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/riders/:type/:id',
      component: User,
      name: 'rider-details',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/partners',
      component: Restaurants,
      name: 'partners',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/restaurant/:id',
      component: RestaurantDetails,
      name: 'restaurant-details',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/partner/:id/edit',
      component: CreateRestaurant,
      name: 'partner-edit',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/partners/:id/operating-hours',
      component: AddOperatingHours,
      name: 'partner-operating-hours',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/orders',
      component: Orders,
      name: 'orders',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/orders/:id',
      component: OrderDetails,
      name: 'order-details',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/payments',
      component: Payments,
      name: 'payments',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payments/:id',
      component: PaymentDetails,
      name: 'payment-details',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payouts/riders',
      component: RidersPayout,
      name: 'riders-payouts',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payouts/partners',
      component: RestaurantsPayout,
      name: 'restaurants-payouts',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/diet/packages',
      component: DietSettings,
      name: 'diet-packages',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/diet/subscribers',
      component: DietSubscribers,
      name: 'diet-subscribers',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/diet/subscribers/:id',
      component: DietSubscriber,
      name: 'diet-subscriber',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/supplements/suppliers',
      component: Suppliers,
      name: 'suppliers',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/supplements',
      component: Supplements,
      name: 'supplements',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/supplements/orders',
      component: SupplementOrders,
      name: 'supplements-orders',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/discounts',
      component: Discount,
      name: 'discounts',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/marketing/posters',
      component: MarketingPosters,
      name: 'marketing.posters',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/faqs',
      component: Faqs,
      name: 'faqs',
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/logs',
      component: Logs,
      name: 'logs',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/roles',
      component: Roles,
      name: 'roles',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admins',
      component: Admins,
      name: 'admins',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/orphanages',
      component: OrphanageIndex,
      name: 'orphanages',
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/orphanages/:id',
      component: OrphanageDetails,
      name: 'orphanages-details',
      meta: {
        requiresAuth: true
      },
    },
    ,
    {
      path: '/countries',
      component: Countries,
      name: 'countries',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard/analytics',
      component: Analytics
    },
    {
      path: '/dashboard/fintech',
      component: Fintech
    },    
    {
      path: '/ecommerce/customers',
      component: Customers
    },
    {
      path: '/ecommerce/invoices',
      component: Invoices
    },
    {
      path: '/ecommerce/shop',
      component: Shop
    },
    {
      path: '/ecommerce/shop-2',
      component: Shop2
    },
    {
      path: '/ecommerce/product',
      component: Product
    },
    {
      path: '/ecommerce/cart',
      component: Cart
    },
    {
      path: '/ecommerce/cart-2',
      component: Cart2
    },
    {
      path: '/ecommerce/cart-3',
      component: Cart3
    },
    {
      path: '/ecommerce/pay',
      component: Pay
    },
    {
      path: '/campaigns',
      component: Campaigns
    },
    {
      path: '/community/users-tabs',
      component: UsersTabs
    },
    {
      path: '/community/users-tiles',
      component: UsersTiles
    },
    {
      path: '/community/profile',
      component: Profile
    },
    {
      path: '/community/feed',
      component: Feed
    },
    {
      path: '/community/forum',
      component: Forum
    },
    {
      path: '/community/forum-post',
      component: ForumPost
    },    
    {
      path: '/community/meetups',
      component: Meetups
    },
    {
      path: '/community/meetups-post',
      component: MeetupsPost
    },
    {
      path: '/finance/cards',
      component: CreditCards
    }, 
    {
      path: '/finance/transactions',
      component: Transactions
    },
    {
      path: '/finance/transaction-details',
      component: TransactionDetails
    },
    {
      path: '/job/job-listing',
      component: JobListing
    },
    {
      path: '/job/job-post',
      component: JobPost
    },
    {
      path: '/job/company-profile',
      component: CompanyProfile
    },            
    {
      path: '/messages',
      component: Messages
    },
    {
      path: '/tasks/kanban',
      component: TasksKanban
    },
    {
      path: '/tasks/list',
      component: TasksList
    },    
    {
      path: '/inbox',
      component: Inbox
    },
    {
      path: '/calendar',
      component: Calendar
    },
    {
      path: '/settings/account',
      component: Account
    },
    {
      path: '/settings/notifications',
      component: Notifications
    },
    {
      path: '/settings/apps',
      component: Apps
    },
    {
      path: '/settings/plans',
      component: Plans
    },
    {
      path: '/settings/billing',
      component: Billing
    },
    {
      path: '/settings/feedback',
      component: Feedback
    },
    {
      path: '/utility/changelog',
      component: Changelog
    },
    {
      path: '/utility/roadmap',
      component: Roadmap
    },
    {
      path: '/utility/faqs',
      component: Faqs
    },
    {
      path: '/utility/empty-state',
      component: EmptyState
    },
    {
      path: '/utility/404',
      component: PageNotFound
    },
    {
      path: '/utility/knowledge-base',
      component: KnowledgeBase
    },
    {
      path: '/signin',
      component: Signin,
      name: 'auth-login',
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/signup',
      component: Signup,
      name: 'auth-signup',
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/reset-password',
      component: ResetPassword
    },
    {
      path: '/onboarding-01',
      component: Onboarding01
    },
    {
      path: '/onboarding-02',
      component: Onboarding02
    },
    {
      path: '/onboarding-03',
      component: Onboarding03
    },
    {
      path: '/onboarding-04',
      component: Onboarding04
    },
    {
      path: '/component/button',
      component: ButtonPage
    },
    {
      path: '/component/form',
      component: FormPage
    },
    {
      path: '/component/dropdown',
      component: DropdownPage
    },
    {
      path: '/component/alert',
      component: AlertPage
    },
    {
      path: '/component/modal',
      component: ModalPage
    },
    {
      path: '/component/pagination',
      component: PaginationPage
    },
    {
      path: '/component/tabs',
      component: TabsPage
    },
    {
      path: '/component/breadcrumb',
      component: BreadcrumbPage
    },
    {
      path: '/component/badge',
      component: BadgePage
    },
    {
      path: '/component/avatar',
      component: AvatarPage
    },
    {
      path: '/component/tooltip',
      component: TooltipPage
    },
    {
      path: '/component/accordion',
      component: AccordionPage
    },
    {
      path: '/component/icons',
      component: IconsPage
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound,
      name: 'misc-not-authorized'
    }
  ]
})

const isUserLoggedIn = () => {
  return localStorage.getItem('user') && localStorage.getItem('token')
}

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({
        name: 'auth-login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (isLoggedIn) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
