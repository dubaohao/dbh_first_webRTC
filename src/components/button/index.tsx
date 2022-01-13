import React from 'react'
import s from './index.scss'

interface Props {
    text: string
}

class Button extends React.Component<Props> {
    render() {
        const { text } = this.props
        return (
            <div className={ s.buttonWrap }>
                <div className={ s.buttonText }>{text}</div>
            </div>
        )
    }
}
 
export default Button