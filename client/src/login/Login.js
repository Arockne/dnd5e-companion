import { Title } from '@mantine/core'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Login() {
  return (
    <>
      <Title order={1} align="center">
        Welcome to DnD 5e Companion
      </Title>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default Login