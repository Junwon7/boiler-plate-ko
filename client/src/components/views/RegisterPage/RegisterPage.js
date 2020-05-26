import React, {useState} from 'react'
import { useDispatch } from 'react-redux';  // 함수  ?
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {


    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //페이지 reflash 막기
        //console.log('Email', Email)
        //console.log('Password', Password)

        if(Password !== ConfirmPassword ){
            return alert(' 비밀번호와 비밀번화 확인은 같아야 합니다.')  // 진입불가
        }

        let body ={  email: Email, password: Password,  name: Name }

        // Axios.post('/api/users/register', body)    // redux 사용하지 않을 경우 

        // redaux 사용
        dispatch(registerUser(body))  
            .then(response =>{
                if(response.payload.success){  // loginSuccess(로그인인경우 )
                    props.history.push('/login')   // root 페이지로 이동 
                }else{
                    //alert('Error')
                    alert("Failed to sign up")
                }

            })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
            
            <form style={{display:'flex', flexDirection: 'column'}}  onSubmit={onSubmitHandler}  >

                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type="submit">회원 가입</button>
            </form>
        </div>
    )
}

//export default RegisterPage
export default withRouter(RegisterPage)