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
  <video class="intro-video" src="public/pg2.mp4"
         poster="public/pg2.jpg" autoplay="">
    <div></div>
  </video>
</template>
<script setup lang="ts">
import {notificationError, notificationSuccess} from "~/composables/useNotification";

const {login} = useStrapiAuth();
const router = useRouter();
const identifier = ref('');
const password = ref('');

const onSubmit = async () => {
  try {
    await login({identifier: identifier.value, password: password.value})
    await router.push('/character/fiche')
    notificationSuccess("Bienvenue !");
  } catch (e) {
    notificationError("Identifiant ou mot de passe invalide");
  }
}
</script>