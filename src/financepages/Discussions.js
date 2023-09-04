import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Card } from 'primereact/card';
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { Tag } from 'primereact/tag';
import { Chips } from 'primereact/chips';
import Iconify from '../components/iconify/Iconify';
import { GET_ALL_POSTS, GET_USER_DATA } from '../FetchAPI';
import { POST_PUBLISH } from '../FetchMutationsAPI';

export default function Discussions() {
    const { loading, error, data } = useQuery(GET_ALL_POSTS)

    const [createPost] = useMutation(POST_PUBLISH)
    const [value, setValue] = useState('');
    const [iuser, setIuser] = useState('');
    const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(GET_USER_DATA, {
        variables: { _id: iuser },
    });
    console.log(dataUser)
    const [visible, setVisible] = useState(false)
    const token = localStorage.getItem('userData')
    const [postData, setPostData] = useState({
        userId: '',
        post: '',
    });
    const [postSentiment, setPostSentiment] = useState([])
    const [commentSentiment, setCommentSentiment] = useState([])

    useEffect(() => {
        setPostData((prevPostData) => ({
            ...prevPostData, userId: JSON.parse(token)._id, post: value
        }));
    }, [value])

    // useEffect(() => {
    //     setIuser((prevUser)=>({
    //         ...prevUser,userId: iuser
    //     }))
    // }, [iuser])

    const handlePost = () => {
        console.log(postData)
        createPost({
            variables: {
                postData: postData
            }
        })
    }

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }


    const handleProfile = (userId) => {
        console.log(userId)
        setIuser(userId)
        setVisible(true)
    }

    const handleSentiment = (comment) => {
        console.log(comment)
        query(comment).then((response) => {
            console.log(response[0])
            if (JSON.stringify(response)[0] === '[') {
                setCommentSentiment(response[0])
            }
        });
    }

    if (loading) return <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}><Iconify icon={'svg-spinners:blocks-wave'} color="#1877F2" width={60} /></div>
    if (error) {
        console.log(error.message)
    }
    if (data) {
        if (data.posts === 0) {
            return <h2>No Posts available</h2>
        }
    }

    const Comments = ({ props }) => {
        return (
            props.length > 0 ? props.map((p, i) => {
                const commentText = p.comment
                console.log('text');
                // query(commentText).then((response) => {
                //     if (JSON.stringify(response)[0] === '[') {
                //         setCommentSentiment(response[0])
                //     }
                // });
                return (
                    <div key={i}>
                        <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                        <Tag onClick={() => handleSentiment(p.comment)} style={{ height: '50px', marginRight: '30px' }}>{p.comment} </Tag>
                        <Message key={i + 5} style={{
                            border: 'solid #696cff',
                            borderWidth: '0 0 0 6px',
                            color: '#696cff'
                        }} text={`Posted By ${p.userId.toString()}`} onClick={() => handleProfile(p.userId)} />
                    </div>
                )
            }) : ""
        )
    }
    return (
        <div>
            {dataUser !== undefined ? <Dialog onHide={() => setVisible(false)} visible={visible}>{dataUser.user.email}-{dataUser.user.firstName}</Dialog> : ""}
            {commentSentiment !== undefined && commentSentiment.length > 0 ? <Dialog footer={<h3>Model Used - roberta-base-sentiment </h3>} onHide={() => setCommentSentiment([])} visible={commentSentiment.length > 0}>{commentSentiment.map((cs) => {
                return (
                    <div>
                        <div>
                            <p>{cs.label} - {cs.score}</p>
                        </div>
                    </div>
                )
            })}</Dialog> : ""}

            <div className="container">
                <div className="card flex justify-content-center">
                    <span className="p-float-label">
                        <InputTextarea id="description" value={value} onChange={(e) => setValue(e.target.value)} rows={3} cols={70} />
                        <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                        <label htmlFor="description">What's Happening...</label>
                        <Button label="Post" className="p-button-raised p-button-rounded" onClick={handlePost} />
                    </span>
                </div>
                {
                    data.posts.map((p, i) => {
                        return (
                            <Card key={i} style={{ marginBottom: '10px' }}>
                                {/* {query(postSentiment).then((response) => {
                                    if (JSON.stringify(response)[0] === '[') {
                                        return <p>{console.log(response)}</p>
                                    }
                                    return <p>sentiment data : null</p>
                                })} */}
                                <Button title={p.post} style={{ marginBottom: '10px' }} onClick={() => handleSentiment(p.post)} >{p.post}</Button>
                                <div>
                                    <Button onClick={() => handleProfile(p.userId)} text={p.userId}>{'Posted by '}{p.userId}</Button>
                                </div>
                                <p>{p.comments.length} Comments</p>
                                <Comments props={p.comments} />
                            </Card>
                        )
                    })
                }

            </div>
        </div>
    )
}