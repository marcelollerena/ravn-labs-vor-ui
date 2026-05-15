import data from '@/../product/sections/ats-connection/data.json'
import { ATSConnection } from './components/ATSConnection'

export default function ATSConnectionPreview() {
  return (
    <ATSConnection
      providers={data.providers}
      connection={null}
      syncJobs={[]}
      importProgress={null}
      onConnect={(providerId, apiKey, custom) =>
        console.log('Connect:', { providerId, apiKey, custom })
      }
      onSync={() => console.log('Re-sync triggered')}
      onDisconnect={() => console.log('Disconnect')}
    />
  )
}
