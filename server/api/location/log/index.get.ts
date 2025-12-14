export default defineEventHandler(async (event) => {
  try {
    const q = getQuery(event)

    const moduleIdRaw = q.moduleId
    const monthRaw = q.month
    const weekRaw = q.week
    const yearRaw = q.year

    const moduleId =
      typeof moduleIdRaw === 'string' && moduleIdRaw.trim()
        ? moduleIdRaw.trim()
        : null

    // month can be "10" or "2025-10"
    let month: number | null = null // 1-12
    let year: number | null = null

    if (typeof monthRaw === 'string' && monthRaw.trim()) {
      const m = monthRaw.trim()

      // "YYYY-MM"
      const ymMatch = m.match(/^(\d{4})-(\d{1,2})$/)
      if (ymMatch) {
        year = Number(ymMatch[1])
        month = Number(ymMatch[2])
      } else {
        // "10"
        month = Number(m)
      }
    } else if (typeof monthRaw === 'number') {
      month = monthRaw
    }

    // optional year (only used if month is numeric like "10")
    if (year === null) {
      if (typeof yearRaw === 'string' && yearRaw.trim()) year = Number(yearRaw)
      else if (typeof yearRaw === 'number') year = yearRaw
      else year = new Date().getFullYear()
    }

    const week =
      typeof weekRaw === 'string' && weekRaw.trim()
        ? Number(weekRaw)
        : typeof weekRaw === 'number'
          ? weekRaw
          : null

    // Validate month/week if provided
    if (month !== null && (!Number.isFinite(month) || month < 1 || month > 12)) {
      setResponseStatus(event, 400)
      return { errorMessage: 'Invalid "month". Use 1-12 or "YYYY-MM" (e.g. 2025-10).' }
    }

    if (week !== null && (!Number.isFinite(week) || week < 1 || week > 5)) {
      setResponseStatus(event, 400)
      return { errorMessage: 'Invalid "week". Use 1-5 (week-of-month).' }
    }

    // Helper: last day of month
    const lastDayOfMonth = (y: number, m1to12: number) =>
      new Date(Date.UTC(y, m1to12, 0)).getUTCDate() // month is 1-based here

    // Compute range if month+week given
    // We compute bounds in "Asia/Manila" day boundaries (UTC+8) but store/query in UTC Date objects.
    const MANILA_OFFSET_HOURS = 8

    let from: Date | null = null
    let to: Date | null = null

    const shouldApplyWeekRange = month !== null && week !== null

    if (shouldApplyWeekRange) {
      const m = month as number
      const w = week as number
      const y = year as number

      const last = lastDayOfMonth(y, m)
      const startDay = (w - 1) * 7 + 1
      const endDay = Math.min(w * 7, last)

      if (startDay > last) {
        setResponseStatus(event, 400)
        return { errorMessage: `Week ${w} does not exist for ${y}-${String(m).padStart(2, '0')}.` }
      }

      // Manila 00:00 -> UTC = -8h
      from = new Date(Date.UTC(y, m - 1, startDay, 0 - MANILA_OFFSET_HOURS, 0, 0, 0))
      // Manila 23:59:59.999 -> UTC = 23:59 - 8h
      to = new Date(Date.UTC(y, m - 1, endDay, 23 - MANILA_OFFSET_HOURS, 59, 59, 999))
    }

    // Base query: collectionGroup('logs')
    // NOTE: We cannot reliably query by parent doc id (moduleId) in Firestore collectionGroup
    // unless moduleId is stored as a field in each log document.
    // So we filter by moduleId AFTER fetching (still correct, but less efficient).
    let ref = adminDB.collectionGroup('logs') as FirebaseFirestore.Query

    if (from) ref = ref.where('createdAt', '>=', from)
    if (to) ref = ref.where('createdAt', '<=', to)

    ref = ref.orderBy('createdAt', 'asc')

    const snapshot = await ref.get()

    let logs = snapshot.docs.map((doc) => {
      const data = doc.data() as any
      const ts = data.createdAt

      return {
        // parent device/module id (your existing behavior)
        id: doc.ref.parent.parent?.id,
        ...data,
        createdAt: ts?.toDate ? ts.toDate().toISOString() : null,
      }
    })

    // Optional moduleId filter (post-filter by parent id)
    if (moduleId) {
      logs = logs.filter((l: any) => l.id === moduleId)
    }

    console.log(logs);

    return logs
  } catch (error) {
    setResponseStatus(event, 500)
    console.error(`${error}`)
    return { errorMessage: `${error}` }
  }
})
