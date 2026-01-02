import { MetadataRoute } from 'next'
import { BLOCK_ALL_ROBOTS } from '@repo/ui'

export default function robots(): MetadataRoute.Robots {
  return BLOCK_ALL_ROBOTS
}
