<template>
  <div class="container">
    <h2 class="display-2 text-center mb-5">Login</h2>
    <label for="email" class="form-label">E-mail:</label>
    <input
      type="email"
      name="email"
      class="form-control mb-3"
      v-model="email"
      placeholder="Digite o seu email"
    />
    <label for="password" class="form-label">Senha:</label>
    <input
      type="password"
      name="password"
      class="form-control mb-3"
      v-model="password"
      placeholder="Digite a sua senha"
    />
    <div
      v-if="isError != undefined"
      class="alert alert-danger d-flex align-items-center"
      role="alert"
    >
      <div>{{ isError }}</div>
    </div>
    <button @click="login" class="btn btn-success w-100 btn-lg mb-3">Logar</button>
    <p class="text-end">
      Não tem uma conta?
      <button class="btnRegister" @click="redirectRegister">
        Registrar-se
      </button>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      isError: undefined,
    };
  },
  methods: {
    redirectRegister() {
      this.$router.push({ path: "/register" });
    },
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:8686/login", user)
        .then((res) => {
            this.email = ''
            this.password = ''
            let token = res.data.token
            localStorage.setItem('token', token)
            this.$router.push({path: '/admin/users'})
        })
        .catch((err) => {
          let msgError = err.response.data.err;
          this.isError = msgError;
        });
    },
  },
};
</script>

<style scoped>
.btnRegister {
  outline: none;
  border: none;
  text-decoration: underline;
  background: none;
  color: blue;
}
</style>