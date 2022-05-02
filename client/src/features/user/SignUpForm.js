import {
  List,
  Box,
  Button,
  PasswordInput,
  TextInput,
  LoadingOverlay,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from './userSlice'

function SignUpForm() {
  const [visible, setVisible] = useState(false)
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const { status, errors } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const disabled = Object.entries(form.values).every(
    ([_, value]) => value.length > 0
  )

  useEffect(() => {
    if (status === 'failed') {
      setVisible(false)
      form.setErrors(errors)
    }
    if (status === 'loading') {
      setVisible(true)
      form.clearErrors()
    }
  })

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) => dispatch(createUser(values)))}
        style={{ position: 'relative' }}
      >
        <LoadingOverlay visible={visible} />
        <TextInput
          required
          label="Username"
          placeholder="Username"
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="password"
          {...form.getInputProps('password')}
        />
        <List withPadding>
          {form.errors && Array.isArray(form.errors)
            ? form.errors.map((error) => (
                <List.Item key={error} style={{ color: 'burgundy' }}>
                  {error}
                </List.Item>
              ))
            : null}
        </List>
        <Button disabled={!disabled} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default SignUpForm