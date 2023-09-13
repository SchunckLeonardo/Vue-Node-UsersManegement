<template>
  <div class="container">
    <h2 class="text-center display-2 mb-5">Painel de Admin</h2>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Cargo</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user.id">
        <tr>
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role == 0 ? "Usuário comum" : "Admin" }}</td>
          <td>
            <button
              data-bs-toggle="modal"
              data-bs-target="#JanelaModal"
              class="btn btn-danger me-2"
              @click="showModal(user.id)"
            >
              Excluir
            </button>
            <router-link :to="{name: 'EditUsers', params: {id: user.id}}" class="btn btn-success">Editar</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="JanelaModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Deseja deletar esse usuário?</h2>
            <button class="btn btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-footer">
            <button @click="deleteUser()" data-bs-dismiss="modal" class="btn btn-danger">Excluir</button>
            <button data-bs-dismiss="modal" class="btn btn-outline-dark">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      deleteUserId: 0,
      updateUserId: 0
    };
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("http://localhost:8686/user", config)
        .then((res) => {
          let listUsers = res.data;
          this.users = listUsers
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.delete(`http://localhost:8686/user/${this.deleteUserId}`, config).then(res => {
        console.log(res)
        this.getAllUsers()
      }).catch(err => {
        console.log(err)
      })
    },
    showModal(id) {
        this.deleteUserId = id
    },
  },
};
</script>

<style scoped>
</style>