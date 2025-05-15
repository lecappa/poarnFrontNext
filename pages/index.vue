<template>
  <div class="intro-page">
    <div class="intro-page__inner">
      <img src="/logo.svg" width="100%" class="mb-5" alt="">
      <form>
        <input type="text" v-model="identifier" class="login-input" placeholder="pseudo">
        <input type="password" v-model="password" class="login-input" placeholder="Mot de passe">
        <p class="login-submit-parent">
          <button type="button" class="login-submit" @click="onSubmit">Connexion</button>
        </p>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
const {login} = useStrapiAuth();
const router = useRouter();
const identifier = ref('');
const password = ref('');
const onSubmit = async () => {
  try {
    await login({identifier: identifier.value, password: password.value})
    await router.push('/character/informations')
  } catch (e) {
  }
}
</script>
