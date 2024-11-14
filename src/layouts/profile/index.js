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

// @mui material components
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "layouts/tables/data/firebase"; // Correct Firebase db configuration import
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import { Grid, Divider, CircularProgress } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";

function Overview() {
  const { id } = useParams(); // Get the user id from the URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from Firebase based on the user id
    const fetchUserData = async () => {
      const docRef = doc(db, "Problem-Understanding-Kit", id); // Reference to the user's document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Assuming the structure is such that questions is an array of answers
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchUserData();
  }, [id]); // Fetch data when id changes

  if (!userData) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </MDBox>
    ); // Show loading message while data is being fetched
  }

  // Extracting the information for three boxes
  const personalInfo = {
    fullName: userData.questions ? userData.questions[0]?.answer || "Unknown" : "Unknown",
    email: userData.questions ? userData.questions[1]?.answer || "No Email" : "No Email",
    location: userData.questions ? userData.questions[2]?.answer || "No Country" : "No Country",
    mobile: userData.questions ? userData.questions[3]?.answer || "No Phone" : "No Phone",
  };

  const businessInfo = {
    website: userData.questions ? userData.questions[4]?.answer || "No Website" : "No Website",
    businessDescription: userData.questions
      ? userData.questions[5]?.answer || "No Description"
      : "No Description",
    aiAreas: userData.questions ? userData.questions[6]?.answer || "No Areas" : "No Areas",
    aiImplementation: userData.questions
      ? userData.questions[9]?.answer || "No Implementation"
      : "No Implementation",
  };

  const projectInfo = {
    expectedResults: userData.questions
      ? userData.questions[7]?.answer || "No Results"
      : "No Results",
    idealOutcome: userData.questions ? userData.questions[8]?.answer || "No Outcome" : "No Outcome",
    numEmployees: userData.questions
      ? userData.questions[10]?.answer || "No Employees"
      : "No Employees",
    aiUnderstanding: userData.questions
      ? userData.questions[11]?.answer || "No Rating"
      : "No Rating",
    startTime: userData.questions
      ? userData.questions[12]?.answer || "No Start Time"
      : "No Start Time",
    funding: userData.questions ? userData.questions[13]?.answer || "No Funding" : "No Funding",
    importance: userData.questions
      ? userData.questions[15]?.answer || "No Importance"
      : "No Importance",
    firstHeard: userData.questions ? userData.questions[16]?.answer || "No Source" : "No Source",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            {/* Personal Info Box */}
            <Grid item xs={12} md={4}>
              <MDBox
                p={2}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MDTypography
                  variant="h6"
                  sx={{
                    fontSize: "1.5rem",
                    textDecoration: "underline",
                    textDecorationThickness: "3px",
                  }}
                >
                  Personal Info
                </MDTypography>
                <MDBox mt={1}>
                  <MDTypography variant="body2">
                    <strong>Full Name:</strong> {personalInfo.fullName}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>Email:</strong> {personalInfo.email}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>Country:</strong> {personalInfo.location}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>PhoneNumber:</strong> {personalInfo.mobile}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Grid>

            {/* Business Info Box */}
            <Grid item xs={12} md={8}>
              <MDBox
                p={2}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MDTypography
                  variant="h6"
                  sx={{
                    fontSize: "1.5rem",
                    textDecoration: "underline",
                    textDecorationThickness: "3px",
                  }}
                >
                  Business Info
                </MDTypography>
                <MDBox mt={1}>
                  <MDTypography variant="body2">
                    <strong>What&apos;s your company’s website:</strong> {businessInfo.website}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>
                      Can you briefly describe your business, the customer profile of whom you serve
                      and your product/service offerings :
                    </strong>
                    {businessInfo.businessDescription}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>
                      What are the primary areas in your business where you&apos;re considering
                      implementing AI solutions/automation?:
                    </strong>{" "}
                    {businessInfo.aiAreas}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>Have you implemented any AI solutions in your business before?:</strong>{" "}
                    {businessInfo.aiImplementation}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Grid>

            {/* Project Info Box */}
            <Grid item xs={12} md={12}>
              <MDBox
                p={2}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MDTypography
                  variant="h6"
                  sx={{
                    fontSize: "1.5rem",
                    textDecoration: "underline",
                    textDecorationThickness: "3px",
                  }}
                >
                  Project Info
                </MDTypography>
                <MDBox mt={1}>
                  <MDTypography variant="body2">
                    <strong>
                      What are the biggest results you hope to see from this AI solution/
                      automation?:
                    </strong>{" "}
                    {projectInfo.expectedResults}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>
                      Briefly describe what would be the ideal outcome that AI solution/ automation
                      can get you to:
                    </strong>{" "}
                    {projectInfo.idealOutcome}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>How many employees does your company have?:</strong>{" "}
                    {projectInfo.numEmployees}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>
                      On a scale of 1-5, how would you rate your team&apos;s current understanding
                      and use of AI and automation technologies? (1 being novice, 5 being expert)
                    </strong>{" "}
                    {projectInfo.aiUnderstanding}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>When are you looking to get started?:</strong> {projectInfo.startTime}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>What is your estimated funding range for this project?:</strong>{" "}
                    {projectInfo.funding}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>
                      On a scale of 1-10, how would you rate the importance of this project?:
                    </strong>{" "}
                    {projectInfo.importance}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>Where did you FIRST hear about us?:</strong> {projectInfo.firstHeard}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
