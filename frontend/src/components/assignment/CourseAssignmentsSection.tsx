import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import GradingRoundedIcon from "@mui/icons-material/GradingRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createAssignmentThunk,
  deleteAssignmentThunk,
  fetchAssignmentsByCourse,
  publishAssignmentThunk,
  updateAssignmentThunk,
} from "../../features/assignment/assignmentThunks";
import {
  fetchSubmissionsByAssignment,
  gradeSubmissionThunk,
  submitAssignmentThunk,
} from "../../features/submission/submissionThunks";
import { IAssignment } from "../../types/assignmentTypes";
import { ISubmission } from "../../types/submissionTypes";
import { showToast } from "../../utils/toast";

interface CourseAssignmentsSectionProps {
  courseId: string;
  canManage: boolean;
  canSubmit: boolean;
}

interface AssignmentFormState {
  title: string;
  description: string;
  dueDate: string;
  totalMarks: string;
  attachmentUrl: string;
  isPublished: boolean;
}

interface SubmissionFormState {
  textAnswer: string;
  fileUrl: string;
}

interface GradeDraft {
  grade: string;
  feedback: string;
}

const COLORS = {
  primary: "#00a3ff",
  textMain: "#1e293b",
  textSub: "#64748b",
  border: "#e2e8f0",
  soft: "#f8fafc",
};

const emptyAssignmentForm: AssignmentFormState = {
  title: "",
  description: "",
  dueDate: "",
  totalMarks: "100",
  attachmentUrl: "",
  isPublished: false,
};

const emptySubmissionForm: SubmissionFormState = {
  textAnswer: "",
  fileUrl: "",
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(date);
};

const toDateInputValue = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
};

const getStudentName = (submission: ISubmission) => {
  if (typeof submission.studentId === "object") {
    return submission.studentId.name || submission.studentId.email || "Student";
  }

  return "Student";
};

