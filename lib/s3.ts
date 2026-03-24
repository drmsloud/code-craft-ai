import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

/**
 * Generate a signed S3 URL for downloading a template
 * URL is valid for 24 hours
 */
export async function generateDownloadLink(templateId: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET || 'code-craft-templates',
      Key: `${templateId}.zip`,
    })

    // Sign URL for 24 hours (86400 seconds)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 86400 })

    console.log(`Generated download link for ${templateId}`)
    return signedUrl
  } catch (error) {
    console.error(`Error generating download link for ${templateId}:`, error)
    throw error
  }
}

/**
 * Generate multiple download links for batch operations
 */
export async function generateDownloadLinks(
  templateIds: string[]
): Promise<{ [key: string]: string }> {
  const links: { [key: string]: string } = {}

  for (const templateId of templateIds) {
    try {
      links[templateId] = await generateDownloadLink(templateId)
    } catch (error) {
      console.error(`Failed to generate link for ${templateId}:`, error)
    }
  }

  return links
}

/**
 * Get download link expiry time
 */
export function getDownloadLinkExpiry(): string {
  const expiryTime = new Date()
  expiryTime.setHours(expiryTime.getHours() + 24)
  return expiryTime.toISOString()
}
