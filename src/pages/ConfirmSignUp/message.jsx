import React from 'react'
import MobileHeader from '../../components/Header/Header'
import { useQuery } from '@tanstack/react-query'
import {verifyUser} from '../../api/verifyUser'
import { useParams } from 'react-router-dom'

export default function ConfirmSignUp() {
  let {codeConfirmation} = useParams()
  const { data, isLoading, error } = useQuery(['message'],() => verifyUser(codeConfirmation));

  if (error) return <div>Request Failed</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
        <MobileHeader />
        <main>
            {data}
        </main>
    </>
  )
}
