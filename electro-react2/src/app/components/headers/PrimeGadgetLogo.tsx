import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
  }
`;

const CyberIcon = styled(Box)`
  position: relative;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function PrimeGadgetLogo() {
  return (
    <LogoContainer>
      {/* O'zingizga yoqqan HEXAGON ICON */}
      <CyberIcon>
        <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
          <path 
            d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" 
            stroke="#3b82f6" 
            strokeWidth="7" 
            strokeLinejoin="round"
          />
          <path 
            d="M55 25L35 55H50L45 75L65 45H50L55 25Z" 
            fill="white" 
          />
          <circle cx="50" cy="5" r="4" fill="#3b82f6" />
        </svg>
      </CyberIcon>

      {/* YANGI MATN STILI */}
      <TextWrapper>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800, // Juda qalin
            color: "#ffffff",
            letterSpacing: "-1px", // Harflar bir-biriga yaqin (Modern uslub)
            lineHeight: 0.9,
            textTransform: "uppercase",
            fontSize: "24px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          PRIME
        </Typography>
        <Typography
          sx={{
            fontWeight: 300, // Juda ingichka kontrast uchun
            color: "#3b82f6",
            letterSpacing: "6px", // Harflar orasida katta masofa (Futuristik)
            lineHeight: 1.5,
            textTransform: "uppercase",
            fontSize: "11px",
            mt: "2px",
            textShadow: "0 0 10px rgba(59, 130, 246, 0.5)", // Mayin neon nuri
          }}
        >
          GADGET
        </Typography>
      </TextWrapper>
    </LogoContainer>
  );
}