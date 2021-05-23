import {useState} from "react"

import noCamera from './images/no_camera.png'

const Video = () => {
    const [display, setDisplay] = useState('block')

    return (
        <>
            <img
                src='video_feed'
                alt=''
                height='100%'
                style={{pointerEvents: 'none', display}}
                onError={() => setDisplay('none')}
            />
            <img
                src={noCamera}
                alt='Поток данных с камеры отсутствует'
                height='100%'
                style={{pointerEvents: 'none'}}
            />
        </>
    )
}

export default Video
