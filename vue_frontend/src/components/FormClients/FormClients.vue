<script setup>
import { reactive, computed } from "vue";
import useVuelidate from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';

const formData = reactive({
  login: "",
  email: "",
  name: "",
  lastName: "",
});

const rules = computed(() => {
  return {
    login: { required, minLength: minLength(4) },
    email: { required, email },
    name: { required, minLength: minLength(2) },
    lastName: { required, minLength: minLength(2) },
  }
})

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    alert('success, form submitted!');
  } else {
    alert('error, form not submitted!');
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="form-clients" action="">
    <input v-model="formData['login']" class="form-clients__input" type="text" placeholder="Enter your login">
    <span v-for="error in v$.login.$errors" :key="error.$uid">{{ error.$message }}</span>

    <input v-model="formData['email']" class="form-clients__input" type="email" placeholder="Enter your email">
    <span v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>

    <input v-model="formData['name']" class="form-clients__input" type="text" placeholder="Enter your name">
    <span v-for="error in v$.name.$errors" :key="error.$uid">{{ error.$message }}</span>

    <input v-model="formData['lastName']" class="form-clients__input" type="text" placeholder="Enter your surname">
    <span v-for="error in v$.lastName.$errors" :key="error.$uid">{{ error.$message }}</span>

    <button type="submit">submit</button>
  </form>
</template>

<style lang="scss" scoped>
@import 'FormClients.module.scss';
</style>
