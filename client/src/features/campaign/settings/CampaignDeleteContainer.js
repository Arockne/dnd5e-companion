import { Box, Button, Divider, Modal, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import CampaignDeleteForm from './CampaignDeleteForm'

function CampaignDeleteContainer({ campaign, status }) {
  const [opened, setOpened] = useState(false)

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Delete ${campaign?.name}?`}
        centered
      >
        <CampaignDeleteForm campaign={campaign} status={status} />
      </Modal>
      <Title order={3}>Delete Campaign</Title>
      <Divider size="xs" />
      <Text>Once deleted, there is no going back</Text>
      <Button variant="outline" color="red" onClick={() => setOpened(true)}>
        Delete this campaign
      </Button>
    </Box>
  )
}

export default CampaignDeleteContainer
