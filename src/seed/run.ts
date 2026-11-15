import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedContent } from './index'

const payload = await getPayload({ config })

await seedContent(payload)

process.exit(0)
