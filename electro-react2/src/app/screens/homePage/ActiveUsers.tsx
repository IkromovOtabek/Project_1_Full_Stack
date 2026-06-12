import React from "react";
import { Box, Stack, Typography, Card, Avatar } from "@mui/joy";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { User } from "../../../lib/types/user";
import { serverApi } from "../../../lib/config";

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({ topUsers }));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography level="h2" sx={{ mb: 5, textAlign: "center", color: "#fff", fontWeight: "800" }}>Active Members</Typography>
        <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap" sx={{ gap: 5 }}>
          {topUsers.map((user: User) => (
            <Card key={user._id} sx={{ 
              width: 220, alignItems: "center", borderRadius: "32px", p: 4,
              background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255,255,255,0.1)",
              transition: "0.3s", "&:hover": { background: "rgba(255, 255, 255, 0.08)" }
            }}>
              <Avatar 
                src={user.userImage ? `${serverApi}/${user.userImage}` : "/icons/default-user.svg"} 
                sx={{ "--Avatar-size": "100px", mb: 2, border: "4px solid #3b82f6", boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }} 
              />
              <Typography sx={{ color: "#fff", fontWeight: "700", fontSize: "20px" }}>{user.userNick}</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>{user.userPhone}</Typography>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}