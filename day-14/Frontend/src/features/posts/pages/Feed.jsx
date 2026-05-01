/**
 * @layer = UI layer 
 */

import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {

    const { feed, handleGetFeed, loading } = usePost()

    //jese hi component load hone wala hai wese hi hum handleGetFeed chala denge
    useEffect(() => {
        handleGetFeed()
    }, [])

    if(loading|| !feed){
        return(
            <main><h1>Feed is loading...</h1></main>
        )
    }
    console.log(feed);
    

    return (
        <main className='feed-page'>
            <Nav />
            <div className="feed">
                <div className="posts">
                    {feed.map(post=>{
                        return <Post user={post.user} post={post} />
                    }).reverse()}
                </div>
            </div>
        </main>
    )
}

export default Feed