import React from "react";
import { Box, Container, Stack, Tabs, Tab, Typography, Accordion, AccordionSummary, AccordionDetails, Button, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GavelIcon from '@mui/icons-material/Gavel';
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="help-page-main">
      <Container maxWidth="lg">
        <Typography variant="h4" className="page-header-text">
          Help Center
        </Typography>

        <TabContext value={value}>
          {/* MENU TABS */}
          <Box className="glass-card help-menu-wrapper">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              className="help-tabs"
              TabIndicatorProps={{ style: { display: 'none' } }}
            >
              <Tab 
                icon={<GavelIcon />} 
                iconPosition="start" 
                label="TERMS" 
                value="1" 
                className={value === "1" ? "tab-active" : "tab-item"}
              />
              <Tab 
                icon={<HelpOutlineIcon />} 
                iconPosition="start" 
                label="FAQ" 
                value="2" 
                className={value === "2" ? "tab-active" : "tab-item"}
              />
              <Tab 
                icon={<MailOutlineIcon />} 
                iconPosition="start" 
                label="CONTACT" 
                value="3" 
                className={value === "3" ? "tab-active" : "tab-item"}
              />
            </Tabs>
          </Box>

          <Stack mt={4} pb={10}>
            {/* TAB 1: TERMS */}
            <TabPanel value="1" sx={{ p: 0 }}>
              <Box className="glass-card rules-container">
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: '#3b82f6' }}>
                  Terms & Conditions
                </Typography>
                <Stack spacing={2} className="rules-text-wrapper">
                  {terms.map((term, index) => (
                    <Box key={index} className="term-item">
                      <Typography variant="body1">{term}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </TabPanel>

            {/* TAB 2: FAQ */}
            <TabPanel value="2" sx={{ p: 0 }}>
              <Stack spacing={2}>
                {faq.map((item, index) => (
                  <Accordion key={index} className="glass-accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#3b82f6' }} />}>
                      <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </TabPanel>

            {/* TAB 3: CONTACT */}
            <TabPanel value="3" sx={{ p: 0 }}>
              <Box className="glass-card contact-form-wrapper">
                <Box mb={4} textAlign="center">
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Contact Us!</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Fill out the form below to send a message to our team.</Typography>
                </Box>

                <form action="#" method="POST">
                  <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="memberNick"
                        variant="outlined"
                        className="dark-input"
                        placeholder="John Doe"
                      />
                      <TextField
                        fullWidth
                        label="Your Email"
                        name="memberEmail"
                        variant="outlined"
                        className="dark-input"
                        placeholder="john@example.com"
                      />
                    </Stack>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Message"
                      name="memberMsg"
                      variant="outlined"
                      className="dark-input"
                      placeholder="Write your message here..."
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button className="gradient-save-btn" type="submit" sx={{ minWidth: '250px' }}>
                        Send Message
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </Box>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </Box>
  );
}