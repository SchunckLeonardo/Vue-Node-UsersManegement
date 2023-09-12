<template>
  <div class="container">
    <h2 class="display-2 text-center">Registro de usuário</h2>
    <label for="name" class="form-label">Nome:</label>
    <input
      type="text"
      name="name"
      class="form-control mb-3"
      v-model="name"
      placeholder="Digite o seu nome"
    />
    <label for="email" class="form-label">E-mail:</label>
    <input
      type="email"
      name="email"
      class="form-control mb-3"
      v-model="email"
      placeholder="Digite o seu E-mail"
    />
    <label for="password" class="form-label">Senha:</label>
    <input
      type="password"
      name="password"
      class="form-control mb-3"
      v-model="password"
      placeholder="Digite sua senha"
    />
    <div
      v-if="isCorrect"
      class="alert alert-success d-flex align-items-center"
      role="alert"
    >
      <div>Usuário registrado com sucesso</div>
    </div>
    <div v-if="isError != undefined" class="alert alert-danger d-flex align-items-center" role="alert">
      <div>{{isError}}</div>
    </div>
    <button class="btn btn-success w-100 btn-lg" @click="register">
      Cadastrar
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      isCorrect: false,
      isError: undefined
    };
  },
  methods: {
    register() {
      let userRegister = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:8686/user", userRegister)
        .then((res) => {
          console.log(res);
          this.name = "";
          this.email = "";
          this.password = "";
          this.isCorrect = true;
          this.isError = undefined
          this.$router.push({path: '/'})
          setTimeout(() => {
            this.isCorrect = false;
          }, 5000);
        })
        .catch((err) => {
          let msgError = err.response.data.err;
          this.isError = msgError
          console.log(msgError);
        });
    },
  },
};
</script>

<style>
</style>