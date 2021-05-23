import noCamera from './images/no_camera.png'

const Video = () => (
    <img
        src={noCamera}
        alt='Поток данных с камеры отсутствует'
        height='100%'
        style={{pointerEvents: 'none'}}
    />
)

export default Video
