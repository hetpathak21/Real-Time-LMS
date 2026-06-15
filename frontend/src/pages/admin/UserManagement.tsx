// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Chip,
//   Stack,
//   Button,
//   CircularProgress,
//   Avatar,
//   IconButton,
//   Tabs,
//   Tab,
//   alpha,
// } from "@mui/material";
// import {
//   DeleteOutlinedd,
//   Block,
//   CheckCircleOutlined,
//   VerifiedUser,
//   Badge,
// } from "@mui/icons-material";
// import Grid from "@mui/system/Grid";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import {
//   deleteUserThunk,
//   fetchAllUsers,
//   updateUserStatusThunk,
// } from "../../features/user/userThunks";
// import { IUser } from "../../types/userTypes";

// const COLORS = {
//   primary: "#00a3ff",
//   textMain: "#2c3e50",
//   textSub: "#8a99ad",
//   danger: "#ef4444",
//   success: "#22c55e",
// };

// export default function UserManagement() {
//   const dispatch = useAppDispatch();
//   const { users, loading } = useAppSelector((state) => state.user);
//   const authUser = useAppSelector((state) => state.auth.user);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   const handleToggleStatus = (user: IUser) => {
//     const nextStatus = user.isActive === false ? "active" : "blocked";
//     dispatch(updateUserStatusThunk({ userId: user._id, status: nextStatus }));
//   };

//   const handleDelete = (user: IUser) => {
//     if (authUser?._id === user._id) return;
//     if (window.confirm(`Are you sure you want to remove ${user.name}?`)) {
//       dispatch(deleteUserThunk(user._id)).then(() => {
//         dispatch(fetchAllUsers());
//       });
//     }
//   };

//   // Filter Logic
//   const filteredUsers = users.filter((u) => {
//     if (filter === "all") return true;
//     return u.role.toLowerCase() === filter.toLowerCase();
//   });

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f4f7fd", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>

//       {/* HEADER SECTION */}
//       <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
//         <Box>
//           <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.textMain, mb: 0.5 }}>
//             User Management
//           </Typography>
//           <Typography variant="body2" sx={{ color: COLORS.textSub }}>
//             Manage platform access for {users.length} registered accounts.
//           </Typography>
//         </Box>

//         <Paper elevation={0} sx={{ borderRadius: "12px", bgcolor: "#fff", p: 0.5, border: "1px solid #e2e8f0" }}>
//           <Tabs
//             value={filter}
//             onChange={(_, val) => setFilter(val)}
//             indicatorColor="primary"
//             sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, textTransform: 'none', fontWeight: 600, px: 3 } }}
//           >
//             <Tab label="All Users" value="all" />
//             <Tab label="Teachers" value="teacher" />
//             <Tab label="Students" value="student" />
//           </Tabs>
//         </Paper>
//       </Box>

//       {loading ? (
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 10, gap: 2 }}>
//           <CircularProgress thickness={5} size={50} sx={{ color: COLORS.primary }} />
//           <Typography sx={{ color: COLORS.textSub, fontWeight: 600 }}>Syncing user database...</Typography>
//         </Box>
//       ) : filteredUsers.length === 0 ? (
//         <Paper elevation={0} sx={{ p: 6, borderRadius: "20px", textAlign: "center", border: "2px dashed #dbeafe" }}>
//           <Typography variant="h6" sx={{ color: COLORS.textMain, fontWeight: 700 }}>No users found</Typography>
//           <Typography sx={{ color: COLORS.textSub }}>Try changing your filters or check back later.</Typography>
//         </Paper>
//       ) : (
//         <Grid container spacing={3}>
//           {filteredUsers.map((user) => {
//             const isSelf = authUser?._id === user._id;
//             const isActive = user.isActive !== false;

//             return (
//               <Grid key={user._id} size={{ xs: 12, md: 6, lg: 4 }}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 2.5,
//                     borderRadius: "16px",
//                     border: "1px solid #e2e8f0",
//                     bgcolor: "#fff",
//                     transition: "0.3s",
//                     position: "relative",
//                     "&:hover": {
//                       boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
//                       borderColor: COLORS.primary,
//                     },
//                   }}
//                 >
//                   {/* Status Indicator */}
//                   <Box sx={{ position: "absolute", top: 16, right: 16 }}>
//                     <Chip
//                       size="small"
//                       label={isActive ? "Active" : "Blocked"}
//                       sx={{
//                         fontWeight: 700,
//                         fontSize: "10px",
//                         bgcolor: isActive ? alpha(COLORS.success, 0.1) : alpha(COLORS.danger, 0.1),
//                         color: isActive ? COLORS.success : COLORS.danger,
//                         border: `1px solid ${isActive ? COLORS.success : COLORS.danger}`,
//                       }}
//                     />
//                   </Box>

