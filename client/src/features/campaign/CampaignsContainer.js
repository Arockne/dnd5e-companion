import { Container, Group, Loader, Stack, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentCampaigns } from './campaignSlice'
import CampaignsTable from './CampaignTable'

function CampaignsContainer() {
  const dispatch = useDispatch()
  const {
    campaigns: { owned_campaigns, campaigns },
  } = useSelector((state) => state.campaign)

  useEffect(() => {
    dispatch(getCurrentCampaigns())
  }, [])

  return campaigns ? (
    <Stack>
      <Container>
        <Title align="center" order={2}>
          Created Campaigns
        </Title>
        <CampaignsTable campaigns={owned_campaigns} />
      </Container>
      <Container>
        <Title align="center" order={2}>
          Campaigns a Member of
        </Title>
        <CampaignsTable campaigns={campaigns} />
      </Container>
    </Stack>
  ) : (
    <Group position="center">
      <Loader size="xl" />
    </Group>
  )
}

export default CampaignsContainer