export default function CourseAssignmentsSection({
  courseId,
  canManage,
  canSubmit,
}: CourseAssignmentsSectionProps) {
  const dispatch = useAppDispatch();
  const { courseAssignments, loading, error } = useAppSelector(
    (state) => state.assignment
  );
  const { assignmentSubmissions } = useAppSelector((state) => state.submission);

  const [formOpen, setFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] =
    useState<IAssignment | null>(null);
  const [assignmentToDelete, setAssignmentToDelete] =
    useState<IAssignment | null>(null);
  const [form, setForm] = useState<AssignmentFormState>(emptyAssignmentForm);
  const [submittingAssignment, setSubmittingAssignment] =
    useState<IAssignment | null>(null);
  const [submissionForm, setSubmissionForm] =
    useState<SubmissionFormState>(emptySubmissionForm);
  const [submissionsFor, setSubmissionsFor] = useState<IAssignment | null>(null);
  const [gradeDrafts, setGradeDrafts] = useState<Record<string, GradeDraft>>({});

  useEffect(() => {
    dispatch(fetchAssignmentsByCourse(courseId));
  }, [courseId, dispatch]);

  const sortedAssignments = useMemo(
    () =>
      [...courseAssignments].sort(
        (a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      ),
    [courseAssignments]
  );

  const openCreateForm = () => {
    setEditingAssignment(null);
    setForm(emptyAssignmentForm);
    setFormOpen(true);
  };

  const openEditForm = (assignment: IAssignment) => {
    setEditingAssignment(assignment);
    setForm({
      title: assignment.title,
      description: assignment.description,
      dueDate: toDateInputValue(assignment.dueDate),
      totalMarks: String(assignment.totalMarks),
      attachmentUrl: assignment.attachmentUrl || "",
      isPublished: assignment.isPublished,
    });
    setFormOpen(true);
  };

  const handleAssignmentSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      totalMarks: Number(form.totalMarks),
      attachmentUrl: form.attachmentUrl.trim() || undefined,
      isPublished: form.isPublished,
    };

    try {
      if (editingAssignment) {
        await dispatch(
          updateAssignmentThunk({
            assignmentId: editingAssignment._id,
            data: payload,
          })
        ).unwrap();
        showToast("Assignment updated successfully", "success");
      } else {
        await dispatch(
          createAssignmentThunk({
            courseId,
            data: payload,
          })
        ).unwrap();
        showToast("Assignment created successfully", "success");
      }

      setFormOpen(false);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Assignment action failed",
        "error"
      );
    }
  };

  const handleDelete = async () => {
    if (!assignmentToDelete) {
      return;
    }

    try {
      await dispatch(deleteAssignmentThunk(assignmentToDelete._id)).unwrap();
      showToast("Assignment deleted successfully", "success");
      setAssignmentToDelete(null);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to delete assignment",
        "error"
      );
    }
  };

  const handlePublishToggle = async (assignment: IAssignment) => {
    try {
      await dispatch(
        publishAssignmentThunk({
          assignmentId: assignment._id,
          isPublished: !assignment.isPublished,
        })
      ).unwrap();
      showToast(
        assignment.isPublished ? "Assignment moved to draft" : "Assignment published",
        "success"
      );
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to update assignment status",
        "error"
      );
    }
  };

  const openSubmissionDialog = (assignment: IAssignment) => {
    setSubmittingAssignment(assignment);
    setSubmissionForm(emptySubmissionForm);
  };

  const handleStudentSubmission = async (event: FormEvent) => {
    event.preventDefault();

    if (!submittingAssignment) {
      return;
    }

    if (!submissionForm.textAnswer.trim() && !submissionForm.fileUrl.trim()) {
      showToast("Add a written answer or file URL before submitting", "warning");
      return;
    }

    try {
      await dispatch(
        submitAssignmentThunk({
          assignmentId: submittingAssignment._id,
          textAnswer: submissionForm.textAnswer.trim() || undefined,
          fileUrl: submissionForm.fileUrl.trim() || undefined,
        })
      ).unwrap();
      showToast("Assignment submitted successfully", "success");
      setSubmittingAssignment(null);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to submit assignment",
        "error"
      );
    }
  };

  const openSubmissions = async (assignment: IAssignment) => {
    setSubmissionsFor(assignment);
    await dispatch(fetchSubmissionsByAssignment(assignment._id));
  };

  const handleGrade = async (submission: ISubmission) => {
    const draft = gradeDrafts[submission._id];
    const grade = Number(draft?.grade);

    if (Number.isNaN(grade)) {
      showToast("Enter a valid grade", "warning");
      return;
    }

    try {
      await dispatch(
        gradeSubmissionThunk({
          id: submission._id,
          grade,
          feedback: draft?.feedback || "",
        })
      ).unwrap();
      showToast("Submission graded successfully", "success");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to grade submission",
        "error"
      );
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        border: `1px solid ${COLORS.border}`,
        bgcolor: "#ffffff",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.textMain }}>
              Assignments
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.textSub }}>
              Course work, deadlines, publishing, and submissions in one place.
            </Typography>
          </Box>

          {canManage && (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={openCreateForm}
              sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700 , bgcolor: COLORS.primary,color:"white"}}
            >
              Create Assignment
            </Button>
          )}
        </Box>

        {loading && <LinearProgress sx={{ mb: 3, borderRadius: 999 }} />}
        {error && <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>}

        {sortedAssignments.length === 0 ? (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
              border: `2px dashed ${COLORS.border}`,
              borderRadius: "16px",
              bgcolor: COLORS.soft,
            }}
          >
            <AssignmentTurnedInRoundedIcon sx={{ color: COLORS.textSub, mb: 1 }} />
            <Typography sx={{ color: COLORS.textMain, fontWeight: 700 }}>
              No assignments yet
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.textSub }}>
              {canManage
                ? "Create the first assignment for this course."
                : "Published assignments will appear here after enrollment access is confirmed."}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            {sortedAssignments.map((assignment) => (
              <Card
                key={assignment._id}
                variant="outlined"
                sx={{
                  borderRadius: "16px",
                  borderColor: COLORS.border,
                  bgcolor: COLORS.soft,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800, color: COLORS.textMain }}>
                        {assignment.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: COLORS.textSub, mt: 0.75, lineHeight: 1.6 }}
                      >
                        {assignment.description}
                      </Typography>
                    </Box>

                    <Chip
                      label={assignment.isPublished ? "Published" : "Draft"}
                      color={assignment.isPublished ? "success" : "warning"}
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 1.5,
                    }}
                  >
                    <Box>
                      <Typography variant="caption" sx={{ color: COLORS.textSub }}>
                        Due date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {formatDate(assignment.dueDate)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: COLORS.textSub }}>
                        Total marks
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {assignment.totalMarks}
                      </Typography>
                    </Box>
                  </Box>

                  {assignment.attachmentUrl && (
                    <Button
                      href={assignment.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      size="small"
                      sx={{ mt: 2, textTransform: "none", fontWeight: 700 }}
                    >
                      Open attachment
                    </Button>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                      mt: 2.5,
                    }}
                  >
                    {canSubmit ? (
                      <Button
                        variant="contained"
                        startIcon={<SendRoundedIcon />}
                        onClick={() => openSubmissionDialog(assignment)}
                        disabled={!assignment.isPublished}
                        sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Box />
                    )}

                    {canManage && (
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title={assignment.isPublished ? "Unpublish" : "Publish"}>
                          <IconButton onClick={() => handlePublishToggle(assignment)}>
                            <PublishRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Submissions">
                          <IconButton onClick={() => openSubmissions(assignment)}>
                            <GradingRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => openEditForm(assignment)}>
                            <EditRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => setAssignmentToDelete(assignment)}
                          >
                            <DeleteOutlineRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </CardContent>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={handleAssignmentSubmit}>
          <DialogTitle>
            {editingAssignment ? "Edit Assignment" : "Create Assignment"}
          </DialogTitle>
          <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              required
              multiline
              minRows={4}
              fullWidth
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                // label="Due date"
                type="date"
                value={form.dueDate}
                onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
                required
              />
              <TextField
                label="Total marks"
                type="number"
                value={form.totalMarks}
                onChange={(event) =>
                  setForm({ ...form, totalMarks: event.target.value })
                }
                required
              />
            </Box>
            <TextField
              label="Attachment URL"
              value={form.attachmentUrl}
              onChange={(event) =>
                setForm({ ...form, attachmentUrl: event.target.value })
              }
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>Published</Typography>
                <Typography variant="body2" sx={{ color: COLORS.textSub }}>
                  Students can view this assignment after enrollment.
                </Typography>
              </Box>
              <Switch
                checked={form.isPublished}
                onChange={(event) =>
                  setForm({ ...form, isPublished: event.target.checked })
                }
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingAssignment ? "Save Changes" : "Create"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={Boolean(assignmentToDelete)}
        onClose={() => setAssignmentToDelete(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete assignment?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: COLORS.textSub }}>
            This will remove the assignment from the course. Existing submissions will remain
            stored for audit history.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setAssignmentToDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(submittingAssignment)}
        onClose={() => setSubmittingAssignment(null)}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleStudentSubmission}>
          <DialogTitle>Submit Assignment</DialogTitle>
          <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
            <TextField
              label="Written answer"
              value={submissionForm.textAnswer}
              onChange={(event) =>
                setSubmissionForm({
                  ...submissionForm,
                  textAnswer: event.target.value,
                })
              }
              multiline
              minRows={5}
              fullWidth
            />
            <TextField
              label="File URL"
              value={submissionForm.fileUrl}
              onChange={(event) =>
                setSubmissionForm({
                  ...submissionForm,
                  fileUrl: event.target.value,
                })
              }
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setSubmittingAssignment(null)}>Cancel</Button>
            <Button type="submit" variant="contained" startIcon={<SendRoundedIcon />}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={Boolean(submissionsFor)}
        onClose={() => setSubmissionsFor(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Submissions</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2 }}>
          {assignmentSubmissions.length === 0 ? (
            <Typography sx={{ color: COLORS.textSub }}>
              No submissions have been received yet.
            </Typography>
          ) : (
            assignmentSubmissions.map((submission) => {
              const draft = gradeDrafts[submission._id] || {
                grade: submission.grade ? String(submission.grade) : "",
                feedback: submission.feedback || "",
              };

              return (
                <Card key={submission._id} variant="outlined" sx={{ borderRadius: "14px" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 800 }}>
                          {getStudentName(submission)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: COLORS.textSub }}>
                          Submitted {formatDate(submission.submittedAt)}
                        </Typography>
                      </Box>
                      <Chip
                        label={submission.status}
                        color={submission.status === "graded" ? "success" : "primary"}
                        size="small"
                      />
                    </Box>

                    {submission.textAnswer && (
                      <Typography variant="body2" sx={{ mt: 2, whiteSpace: "pre-wrap" }}>
                        {submission.textAnswer}
                      </Typography>
                    )}

                    {submission.fileUrl && (
                      <Button
                        href={submission.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        size="small"
                        sx={{ mt: 1, textTransform: "none", fontWeight: 700 }}
                      >
                        Open submitted file
                      </Button>
                    )}

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "140px 1fr auto" },
                        gap: 1.5,
                        mt: 2,
                      }}
                    >
                      <TextField
                        label="Grade"
                        type="number"
                        value={draft.grade}
                        onChange={(event) =>
                          setGradeDrafts({
                            ...gradeDrafts,
                            [submission._id]: {
                              ...draft,
                              grade: event.target.value,
                            },
                          })
                        }
                      />
                      <TextField
                        label="Feedback"
                        value={draft.feedback}
                        onChange={(event) =>
                          setGradeDrafts({
                            ...gradeDrafts,
                            [submission._id]: {
                              ...draft,
                              feedback: event.target.value,
                            },
                          })
                        }
                      />
                      <Button variant="contained" onClick={() => handleGrade(submission)}>
                        Grade
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setSubmissionsFor(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