//                   <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5 }}>
//                     <Avatar
//                       sx={{
//                         width: 52,
//                         height: 52,
//                         bgcolor: alpha(COLORS.primary, 0.1),
//                         color: COLORS.primary,
//                         fontWeight: 800,
//                         fontSize: "1.2rem",
//                         border: `2px solid ${alpha(COLORS.primary, 0.2)}`
//                       }}
//                     >
//                       {user.name.charAt(0).toUpperCase()}
//                     </Avatar>
//                     <Box sx={{ minWidth: 0 }}>
//                       <Typography noWrap sx={{ fontWeight: 700, color: COLORS.textMain, fontSize: "1rem" }}>
//                         {user.name} {isSelf && "(You)"}
//                       </Typography>
//                       <Typography noWrap variant="caption" sx={{ color: COLORS.textSub, display: "block" }}>
//                         {user.email}
//                       </Typography>
//                     </Box>
//                   </Stack>

//                   <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
//                     <Chip
//                       icon={<Badge sx={{ fontSize: "14px !important" }} />}
//                       label={user.role.toUpperCase()}
//                       size="small"
//                       variant="outlined"
//                       sx={{ fontWeight: 600, borderRadius: "6px" }}
//                     />
//                     {user.isVerified && (
//                       <Chip
//                         icon={<VerifiedUser sx={{ fontSize: "14px !important" }} />}
//                         label="VERIFIED"
//                         size="small"
//                         sx={{ fontWeight: 600, borderRadius: "6px", bgcolor: "#f0fdf4", color: "#166534", border: "none" }}
//                       />
//                     )}
//                   </Stack>

//                   <Stack direction="row" spacing={1.5}>
//                     <Button
//                       fullWidth
//                       size="small"
//                       variant="contained"
//                       disableElevation
//                       startIcon={isActive ? <Block /> : <CheckCircleOutlined />}
//                       onClick={() => handleToggleStatus(user)}
//                       disabled={isSelf}
//                       sx={{
//                         textTransform: "none",
//                         fontWeight: 700,
//                         borderRadius: "8px",
//                         bgcolor: isActive ? "#334155" : COLORS.success,
//                         "&:hover": { bgcolor: isActive ? "#1e293b" : "#16a34a" },
//                       }}
//                     >
//                       {isActive ? "Block" : "Activate"}
//                     </Button>

