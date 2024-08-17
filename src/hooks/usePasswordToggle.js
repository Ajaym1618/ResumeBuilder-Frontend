import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';

const usePasswordToggle = () => {
    const [visible, setVisible] = useState("false");

    const Icon = visible ? <EyeInvisibleOutlined onClick={()=>setVisible(visibility=> !visibility)}/> : <EyeOutlined onClick={()=>setVisible(visibility=> !visibility)}/>

    const PasswordType = visible ? "password" : "text"

    return [PasswordType, Icon]

}

export default usePasswordToggle;