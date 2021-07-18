import React, { useState, useRef } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import PaymentListAdmin from "../components/PaymentListAdmin";
import { OverlayTrigger, Popover, Button, Overlay } from "react-bootstrap";

function Admin() {
  // const [show, setShow] = useState(false);
  // const [target, setTarget] = useState(null);
  // const ref = useRef(null);

  // const handleClick = (event) => {
  //   setShow(!show);
  //   setTarget(event.target);
  // };
  return (
    <div>
      <HeaderAdmin />

      <PaymentListAdmin />
      {/* <div ref={ref}>
        <Button onClick={handleClick}>Holy guacamole!</Button>

        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref.current}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Header as="h3">Popover bottom</Popover.Header>
            <Popover.Body>
              <strong>Holy guacamole!</strong> Check this info.
            </Popover.Body>
          </Popover>
        </Overlay>
      </div> */}
    </div>
  );
}

export default Admin;
