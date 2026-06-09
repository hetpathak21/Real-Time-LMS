// src/components/lessons/LessonDeleteDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from "@mui/material";

interface LessonDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export default function LessonDeleteDialog({ open, onClose, onConfirm, loading }: LessonDeleteDialogProps) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} slotProps={{ paper: { sx: { borderRadius: "20px", p: 1.5, maxWidth: "440px" } } }}>
      <DialogTitle sx={{ fontWeight: 800, color: "#1e293b" }}>Purge Syllabus Material Node?</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>
          Warning: This action permanently deletes this node from the course path. Associated media parameters cannot be recovered.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button disabled={loading} onClick={onClose} variant="outlined" sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, color: "#64748b" }}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={onConfirm} variant="contained" color="error" sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, px: 3, bgcolor: "#ef4444" }}>
          {loading ? <CircularProgress size={20} color="inherit" /> : "Purge Asset Data"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
