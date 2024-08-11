/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import PostComment from "./PostComment";
import BlogComments from "./BlogComments";

const Comments = (
  { onLoadComment, comments, onPostComment, onDelete },
  ref
) => {
  return (
    <>
      <PostComment
        onLoadComment={onLoadComment}
        comments={comments}
        onPostComment={onPostComment}
        ref={ref}
      />
      <BlogComments onDelete={onDelete} comments={comments} />
    </>
  );
};

export default forwardRef(Comments);
