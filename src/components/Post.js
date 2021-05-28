import {
  CircularProgress,
  IconButton,
  Paper,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import { POSTS_URL } from "../config/endpoints";

function Post(props) {
  const routeParams = useParams();
  const [postID, setpostID] = useState(0);
  const [data, setData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    setpostID(routeParams.postId);
  }, [routeParams]);
  useEffect(() => {
    axios
      .get(POSTS_URL + "/" + postID, {
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then((data) => {
        console.log(data);
        setData(data.data);
      });
  }, [postID]);
  return (
    <div className="post__container" data-aos="flip-right">
      <Paper
        elevation={3}
        style={{
          width: "70vw",
          height: "70vh",
          overflow: "auto",
          overscrollBehavior: "contain",
          zIndex: 1,
        }}
      >
        <div className="post__title">
          <IconButton onClick={() => history.go(-1)}>
            <ArrowBackIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        {!data ? (
          <CircularProgress />
        ) : (
          <div className="post__items">
            <TextField
              key={postID}
              label="ID"
              id={postID}
              name="ID"
              size="small"
              value={postID}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              data-aos="fade-up"
            />
            <TextField
              label="title"
              name="title"
              size="small"
              fullWidth
              value={data.title}
              variant="outlined"
              style={{ marginTop: "3rem" }}
              data-aos="fade-up"
              data-aos-delay={200}
            />
            <TextareaAutosize
              aria-label="Body"
              placeholder="Body"
              value={data.body}
              style={{ marginTop: "3rem" }}
              data-aos="fade-up"
              data-aos-delay={300}
            />
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Post;