//                     <IconButton
//                       onClick={() => handleDelete(user)}
//                       disabled={isSelf}
//                       sx={{
//                         borderRadius: "8px",
//                         color: COLORS.danger,
//                         bgcolor: alpha(COLORS.danger, 0.05),
//                         "&:hover": { bgcolor: alpha(COLORS.danger, 0.1) },
//                         border: `1px solid ${alpha(COLORS.danger, 0.2)}`
//                       }}
//                     >
//                       <DeleteOutlinedd />
//                     </IconButton>
//                   </Stack>
//                 </Paper>
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}
//     </Box>
//   );
// }

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  alpha,
  Tooltip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Search,
  Block,
  CheckCircle,
  DeleteOutlined,
  MailOutlined,
  Add,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteUserThunk,
  fetchAllUsers,
  updateUserStatusThunk,
} from "../../features/user/userThunks";
import { IUser } from "../../types/userTypes";
import { Stack } from "@mui/material";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
  success: "#22c55e",
  warning: "#eab308",
  error: "#ef4444",
};

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.user);
  const authUser = useAppSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Student" | "Teacher">(
    "All",
  );

  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Blocked"
  >("All");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleToggleStatus = (user: IUser) => {
    const nextStatus = user.isActive === false ? "active" : "blocked";
    dispatch(updateUserStatusThunk({ userId: user._id, status: nextStatus }));
  };

  const handleDelete = (user: IUser) => {
    if (authUser?._id === user._id) return;
    if (window.confirm(`Are you sure you want to remove ${user.name}?`)) {
      dispatch(deleteUserThunk(user._id)).then(() => {
        dispatch(fetchAllUsers());
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      user.role.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && user.isActive === true) ||
      (statusFilter === "Blocked" && user.isActive === false);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <Box
      sx={{ p: { xs: 2, md: 4 }, bgcolor: COLORS.bgLight, minHeight: "100vh" }}
    >
      {/* PAGE HEADER */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: COLORS.textMain }}
          >
            User Accounts
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.textSub }}>
            Platform-wide directory for access control and auditing.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: COLORS.primary,
            color: COLORS.bgLight,
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            boxShadow: `0 4px 14px 0 ${alpha(COLORS.primary, 0.39)}`,
          }}
        >
          Add New User
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          bgcolor: "#ffffff",
        }}
      >
        {/* TABLE TOOLBAR */}
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <TextField
            placeholder="Search name or email..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 320,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#f8fafc",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: COLORS.textSub, fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              label="Role"
              onChange={(e) =>
                setRoleFilter(e.target.value as "All" | "Student" | "Teacher")
              }
            >
              <MenuItem value="All">All Users</MenuItem>
              <MenuItem value="Student">Students</MenuItem>
              <MenuItem value="Teacher">Teachers</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) =>
                setStatusFilter(e.target.value as "All" | "Active" | "Blocked")
              }
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Blocked">Blocked</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* DATA TABLE */}
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 700, color: COLORS.textSub, py: 2 }}
                >
                  USER
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: COLORS.textSub }}>
                  ROLE
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: COLORS.textSub }}>
                  STATUS
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: COLORS.textSub }}>
                  VERIFICATION
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 700, color: COLORS.textSub, pr: 4 }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: COLORS.textSub,
                        fontWeight: 600,
                        fontSize: "18px"
                      }}
                    >
                      No matches found!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => {
                  const isActive = user.isActive !== false;
                  const isSelf = authUser?._id === user._id;

                  return (
                    <TableRow
                      key={user._id}
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            sx={{
                              width: 38,
                              height: 38,
                              fontSize: 14,
                              fontWeight: 700,
                              bgcolor: alpha(COLORS.primary, 0.1),
                              color: COLORS.primary,
                            }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                color: COLORS.textMain,
                              }}
                            >
                              {user.name}{" "}
                              {isSelf && (
                                <Typography
                                  component="span"
                                  variant="caption"
                                  sx={{ color: COLORS.primary, ml: 1 }}
                                >
                                  (You)
                                </Typography>
                              )}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: COLORS.textSub,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <MailOutlined sx={{ fontSize: 12 }} />{" "}
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: 11,
                            borderRadius: "6px",
                            textTransform: "uppercase",
                            bgcolor:
                              user.role === "admin" ? "#fef2f2" : "#eff6ff",
                            color:
                              user.role === "admin"
                                ? COLORS.error
                                : COLORS.primary,
                            border: `1px solid ${user.role === "admin" ? "#fee2e2" : "#dbeafe"}`,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: isActive
                                ? COLORS.success
                                : COLORS.warning,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: COLORS.textMain,
                            }}
                          >
                            {isActive ? "Active" : "Blocked"}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        {user.isVerified ? (
                          <Tooltip title="Email Verified">
                            <CheckCircle
                              sx={{ color: COLORS.success, fontSize: 18 }}
                            />
                          </Tooltip>
                        ) : (
                          <Typography
                            sx={{ fontSize: "0.85rem", color: COLORS.textSub }}
                          >
                            Pending
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="right" sx={{ pr: 2 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ justifyContent: "flex-end" }}
                        >
                          <Tooltip
                            title={isActive ? "Block Access" : "Grant Access"}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleToggleStatus(user)}
                              disabled={isSelf}
                              sx={{
                                color: COLORS.textMain,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              <Block sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Account">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(user)}
                              disabled={isSelf}
                              sx={{
                                color: COLORS.error,
                                border: "1px solid #fee2e2",
                                "&:hover": { bgcolor: "#fff1f2" },
                              }}
                            >
                              <DeleteOutlined sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#f8fafc",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: COLORS.textMain, fontSize: "17px" }}
          >
            Showing {filteredUsers.length} of {users.length} users
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              disabled
              sx={{ color: "black", textTransform: "none", fontSize: "15px" }}
            >
              Previous
            </Button>
            <Button
              size="small"
              variant="contained"
              disableElevation
              sx={{
                textTransform: "none",
                bgcolor: COLORS.primary,
                color: COLORS.bgLight,
                borderRadius: "5px",
                fontSize: "16px",
              }}
            >
              1
            </Button>
            <Button
              size="small"
              sx={{ textTransform: "none", fontSize: "16px" }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
