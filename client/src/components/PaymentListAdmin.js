import React, { useState, useEffect, useRef } from "react";
import "../styles/PaymentAdmin.css";
import {
  Table,
  Container,
  Overlay,
  OverlayTrigger,
  Dropdown,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import RemainingDays from "./RemainingDays";
import arrow from "../images/Polygon 2.png";
import { API } from "../config/api";

function PaymentListAdmin(props) {
  const [paymentList, setPaymentList] = useState([]);
  const [dateData, setDateData] = useState();
  const [uploadDate, setUploadDate] = useState({
    startDate: "",
    dueDate: "",
  });

  const date = new Date().getDate();
  const revDate = date < 10 ? `0${date}` : `${date}`;
  const month = new Date().getMonth() + 1;
  const revMonth = month < 10 ? `0${month}` : `${month}`;
  const dueMonth = month >= 12 ? `0${month - 11}` : `0${month + 1}`;
  const year = new Date().getFullYear();
  const dueYear = month >= 12 ? `${year + 1}` : `${year}`;

  const StartDate = `${revMonth}/${revDate}/${year}`;
  const DueDate = `${dueMonth}/${revDate}/${dueYear}`;

  const loadPayment = async () => {
    try {
      const response = await API.get("/allpayment");
      setPaymentList(response.data.data);

      const allDate = response.data.data.map((item) => ({
        startDate: item.startDate,
        dueDate: item.dueDate,
      }));

      setDateData(allDate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToSetDate = async () => {
    try {
      setUploadDate({
        // startDate: date1,
        dueDate: DueDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproved = (event) => {
    const id = event.target.getAttribute("content");
    approved(id);
  };
  const approved = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        ...uploadDate,
        status: "Approved",
      });

      const response = await API.patch(`/payment/${id}`, body, config);
      loadPayment();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = (event) => {
    const id = event.target.getAttribute("content");
    reject(id);
  };

  const reject = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        startDate: StartDate,
        dueDate: StartDate,
        status: "Rejected",
      });

      const response = await API.patch(`/payment/${id}`, body, config);
      loadPayment();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUploadDate = async (id) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const body = JSON.stringify({ ...uploadDate, status: "Approved" });
  //     const response = await API.patch(`payment/${id}`, body, config);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleReject = async (id) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const body = JSON.stringify({ status: "Rejected" });
  //     const response = await API.patch(`payment/${id}`, body, config);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const date1 = new Date(StartDate);
  const date2 = new Date(uploadDate.dueDate);

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  //To display the final no. of days (result)
  const result = date1 + "  " + date2 + "  " + Difference_In_Days;
  const finalResult = Difference_In_Days;

  useEffect(() => {
    loadPayment();
  }, []);

  useEffect(() => {
    handleToSetDate();
  }, []);

  // console.log(paymentList);
  // console.log(uploadDate);

  return (
    <div className="payment-page">
      <div className="table-container">
        <h1 className="text-incoming"> Incoming Transaction</h1>
        <Table striped bordered className="main-table">
          <thead className="head-table-paymentlist">
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Bukti Transfer</th>
              <th>Remaining Active</th>
              <th>Status User</th>
              <th>Status Payment</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentList.map((item, index) => (
              <tr key={index + 888}>
                <td>{index + 1}</td>
                <td>{item.payment.fullName}</td>
                <td>{item.proof}</td>
                <td>
                  <RemainingDays dataId={item.id} loadPayment={loadPayment} />
                  {/* {item.status == "Rejected" ? (
                    <p> 0 Hari</p>
                  ) : (
                    <p> {finalResult}/ Hari </p>
                  )} */}
                </td>
                <td>
                  {item.status === "Approved" ? (
                    <p className="text-success"> Active </p>
                  ) : (
                    <p className="text-danger"> Not Active </p>
                  )}
                </td>
                <td>
                  {item.status === "Approved" ? (
                    <p className="text-success"> {item.status}</p>
                  ) : (
                    <>
                      {item.status === "Rejected" ? (
                        <p className="text-danger"> {item.status}</p>
                      ) : (
                        <p className="text-warning"> {item.status}</p>
                      )}
                    </>
                  )}
                </td>
                <td style={{ padding: 0 }}>
                  {
                    <div className="container-arrow">
                      <Image src={arrow} className="arrow-dropdown" />
                      <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle
                          split
                          variant="transparant"
                          id="dropdown-split-basic"
                        />

                        <Dropdown.Menu className="bg-dark text-light dropdown-down-transaction">
                          <Dropdown.Item
                            className="bg-dark  drop-menu-approved"
                            // onClick={handleToSetDate}
                            // onClick={handleUploadDate(item.id)}
                            onClick={handleApproved}
                            content={item?.id}
                          >
                            Approved
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="bg-dark drop-menu-rejected"
                            // onClick={handleReject(item.id)}
                            onClick={handleReject}
                            content={item?.id}
                          >
                            Rejected
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  }
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr> */}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default PaymentListAdmin;
