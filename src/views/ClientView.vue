<template>
  <div>
    <div class="row mb-2">
      <div class="col-auto me-auto"><h4>Clients</h4></div>
      <div class="col-auto">
        <div class="col align-self-end">
          <router-link :to="{ name: 'clients' }" class="btn btn-success"
            ><i class="fa-solid fa-plus"></i> Add Client</router-link
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered">
            <!--            <pre>clients {{ clients }}</pre>-->
            <thead class="bg-primary text-white">
              <tr>
                <th>Client Name</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Payments</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients" :key="client.id">
                <!--                <pre>{{ client }}</pre>-->
                <td>{{ client.first_name }} {{ client.last_name }}</td>
                <td>{{ client.dob }}</td>
                <td>{{ client.phone }}</td>
                <td>{{ client.email }}</td>
                <td>{{ client.address }}</td>
                <td>{{ client.total_payments }}</td>
                <td>{{ client.total_amount }}</td>

                <td>
                  <router-link
                    :to="{
                      name: 'edit',
                      params: { id: client.id },
                    }"
                    class="btn btn-info mx-1"
                    ><i class="fas fa-edit"></i
                  ></router-link>
                  <a
                    type="button"
                    @click="deleteClient(client.id)"
                    class="btn btn-danger mx-1"
                    ><i class="fas fa-trash"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClientsApiServices } from "@/components/services/clients-api.services";
import { PaymentsApiServices } from "@/components/services/payments-api.services";

export default {
  name: "ClientView",
  data() {
    return {
      clients: [],
      payments: [],
      /*   this.clients.map((element, i) => {
      element.total_amount = this.payments[i].total_amount;
      // console.log("total : ", element);
    });*/
      // clientData: [],
    };
  },
  async created() {
    this.clientsService = new ClientsApiServices();
    this.paymentsService = new PaymentsApiServices();
    await this.showClients();
    // this.clients.forEach((e, i) => {
    //   e.total_amount = this.payments[i].total_amount;
    //   console.log("bri ", e);
    // });
    /*   this.clients.map((element, i) => {
      element.total_amount = this.payments[i].total_amount;
      // console.log("total : ", element);
    });*/
  },
  async mounted() {
    // await this.showClients();
    // this.clients.forEach((e, i) => {
    //   e.total_amount = this.payments[i].total_amount;
    //   console.log("bri ", e);
    // });
    // console.log("client data: ", this.clients);
  },
  methods: {
    async showClients() {
      await this.clientsService.getClients().then((response) => {
        this.clients = response.data;

        // console.log("clien111ts: ", this.clients);
      });
    },
    deleteClient(id) {
      if (confirm("Are you sure you want to delete this client?")) {
        this.clientsService
          .deleteClient(id)
          .then(() => {
            this.showClients();
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    },
  },
};
</script>

<style scoped></style>
