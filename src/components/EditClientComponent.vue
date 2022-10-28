<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3>Clients</h3>
        </div>
        <div class="card-body">
          <h4>Add Client</h4>
          <h5>Personal Information</h5>
          <form @submit.prevent="updateClient">
            <div class="row">
              <div class="col-12 mb-2">
                <div class="row g-3">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      aria-label="First name"
                      v-model="clientData.first_name"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                      aria-label="Last name"
                      v-model="clientData.last_name"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="DOB"
                      aria-label="DOB"
                      v-model="clientData.dob"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-2">
                <div class="row g-3">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Phone"
                      aria-label="Phone"
                      v-model="clientData.phone"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      aria-label="Email"
                      v-model="clientData.email"
                    />
                    <span>{{ validatedEmail }}</span>
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Address"
                      aria-label="Address"
                      v-model="clientData.address"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-1">
              <div class="col-auto me-auto">
                <h5>Payments</h5>
              </div>
              <div class="col-auto">
                <div class="col align-self-end">
                  <button
                    type="button"
                    v-on:click="addPayment"
                    class="btn btn-primary"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-for="payment in clientData.payments" :key="payment.id">
              <div class="row">
                <div class="col-12 mb-2">
                  <div class="row g-3">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Transaction ID"
                        aria-label="Transaction ID"
                        v-model="payment.transaction"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Amount"
                        aria-label="Amount"
                        v-model="payment.amount"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Date"
                        aria-label="Date"
                        v-model="payment.date"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClientsApiServices } from "@/components/services/clients-api.services";
import { ref } from "vue";

export default {
  name: "EditClientComponent",
  data() {
    return {
      // eslint-disable-next-line vue/no-reserved-keys

      clientData: {
        first_name: "",
        last_name: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        payments: [
          {
            transaction: "",
            amount: 0,
            date: "",
          },
        ],
      },
    };
  },
  created() {
    this.clientsService = new ClientsApiServices();
  },
  computed: {
    validatedEmail() {
      let validate = "";
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          this.clientData.email
        )
      ) {
        validate = "";
      } else {
        validate = "Invalid Email Address";
      }
      return validate;
    },
  },
  mounted() {
    this.getClientById();
  },

  setup() {
    const showMessage = ref(false);
    return {
      showMessage,
    };
  },
  methods: {
    addPayment() {
      if (this.clientData.payments.length < 5)
        this.clientData.payments.push({
          id: null,
        });
    },
    getClientById: async function () {
      try {
        const res = await this.clientsService.getClientById(
          this.$route.params.id
        );
        // const { first_name, last_name, dob, phone, email, address } =
        //   res.data[0];
        // this.client.first_name = first_name;
        // this.client.last_name = last_name;
        // this.client.dob = dob;
        // this.client.phone = phone;
        // this.client.email = email;
        // this.client.address = address;``
        this.clientData = res.data[0];
        // console.log(this.clientData);
        // console.log("res data:", (this.clientData = res.data[0]));
        // this.client = JSON.parse(this.clientData)[0];
        // this.payments = JSON.parse(this.clientData.payment_data);
        // this.client.push(this.payments);
        // console.log("Clients:", this.client);
        // console.log("Payments:", this.payments[0]);
        // this.clienData = {this.client, this.payment}
      } catch (e) {
        console.error(e);
      }
    },
    updateClient: async function () {
      // this.client.payments = this.payments;
      try {
        // this.clientData.payments.forEach((item) => {
        //   item.amount = parseInt(item.amount);
        // });
        await this.clientsService.updateClientWithPayments(
          this.clientData,
          this.$route.params.id
        );
        await this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
createClient
<style scoped></style>
