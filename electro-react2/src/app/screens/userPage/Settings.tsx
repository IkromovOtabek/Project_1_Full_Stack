import React, { useState } from "react";
import { Box, Button, Avatar, IconButton, Stack, Typography, TextField } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useGlobals } from "../../hooks/useGlobals";
import { UserUpdateInput } from "../../../lib/types/user";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import UserService from "../../../services/UserService";

export default function Settings() {
  const { authUser, setAuthUser } = useGlobals();
  const [previewImage, setPreviewImage] = useState<string>(
    authUser?.userImage ? `${serverApi}/${authUser.userImage}` : "/icons/default-user.svg"
  );

  const [userUpdateInput, setUserUpdateInput] = useState<UserUpdateInput>({
    _id: authUser?._id,
    userNick: authUser?.userNick || "",
    userPhone: authUser?.userPhone || "",
    userAddress: authUser?.userAddress || "",
    userDesc: authUser?.userDesc || "",
    userImage: authUser?.userImage,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserUpdateInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageViewer = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validateImageTypes.includes(file.type)) {
      sweetErrorHandling(Messages.error5);
    } else {
      setUserUpdateInput((prev) => ({ ...prev, userImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmitButton = async () => {
    try {
      if (!authUser) throw new Error(Messages.error2);
      if (!userUpdateInput.userNick || !userUpdateInput.userPhone) throw new Error(Messages.error3);

      const userService = new UserService();
      const result = await userService.updateUser(userUpdateInput);
      setAuthUser(result);
      await sweetTopSmallSuccessAlert("Settings updated successfully!", 700);
    } catch (err) {
      sweetErrorHandling(err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 5 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar 
            src={previewImage} 
            sx={{ width: 110, height: 110, borderRadius: '24px', border: '2px solid #3b82f6' }} 
          />
          <IconButton 
            component="label" 
            sx={{ 
              position: 'absolute', bottom: -10, right: -10, 
              bgcolor: '#3b82f6', color: 'white', 
              '&:hover': { bgcolor: '#2563eb' } 
            }}>
            <PhotoCameraIcon fontSize="small" />
            <input type="file" hidden onChange={handleImageViewer} />
          </IconButton>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: '800', color: '#fff', fontSize: '18px' }}>Profile Picture</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>PNG, JPG up to 5MB</Typography>
        </Box>
      </Box>

      <Stack spacing={4}>
        <TextField
          fullWidth label="Username" name="userNick"
          value={userUpdateInput.userNick} onChange={handleInputChange}
          variant="outlined" className="dark-input"
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <TextField
            fullWidth label="Phone" name="userPhone"
            value={userUpdateInput.userPhone} onChange={handleInputChange}
            variant="outlined" className="dark-input"
          />
          <TextField
            fullWidth label="Address" name="userAddress"
            value={userUpdateInput.userAddress} onChange={handleInputChange}
            variant="outlined" className="dark-input"
          />
        </Stack>

        <TextField
          fullWidth multiline rows={4} label="About Me" name="userDesc"
          value={userUpdateInput.userDesc} onChange={handleInputChange}
          variant="outlined" className="dark-input"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button className="gradient-save-btn" onClick={handleSubmitButton}>
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}