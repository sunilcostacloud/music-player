import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  editMusic,
  fetchMusic,
  fetchMusicbyId,
} from "../redux/actions/musicActions";
import { toast } from "react-toastify";
import { EDIT_MUSIC_RESET } from "../redux/actionTypes/musicTypes";

const EditMusic = (props) => {
  const { editMusicOpen, setEditMusicOpen, tableRowId, search, genre, currentPage } = props;
  const dispatch = useDispatch();
  const music = useSelector((state) => state.music);

  const [selectedFile, setSelectedFile] = useState(null);

  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAudioChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleClose = () => {
    setEditMusicOpen(false);
    setFormValues({})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("genre", formValues.genre);
    formData.append("singer", formValues.singer);
    formData.append("movie", formValues.movie);
    if (selectedFile != null) {
      formData.append("musicFile", selectedFile);
    }
    dispatch(editMusic(tableRowId, formData));
  };

  useEffect(() => {
    if (tableRowId != null) {
      dispatch(fetchMusicbyId(tableRowId));
    }
  }, [dispatch, tableRowId]);

  useEffect(() => {
    setFormValues(music?.singleMusic?.data);
  }, [music?.singleMusic, tableRowId, editMusicOpen]);

  useEffect(() => {
    if (music?.editMusic?.isSuccess) {
      toast.success("Music Updated Successfully!");
      dispatch({ type: EDIT_MUSIC_RESET });
      dispatch(fetchMusic({ search, genre, page: currentPage }));
      handleClose();
    }

    if (music?.editMusic?.isError) {
      toast.error(music?.editMusic?.error);
      dispatch({ type: EDIT_MUSIC_RESET });
      handleClose();
    }
  }, [
    dispatch,
    music?.editMusic?.isSuccess,
    music?.editMusic?.isError,
    music?.editMusic?.error,
  ]);

  return (
    <>
      <Dialog
        open={editMusicOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="customized-dialog-title">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>Edit music</Box>

              <CancelIcon
                onClick={handleClose}
                sx={{
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              />
            </Box>
          </DialogTitle>

          <DialogContent dividers>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    fullWidth
                    label="Name"
                    value={formValues.name}
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Genre"
                    name="genre"
                    value={formValues.genre}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Singer"
                    name="singer"
                    value={formValues.singer}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Movie"
                    name="movie"
                    value={formValues.movie}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="audio/*"
                    id="audio-upload"
                    type="file"
                    onChange={handleAudioChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {music?.editMusic?.isLoading ? (
                  <CircularProgress sx={{ color: "#fff" }} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditMusic;
