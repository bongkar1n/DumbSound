import React, { useState, useRef } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import PaymentListAdmin from "../components/PaymentListAdmin";
// import { OverlayTrigger, Popover, Button, Overlay } from "react-bootstrap";

function PaymentAdmin() {
  return (
    <div>
      <HeaderAdmin />
      <PaymentListAdmin />
    </div>
  );
}

export default PaymentAdmin;
