import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector, useDispatch } from "react-redux";
import { delteMusicFile, fetchMusic } from "../redux/actions/musicActions";
import { toast } from "react-toastify";
import { DELETE_MUSIC_RESET } from "../redux/actionTypes/musicTypes";

const DeleteMusic = (props) => {
  const { deleteMusicOpen, setDeleteMusicOpen, tableRowId, search, genre, data } = props;
  const dispatch = useDispatch();
  const music = useSelector((state) => state.music);

  const handleClose = () => {
    setDeleteMusicOpen(false);
  };

  const handleDelete = () => {
    dispatch(delteMusicFile(tableRowId));
  };

  useEffect(() => {
    if (music?.deleteMusic?.isSuccess) {
      toast.success("Music Deleted Successfully!");
      console.log("checkDeleteData", data)
      if (data?.pageCount === 1) {
        sessionStorage.setItem("currentPage", 1)
        dispatch(fetchMusic({ search, genre, page: 1 }));
      } else {
        if (data?.music?.length === 1) {
          sessionStorage.setItem("currentPage", Number(data?.currentPage - 1))
          dispatch(fetchMusic({ search, genre, page: data?.currentPage - 1 }));
        } else {
          sessionStorage.setItem("currentPage", Number(data?.currentPage))
          dispatch(fetchMusic({ search, genre, page: data?.currentPage }));
        }
      }
      dispatch({ type: DELETE_MUSIC_RESET });

      handleClose();
    }

    if (music?.deleteMusic?.isError) {
      toast.error(music?.deleteMusic?.error);
      dispatch({ type: DELETE_MUSIC_RESET });
      handleClose();
    }
  }, [
    dispatch,
    music?.deleteMusic?.isSuccess,
    music?.deleteMusic?.isError,
    music?.deleteMusic?.error,
  ]);

  return (
    <>
      <Dialog
        open={deleteMusicOpen}
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
              <Box>Delete music</Box>

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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleDelete}
              >
                {music?.deleteMusic?.isLoading ? (
                  <CircularProgress sx={{ color: "#fff" }} />
                ) : (
                  "Yes"
                )}
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClose}
              >
                No
              </Button>
            </Box>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteMusic;
