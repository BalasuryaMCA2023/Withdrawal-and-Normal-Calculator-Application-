/* eslint-disable no-unused-vars */
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Calculate } from "@mui/icons-material";
import { motion } from "framer-motion";

const calculatorDescription = `This calculator helps you perform quick and accurate computations. It supports features like addition, subtraction, multiplication, division, and more. Share your results or download them as a file.`;

const LandingPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/calculator");
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant={isMobile ? "h5" : "h3"}
          align="center"
          gutterBottom
        >
          Smart Calculator
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          {calculatorDescription}
        </Typography>
        <Alert severity="info" sx={{ mb: 4 }}>
          No data is stored on our servers. This tool is for calculation and
          result purposes only.
        </Alert>
      </motion.div>

      <Grid container justifyContent="center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleNavigate}
            startIcon={<Calculate />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Go to Calculator
          </Button>
        </motion.div>
      </Grid>
    </Container>
  );
};

export default LandingPage;
