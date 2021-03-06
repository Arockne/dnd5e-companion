import { Group } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loader } from 'tabler-icons-react'
import CampaignForm from '../campaign/CampaignForm'
import CampaignsContainer from '../campaign/CampaignsContainer'
import CampaignSearchContainer from '../campaign-search/CampaignSearchContainer'
import MainHeader from '../navigation/MainHeader'
import Campaign from '../campaign/Campaign'
import CharactersContainer from '../character/CharactersContainer'

function HomeContainer() {
  const [pageLoad, setPageLoad] = useState(false)

  useEffect(() => {
    setPageLoad(true)
  }, [])

  return pageLoad ? (
    <Routes>
      <Route path="/" element={<MainHeader />}>
        <Route path="campaigns/search" element={<CampaignSearchContainer />} />
        <Route path="campaigns/create" element={<CampaignForm />} />
        <Route path="campaigns" element={<CampaignsContainer />} />
        <Route path="campaigns/:campaign_id/*" element={<Campaign />} />
        <Route path="characters" element={<CharactersContainer />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Group sx={{ justifyContent: 'center', height: '100vh' }}>
      <Loader size="100" variant="bars" />
    </Group>
  )
}

export default HomeContainer
