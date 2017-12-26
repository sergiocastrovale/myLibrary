<template>
  <div v-if="loggedIn" class="user color-dark py-3 px-5">
    <strong>{{ username }}</strong>

    <ul class="fs-small text-center">
      <li>
        <nuxt-link :to="'/users/account/' + $store.state.auth.user.id" exact>
          <i class="fa fa-address-card-o" aria-hidden="true"></i>
          <span>Account</span>        
        </nuxt-link>
      </li>
      <li>
        <a href="#" @click="logout">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      username () {
        return this.$store.state.auth.user.username
      },
      loggedIn () {
        return this.$store.getters['auth/loggedIn']
      }
    },
    methods: {
      account () {

      },
      async logout () {
        await this.$store.dispatch('auth/logout')
        this.$router.push({ path: '/users/login' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    > strong {
      display: block;
      margin-bottom: 7px;
    }

    > ul {
      display: flex;

      > li {
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
</style>

