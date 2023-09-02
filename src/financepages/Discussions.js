import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Card } from 'primereact/card';
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { Chips } from 'primereact/chips';
import Iconify from '../components/iconify/Iconify';
import { GET_ALL_POSTS,GET_USER_DATA } from '../FetchAPI';
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

    const handleProfile = (userId) => {
        console.log(userId)
        setIuser(userId)
        setVisible(true)
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
                return (
                    <Card key={i}>
                        <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
                        <Message key={i + 5} className="pi pi-user mr-2" text={p.userId} onClick={()=>handleProfile(p.userId)} />
                        <h4 >{p.comment} </h4>
                    </Card>
                )
            }) : ""
        )
    }
    return (
        <div>
          {dataUser!== undefined ?  <Dialog onHide={() => setVisible(false)} visible={visible}>{dataUser.user.email}-{dataUser.user.firstName}</Dialog> : ""}
        

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
                        <Card title={p.post} style={{ marginBottom: '10px' }} key={i}>
                            <i className="pi pi-user mr-2" />
                            <b>{p.userId}</b>
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