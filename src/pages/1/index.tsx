import React from 'react'
import Button from '../../components/button'
import s from './index.scss'

class One extends React.Component {
    state = {
        devices: {},
    }

    // 打开摄像头、麦克风等，会触发获取权限弹窗
    openMediaDevices = async (constraints: any) => {
        const result = await navigator.mediaDevices.getUserMedia(constraints);
        return result
    }
    // 查询媒体设备
    getConnectedDevices = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices
    }
    // 更新照相机列表
    updateCameraList(devices: any) {
        this.setState({
            devices
        })
    }
    // 监听设备更改
    addListener = () => {
        navigator.mediaDevices.addEventListener('devicechange', event => {
            const newCameraList = this.getConnectedDevices();
            this.updateCameraList(newCameraList);
        });
    }

    // 第1个按钮
    clickButton1 = async () => {
        try {
            const stream = await this.openMediaDevices({'video':true,'audio':true});
            // 会得到一个promise
            console.log('Got MediaStream:', stream);
            // 放到本地播放
            const videoElement = document.querySelector('#video')
            console.log('videoElement:', videoElement);
            // videoElement.src = window.URL.createObjectURL(new Blob([stream]))
            videoElement.srcObject = stream
        } catch(err) {
            console.log('Got MediaStream Error:', err);
        }
    }
    // 第2个按钮
    clickButton2 = async () => {
        const videoCameras = await this.getConnectedDevices();
        console.log('Cameras found:', videoCameras, typeof(videoCameras));
        
        this.setState({
            devices: videoCameras,
        })
    }
    // 第3个按钮
    clickButton3 = () => {
        this.addListener()
    }
    // 第3个按钮
    clickButton4 = () => {
        const videoElement = document.querySelector('#video')
        videoElement.srcObject.getTracks()[0].stop();
        videoElement.srcObject.getTracks()[1].stop();
    }

    render() {
        const { devices } = this.state
        return (
            <div className={ s.container }>
                <div className={ s.screen }>
                    <div className={ s.videoWrap }>
                        <video id="video"  className={ s.video } autoPlay playsInline controls={ false } />
                    </div>
                    <div className={ s.devicesWrap }>
                        <div className={ s.title }>当前设备({Object.values(devices).length})</div>
                        <div className={ s.devices }>
                            { Object.values(devices).map((item, index) => {
                                return (
                                    <div className={ s.device } key={ index }>
                                        {index + 1} :【{ item.kind }】 { item.label }
                                        {/* { item.deviceId }
                                        { item.groupId } */}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={ s.content }>
                    <div className={ s.title } >第一节：媒体设备</div>
                    <div className={ s.oneWrap }>
                        <div className={ s.button } onClick={ this.clickButton1 }>
                            <Button text="打开摄像头、麦克风" />
                        </div>
                        <div className={ s.button } onClick={ this.clickButton2 }>
                            <Button text="查询媒体设备" />
                        </div>
                        <div className={ s.button } onClick={ this.clickButton3 }>
                            <Button text="监听设备更改" />
                        </div>
                        <div className={ s.button } onClick={ this.clickButton4 }>
                            <Button text="关闭摄像头、麦克风" />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
 
export default One