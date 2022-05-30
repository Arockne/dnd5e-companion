import { Group } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CampaignDeleteContainer from './CampaignDeleteContainer'
import CampaignUpdateContainer from './CampaignUpdateContainer'

function CampaignSettingsContainer() {
  const { campaign, status } = useSelector((state) => state.campaign)

  return (
    <Group direction="column">
      <CampaignUpdateContainer campaign={campaign} status={status} />
      <CampaignDeleteContainer campaign={campaign} status={status} />
    </Group>
  )
}

export default CampaignSettingsContainer