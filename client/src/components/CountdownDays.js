import React, { useEffect, useContext, useState } from "react";
import "../styles/CountdownDays.css";
import { API } from "../config/api";
import { UserContext } from "../context/UseContext";

function CountdownDays() {
  const [state, dispatch] = useContext(UserContext);
  const [dueDate, setDueDate] = useState();

  const date = new Date().getDate();
  const revDate = date < 10 ? `0${date}` : `${date}`;
  const month = new Date().getMonth() + 1;
  const revMonth = month < 10 ? `0${month}` : `${month}`;
  const dueMonth = month >= 12 ? `0${month - 11}` : `0${month + 1}`;
  const year = new Date().getFullYear();
  const dueYear = month >= 12 ? `${year + 1}` : `${year}`;

  const today = `${revMonth}/${revDate}/${year}`;

  const loadDueDate = async () => {
    try {
      const response = await API.get(`payment`);
      console.log(response);
      setDueDate(response.data.data.dueDate);
    } catch (error) {
      console.log(error);
    }
  };

  const date1 = new Date(today);
  const date2 = new Date(dueDate ? dueDate : today);

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  //To display the final no. of days (result)
  const result = date1 + "  " + date2 + "  " + Difference_In_Days;
  const finalResult = Difference_In_Days <= 0 ? 0 : Difference_In_Days;

  useEffect(() => {
    loadDueDate();
  }, []);

  console.log(dueDate);

  return (
    <div className="outer">
      <div className="inner">
        {finalResult <= 1 ? (
          <p> {finalResult} Day</p>
        ) : (
          <p> {finalResult} Days</p>
        )}
      </div>
    </div>
  );
}

export default CountdownDays;
