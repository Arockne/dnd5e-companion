import { Card, Group, Image, Modal, Text, useMantineTheme } from '@mantine/core'
import React, { useState } from 'react'

function CampaignSearchCard({ campaign }) {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        {/* Modal content */}
      </Modal>
      <Card
        shadow="sm"
        p="lg"
        style={{ width: 180, cursor: 'pointer' }}
        onClick={() => setOpened(true)}
      >
        <Card.Section>
          <Image
            src={campaign.image_url}
            height={200}
            alt="campaign"
            withPlaceholder={true}
          />
        </Card.Section>

        <Group
          position="center"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500} align="center">
            {campaign.name}
          </Text>
        </Group>

        <Text
          size="xs"
          style={{ color: secondaryColor, lineHeight: 1.5 }}
          align="center"
        >
          {campaign.setting}
        </Text>
      </Card>
    </>
  )
}

export default CampaignSearchCard
