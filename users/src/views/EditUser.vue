<template>
  <div class="container">
    <h2 class="display-2 text-center">Edição de usuário</h2>
    <label for="name" class="form-label">Nome:</label>
    <input
      type="text"
      name="name"
      class="form-control mb-3"
      v-model="user.name"
      placeholder="Digite o seu nome"
    />
    <label for="email" class="form-label">E-mail:</label>
    <input
      type="email"
      name="email"
      class="form-control mb-3"
      v-model="user.email"
      placeholder="Digite o seu E-mail"
    />
    <label for="password" class="form-label">Cargo:</label>
    <input
      type="number"
      name="password"
      class="form-control mb-3"
      v-model="user.role"
      placeholder="Insira o cargo"
    />
    <button @click="updateUser" class="btn btn-success w-100">Editar</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUserId();
  },
  methods: {
    getUserId() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let id = this.$route.params.id;
      axios
        .get(`http://localhost:8686/user/${id}`, config)
        .then((res) => {
          this.user = {
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateUser() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let id = this.$route.params.id;

      axios.put(`http://localhost:8686/user/${id}`, this.user, config).then(res => {
        console.log(res)
        this.$router.push({path: '/admin/users'})
      }).catch(err => {
        console.log(err)
      })

    },
  },
};
</script>

<style>
</style>