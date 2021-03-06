import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login } from '../actions/userActions'
import Sidebar from '../components/sidebar/sidebar';


const LoginScreen = () => {

    const location = useLocation()
    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(()=> {
        if(userInfo){
            history('/')
        }
    },[history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

    return <div>
        <Sidebar/>
        <Row>
        <Col md={{span:3, offset:5}}>
        <h1> Login </h1>
        
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                 type='email'
                 placeholder='Enter email' 
                 value={email} 
                 onChange={(e) => setEmail(e.target.value)}
                 ></Form.Control>

            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                 type='password'
                 placeholder='Enter password' 
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)}
                 ></Form.Control>

            </Form.Group>
            
            <Button type='submit' variant='primary m-2'>
                Sign in 
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New User? {"  "}
                <Link className='link-primary' to={redirect ? `/register?redirect=${redirect}`: '/register'}>
                      Register
                </Link>
            </Col>
        </Row>
    </Col> 
    </Row>
    </div>
}

export default LoginScreen