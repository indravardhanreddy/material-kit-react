// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import * as timeago from 'timeago.js';
// import { Link } from 'react-router-dom';

// import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
// import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
// import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
// import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
// // import { useContext } from 'react';
// // import { AuthContext } from '../../context/AuthContext';

// const Post = ({ post }) => {
//   const [user, setUser] = useState({user: 'Indra',username: 'indravardhan', })

//   const updatePostData = async () => {
//     try {
//       const res = await axios.get(`/post/${currentPost?._id}`, { userId: currentUser._id });
//       setCurrentPost(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const likePost = async () => {
//     try {
//       await axios.put(`/post/${currentPost?._id}/like`, { userId: currentUser._id });
//       await updatePostData();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const dislikePost = async () => {
//     try {
//       await axios.put(`/post/${currentPost?._id}/dislike`, {
//         userId: currentUser._id,
//       });
//       await updatePostData();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await axios.get(`/users?userId=${currentPost.userId}`);
//       setUser(response.data);
//     };
//     fetchUser();
//   }, [currentPost.userId]);

//   return (
//     <div className="post">
//       <div className="post-top">
//         <div className="user">
//           <Link
//             to={`/profile/${user?.username}`}
//             style={{ color: 'inherit', textDecoration: 'none' }}
//           >
//             <img
//               src={
//                 user?.profilePicture
//                   ? user?.profilePicture
//                   : 'https://thumbs.dreamstime.com/b/no-user-profile-picture-24185395.jpg'
//               }
//               alt=""
//             />
//           </Link>
//           <div className="user-info">
//             <Link
//               to={`/profile/${user?.username}`}
//               style={{ color: 'inherit', textDecoration: 'none' }}
//             >
//               <span className="username">{user?.username}</span>
//             </Link>
//             <span>{timeago.format(currentPost.createdAt)}</span>
//           </div>
//         </div>
//         <div>
//           <MoreVertRoundedIcon style={{ cursor: 'pointer' }} />
//         </div>
//       </div>
//       {currentPost?.image ? <hr /> : <hr style={{ display: 'none' }} />}
//       <div className="post-center">
//         {currentPost?.image ? (
//           <img src={currentPost?.image} alt="" />
//         ) : (
//           <img style={{ display: 'none' }} alt='text'/>
//         )}
//       </div>
//       <div className="post-desc">
//         <div className="description">
//           <span>{user?.username}</span>
//           <span>{currentPost?.description}</span>
//         </div>
//       </div>
//       <div className="post-bottom">
//         <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
//         <button className="icons" onClick={likePost}>{currentPost?.likes.includes(currentUser?._id) ? (
//             <ThumbUpAltRoundedIcon />
//           ) : (
//             <ThumbUpOutlinedIcon />
//           )}
//           <span>{currentPost?.likes.length}</span>
//         </button>
//         <button className="icons" onClick={dislikePost}>
//           {currentPost?.likes.includes(currentUser?._id) ? (
//             <ThumbDownAltRoundedIcon />
//           ) : (
//             <ThumbDownOffAltRoundedIcon />
//           )}
//           <span>{currentPost?.dislikes.length}</span>
//         </button>
//         <div className="icons">
//           <CommentRoundedIcon />
//           <span>10</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;
