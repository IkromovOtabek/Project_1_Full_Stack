import React, { useState } from "react";
import { Modal, Backdrop, Fade, Stack, TextField, Typography, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShieldIcon from '@mui/icons-material/Shield';
import LockIcon from '@mui/icons-material/Lock';
import styled from "styled-components";
import { motion } from "framer-motion";
import UserService from "../../../services/UserService";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import { Messages } from "../../../lib/config";

/** STYLED COMPONENTS **/
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
`;

const AuthCard = styled(Box)`
  background: rgba(10, 15, 25, 0.98);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 40px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.9);
  outline: none;
  display: flex;
  width: 900px;
  max-width: 95%;
  min-height: 580px;
  overflow: hidden;
  position: relative;
`;

const AnimationSection = styled(Box)`
  flex: 1.2;
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FormSection = styled(Box)`
  flex: 1;
  padding: 50px;
  background: rgba(255, 255, 255, 0.01);
  z-index: 2;
`;

/* Animatsiya Elementlari */
const ShieldContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
`;

const RotatingRing = styled(motion.div)<{ size: string }>`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  border: 2px dashed rgba(59, 130, 246, 0.2);
  border-radius: 50%;
`;

const ScanLine = styled(motion.div)`
  position: absolute;
  width: 280px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  box-shadow: 0 0 20px #3b82f6;
  z-index: 10;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const { setAuthUser } = useGlobals();
  const [userNick, setUserNick] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setUserNick("");
    setUserPhone("");
    setUserPassword("");
  };

  const closeModal = () => {
    if (signupOpen) handleSignupClose();
    if (loginOpen) handleLoginClose();
    resetForm();
  };

  const handleSubmit = async () => {
    if (!userNick.trim() || !userPassword.trim() || (signupOpen && !userPhone.trim())) {
      await sweetErrorHandling({ message: Messages.error3 });
      return;
    }

    try {
      setSubmitting(true);
      const userService = new UserService();

      const user = signupOpen
        ? await userService.signup({
            userNick: userNick.trim(),
            userPhone: userPhone.trim(),
            userPassword: userPassword.trim(),
          })
        : await userService.login({
            userNick: userNick.trim(),
            userPassword: userPassword.trim(),
          });

      setAuthUser(user);
      // UX: muvaffaqiyatdan keyin modal darhol yopilsin.
      closeModal();
      sweetTopSuccessAlert(
        signupOpen ? "Successfully signed up" : "Successfully logged in",
        900,
      ).then();
    } catch (err) {
      await sweetErrorHandling(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledModal
      open={signupOpen || loginOpen}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={signupOpen || loginOpen}>
        <AuthCard>
          <IconButton 
            onClick={closeModal}
            sx={{ position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.3)', zIndex: 10 }}
          >
            <CloseIcon />
          </IconButton>

          {/* XAVFSIZLIK ANIMATSIYASI */}
          <AnimationSection sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ShieldContainer
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Skanerlash chizig'i */}
              <ScanLine 
                animate={{ top: ['20%', '80%', '20%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Halqalar */}
              <RotatingRing size="320px" animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
              <RotatingRing size="270px" animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />

              {/* QALQON VA QULF - QOQ O'RTADA */}
              <Box sx={{ 
                position: 'relative', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}>
                {/* Qalqon (Orqa qatlam) */}
                <ShieldIcon sx={{ 
                  fontSize: 140, 
                  color: 'rgba(59, 130, 246, 0.15)', 
                  filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))',
                  position: 'absolute'
                }} />
                
                {/* Asosiy Qalqon chizig'i */}
                <ShieldIcon sx={{ 
                  fontSize: 130, 
                  color: 'transparent',
                  stroke: '#3b82f6',
                  strokeWidth: '0.5px',
                  display: 'block',
                  position: 'absolute'
                }} />

                {/* MARKAZIY QULF */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    zIndex: 5,
                    boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.2)'
                }}>
                    <LockIcon sx={{ fontSize: 40, color: '#fff' }} />
                </Box>
              </Box>
            </ShieldContainer>

            <Box mt={4} textAlign="center" sx={{ zIndex: 2 }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, letterSpacing: 3, textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>
                {signupOpen ? "SECURE ENROLLMENT" : "ENCRYPTED ACCESS"}
              </Typography>
              <Typography sx={{ color: 'rgba(59, 130, 246, 0.6)', fontSize: '11px', mt: 1, fontWeight: 700 }}>
                SSL SECURED & DATA PROTECTED
              </Typography>
            </Box>
          </AnimationSection>

          {/* FORMA QISMI (O'zgarishsiz) */}
          <FormSection>
             {/* ... Oldingi form kodlari bu yerda bo'ladi ... */}
             <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#fff' }}>
              {signupOpen ? "Sign Up" : "Login"}
            </Typography>
            <Stack spacing={3} mt={4}>
               <TextField
                 fullWidth
                 label="Username"
                 variant="outlined"
                 className="dark-input"
                 value={userNick}
                 onChange={(e) => setUserNick(e.target.value)}
               />
               {signupOpen && (
                 <TextField
                   fullWidth
                   label="Phone"
                   variant="outlined"
                   className="dark-input"
                   value={userPhone}
                   onChange={(e) => setUserPhone(e.target.value)}
                 />
               )}
               <TextField
                 fullWidth
                 label="Password"
                 type="password"
                 variant="outlined"
                 className="dark-input"
                 value={userPassword}
                 onChange={(e) => setUserPassword(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
               />
               <Button
                 fullWidth
                 className="gradient-save-btn"
                 sx={{ py: 2 }}
                 onClick={handleSubmit}
                 disabled={submitting}
               >
                  {signupOpen ? "REGISTER SECURELY" : "AUTHORIZE"}
               </Button>
            </Stack>
          </FormSection>
        </AuthCard>
      </Fade>
    </StyledModal>
  );
}