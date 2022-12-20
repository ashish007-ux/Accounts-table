// import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./mock-data.json";
import { nanoid } from "nanoid";

export default function App() {
  const [contacts, setcontacts] = useState(data);
  const [addformdata, setaddformdata] = useState({
    Accountname: "",
    CreditAmount: "",
    DebitAmount: "",
  });
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  const handleformchange = (event) => {
    event.preventDefault();
    //to get the name of the input that user has changeed
    const fieldname = event.target.getAttribute("name");

    //to get actural value of that input
    const fieldvalue = event.target.value;

    const newfordata = { ...addformdata };
    newfordata[fieldname] = fieldvalue;
    setaddformdata(newfordata);
  };
  //when form is submitted this is called
  const handleformsubmit = (event) => {
    event.preventDefault();
    const newcontact = {
      //id beacaue it will help i identifying which contact is added and whichis deleted
      id: nanoid(),
      Accountname: addformdata.Accountname,
      CreditAmount: addformdata.CreditAmount,
      DebitAmount: addformdata.DebitAmount,
    };
    //creating new array to avoid mutation
    const newcontacts = [...contacts, newcontact];
    setcontacts(newcontacts);
  };

  const handledelete = (contactid) => {
    const newcontacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactid);
    newcontacts.splice(index, 1);
    setcontacts(newcontacts);
  };

  useEffect(() => {
    let initialDebit = 0,
      initialCredit = 0;
    contacts.forEach((contact) => {
      initialDebit += parseFloat(contact.DebitAmount);
      initialCredit += parseFloat(contact.CreditAmount);
    });
    setTotalDebit(initialDebit);
    setTotalCredit(initialCredit);
  }, [contacts]);

  return (
    <div className="app-container">
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, ind1) => (
            <tr>
              <td>
                <form>
                  <select>
                    {contacts.map((ele, ind2) => (
                      <option>{ele.Accountname}</option>
                    ))}
                    {/* <option>{contact.Accountname}</option>
                    <option>{contact.Accountname}</option>
                    <option>Account 3</option> */}
                  </select>
                </form>
              </td>
              <td>{contact.CreditAmount}</td>
              <td>{contact.DebitAmount}</td>
              <td>
                <button type="button" onClick={() => handledelete(contact.id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <th>{totalCredit}</th>
            <th>{totalDebit}</th>
            <th></th>
          </tr>
        </tbody>
      </table>
      <h2>Add a Account</h2>
      <form onSubmit={handleformsubmit}>
        <input
          type="text"
          name="Accountname"
          placeholder="Account"
          onChange={handleformchange}
        />
        <input
          type="number"
          name="CreditAmount"
          placeholder="Credit"
          onChange={handleformchange}
        />
        <input
          type="number"
          name="DebitAmount"
          placeholder="Debit"
          onChange={handleformchange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
