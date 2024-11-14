/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../data/firebase"; // Correct Firebase db configuration import
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import team2 from "assets/images/team-2.jpg";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { colors } from "@mui/material";

// Define a component for displaying user's name and avatar
const UserName = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    {/* <MDAvatar src={image} name={name} size="sm" /> */}
    <MDBox ml={0.1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" fontSize="17px">
        {name}
      </MDTypography>
    </MDBox>
  </MDBox>
);

// Define a component for displaying user's email
const Email = ({ email }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography
      display="block"
      variant="caption"
      color="text"
      fontWeight="medium"
      fontSize="17px"
    >
      {email}
    </MDTypography>
  </MDBox>
);

const Country = ({ country }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography
      display="block"
      variant="caption"
      color="text"
      fontWeight="medium"
      fontSize="17px"
    >
      {country}
    </MDTypography>
  </MDBox>
);

const Phonenumber = ({ phonenumber }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography
      display="block"
      variant="caption"
      color="text"
      fontWeight="medium"
      fontSize="17px"
    >
      {phonenumber}
    </MDTypography>
  </MDBox>
);

const DataTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const dataCollectionRef = collection(db, "Problem-Understanding-Kit");

    const unsubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => {
        const documentData = { id: doc.id, ...doc.data() };

        // Log document data for debugging
        console.log("Fetched document data:", documentData);

        return documentData;
      });
      setData(updatedData);
    });

    return () => unsubscribe();
  }, []);

  const handleViewDetails = (id) => {
    // Navigate to the profile page, passing the user id
    navigate(`/profile/${id}`);
  };

  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "email", accessor: "function", align: "left" },
      { Header: "country", accessor: "country", align: "center" },
      { Header: "phonenumber", accessor: "phonenumber", align: "center" },
      { Header: "userdetail", accessor: "action", align: "center" },
    ],

    rows: data.map((item) => ({
      name: (
        <UserName
          image={item.image || team2}
          name={item.questions ? item.questions[0]?.answer || "Unknown" : "Unknown"}
        />
      ),
      function: (
        <Email email={item.questions ? item.questions[1]?.answer || "No Email" : "No Email"} />
      ),
      country: (
        <Country
          country={item.questions ? item.questions[2]?.answer || "No Country" : "No Country"}
        />
      ),
      phonenumber: (
        <Phonenumber
          phonenumber={
            item.questions ? item.questions[3]?.answer || "No Phonenumber" : "No Phonenumber"
          }
        />
      ),
      action: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          // fontSize="20px"
          // sx={{ color: "red" }}
          sx={{
            textDecoration: "underline",
            textDecorationThickness: "3px",
            color: "#56D6E1",
            fontSize: "17px",
            cursor: "pointer",
          }}
          onClick={() => handleViewDetails(item.id)} // Call handleViewDetails with user id
        >
          View Details
        </MDTypography>
      ),
    })),
  };
};

export default DataTable;
