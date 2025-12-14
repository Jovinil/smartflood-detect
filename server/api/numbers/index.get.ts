import { defineEventHandler, getHeader, createError } from "h3"
import { adminAuth } from "~/server/utils/firebaseAdmin"

export default defineEventHandler(async (event) => {
  const numbers: Array<{ uid: string; phoneNumber: string }> = []

  let pageToken: string | undefined = undefined
  do {
    const page = await adminAuth.listUsers(1000, pageToken)
    for (const u of page.users) {
      if (u.phoneNumber) {
        numbers.push({ uid: u.uid, phoneNumber: u.phoneNumber })
      }
    }
    pageToken = page.pageToken
  } while (pageToken)

  return {
    count: numbers.length,
    numbers,
  }
})
