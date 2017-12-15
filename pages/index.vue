<template>
  <div>
    <div v-if="loggedIn" @click="logout">Logout</div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'myLibrary - My Books'
    }
  }
}
</script>
