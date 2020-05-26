import React, {useEffect} from 'react'
import axios from 'axios'

import {withRouter} from 'react-router-dom'

function LandingPage(props) {

    useEffect(() => {
        axios.get('api/hello')
        .then(response => console.log(response.data))

    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            //console.log(response.data)
            if(response.data.success){  // loginSuccess(로그인인경우 )
                props.history.push('/login')   // root 페이지로 이동 , react-router-dom 사용해서 표시
            }else{
                //alert('Error')
                alert("로그아웃 하는데 실패 했습니다.")
            }
        })
    }


    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
           <h2>시작 페이지</h2>

           <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

//export default LandingPage
export default withRouter(LandingPage)
