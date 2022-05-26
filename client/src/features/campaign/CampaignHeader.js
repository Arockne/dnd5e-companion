import React, { useEffect } from 'react'
import { Anchor, Grid, Group, Stack, Tabs, Title } from '@mantine/core'
import { MessageCircle, Photo, Settings } from 'tabler-icons-react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaign } from './campaignSlice'

export function CampaignHeader() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { campaign } = useSelector((state) => state.campaign)

  useEffect(() => {
    dispatch(getCampaign(id))
  }, [id])

  return (
    <Grid grow>
      <Grid.Col span={1}>
        <Stack>
          <NavLink to={`/campaigns/${id}`}>Overview</NavLink>
          <NavLink to={`/campaigns/${id}`}>Players</NavLink>
          <NavLink to={`/campaigns/${id}`}>Messages</NavLink>
          <NavLink to={`/campaigns/${id}`}>Logs</NavLink>
          <NavLink to={`/campaigns/${id}`}>Settings</NavLink>
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Title order={2}>{campaign?.name}</Title>
        <Outlet />
      </Grid.Col>
    </Grid>
  )
}

export default CampaignHeader
