import React, { useEffect, useState } from "react";
import axios from "axios";
import { POSTS_URL } from "../config/endpoints";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  TableContainer,
  IconButton,
  CircularProgress,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Posts(props) {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentRowId, setcurrentRowId] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const columns = [
    {
      id: "Id",
      label: "Id",
      minWidth: 20,
      align: "left",
    },
    {
      id: "Title",
      label: "Title",
      minWidth: 100,
      align: "left",
    },
    {
      id: "Body",
      label: "Body",
      minWidth: 170,
      align: "left",
    },
    {
      id: "op",
      minWidth: 150,
      align: "right",
    },
  ];
  useEffect(() => {
    axios
      .get(POSTS_URL, {
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then((data) => {
        setData(data.data);
      });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClick = (n) => {
    history.push(`/posts/${n.id}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };
  const AddPost = () => {
    console.log("title:", title, " body:", body);
    if (title !== "" && body !== "") {
      const newdata = { title, body, userId: 1 };
      axios
        .post(POSTS_URL, newdata, {
          headers: {
            "Content-Type": "Application/json",
          },
        })
        .then(function (response) {
          if (response.status === 201) {
            handleClose();
            toast.success("Added Successfully!");
          }
        });
    }
  };
  const deletePost = (id) => {
    handleDeleteClose();
    axios
      .delete(POSTS_URL + "/" + id, {
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          handleClose();
          toast.success("Deleted Successfully!");
        }
      });
  };
  function FormRow({ formData }) {
    console.log(formData);
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <h5>id:</h5>
            <p> {formData.id}</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <h5>title:</h5>
            <p style={{ marginLeft: "1rem" }}>{formData.title}</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <h5>body:</h5>
            <p style={{ marginLeft: "1rem" }}>{formData.body}</p>
          </div>
        </Grid>
        <div
          style={{
            width: "100%",

            marginBottom: "1.5rem",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => handleClick(formData)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setcurrentRowId(formData.id);
              setOpenDeleteDialog(true);
            }}
          >
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
        </div>
      </React.Fragment>
    );
  }
  return (
    <>
      <div className="posts" data-aos="flip-right">
        <div className="header">
          <Button
            style={{
              color: "white",
            }}
            fullWidth
            onClick={() => setOpen(true)}
          >
            <AddIcon /> ADD
          </Button>
        </div>
        <Paper
          elevation={3}
          style={{
            overflow: "auto",
            overscrollBehavior: "contain",
            zIndex: 1,
          }}
        >
          {!data ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : !isMobile ? (
            <Table
              stickyHeader
              aria-label="table"
              style={{ tableLayout: "auto" }}
              options={{
                headerStyle: { backgroundColor: "red" },
              }}
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={n.id}
                        // onClick={(event) => handleClick(n)}
                        data-aos="fade-up"
                        data-aos-delay={`${
                          150 * (n.id > rowsPerPage ? n.id % rowsPerPage : n.id)
                        }`}
                      >
                        <TableCell component="th" scope="row">
                          {n.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {n.title}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {n.body}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <IconButton onClick={() => handleClick(n)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setcurrentRowId(n.id);
                              setOpenDeleteDialog(true);
                            }}
                          >
                            <DeleteIcon style={{ color: "red" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          ) : (
            <div>
              {/* in mobile mode */}

              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  {data.map((n) => (
                    <FormRow formData={n} />
                  ))}
                </Grid>
              </Grid>
            </div>
          )}
          <TablePagination
            rowsPerPageOptions={[8, 10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>

        {/* dialogs */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          classes={{
            paper: "rounded-8",
          }}
          maxWidth="sm"
        >
          <AppBar position="static" elevation={1}>
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="subtitle1" color="inherit">
                Add New Post
              </Typography>
              <IconButton onClick={() => handleClose()}>
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <TextField
              label="title"
              name="title"
              size="small"
              fullWidth
              value={title}
              variant="outlined"
              style={{ marginTop: "3rem" }}
              data-aos="fade-up"
              data-aos-delay={200}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Body"
              name="Body"
              size="small"
              multiline
              fullWidth
              value={body}
              variant="outlined"
              style={{ margin: "3rem 0" }}
              data-aos="fade-up"
              data-aos-delay={200}
              onChange={(e) => setBody(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={AddPost}
              size="large"
            >
              ADD
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteClose}
          aria-labelledby="Delete Confirm"
          aria-describedby="Delete Confirm"
        >
          <DialogTitle id="alert-dialog-title">are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              are You sure you want to delete this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>NO</Button>
            <Button onClick={deletePost} autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer />
    </>
  );
}

export default Posts;
