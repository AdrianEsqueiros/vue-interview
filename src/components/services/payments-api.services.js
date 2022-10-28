import http from "../../core/services/http-common";

export class PaymentsApiServices {
  getPayments() {
    return http.get("/payments");
  }
  createPayment(data) {
    return http.post("/payments", data);
  }
  getTotalAmount() {
    return http.get("/amounts");
  }
}
