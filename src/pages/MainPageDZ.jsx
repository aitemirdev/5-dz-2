import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAction } from '../redux/actions/actions';
import axios from 'axios';

function MainPageDZ() {
    const dispatch = useDispatch();
    const preloader = useSelector(state => state.preloaderReducer.preloader);
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const formValue = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const validate = () => {
        let errors = {};

        if (!user.fullName.trim()) {
            errors.fullName = 'Full Name is required';
        }
        if (!user.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!user.username.trim()) {
            errors.username = 'Username is required';
        }
        if (!user.password) {
            errors.password = 'Password is required';
        } else if (user.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        if (user.password !== user.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const addUser = (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        axios.post('https://644106a6792fe886a8a8dca5.mockapi.io/api/v1/users', user)
            .then(response => {
                console.log(response.data);
                dispatch(addUserAction(user));
                setUser({
                    fullName: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <Container className="mt-5">
            {preloader ? <Spinner animation="border" />
                : <Form onSubmit={addUser}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className='mb-3' controlId="fullName">
                                <Form.Control
                                    type="text"
                                    placeholder='Full Name'
                                    name='fullName'
                                    value={user.fullName}
                                    onChange={formValue}
                                />
                                {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className='mb-3' controlId="email">
                                <Form.Control
                                    type="email"
                                    placeholder='Email'
                                    name='email'
                                    value={user.email}
                                    onChange={formValue}
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className='mb-3' controlId="username">
                                <Form.Control
                                    type="text"
                                    placeholder='Username'
                                    name='username'
                                    value={user.username}
                                    onChange={formValue}
                                />
                                {errors.username && <div className="text-danger">{errors.username}</div>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className='mb-3' controlId="password">
                                <Form.Control
                                    type="password"
                                    placeholder='Password'
                                    name='password'
                                    value={user.password}
                                    onChange={formValue}
                                />
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className='mb-3' controlId="confirmPassword">
                                <Form.Control
                                    type="password"
                                    placeholder='Confirm Password'
                                    name='confirmPassword'
                                    value={user.confirmPassword}
                                    onChange={formValue}
                                />
                                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Button type='submit' variant='success' className='w-100'>
                                Register User
                            </Button>
                        </Col>
                    </Row>
                </Form>
            }
        </Container>
    );
}

export default MainPageDZ;
