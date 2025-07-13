export type MembersType = {
  id: number
  name: string
  title: string
  rating: number
  major: string
  year: string
  wins: number
  losses: number
  draws: number
  avatar: string
  achievements: string[]
  join_date: string
  favoriteOpening: string
  bio: string
}[]

export type AlumnisType = {
  name: string
  title: string
  rating: number
  graduationYear: string
  achievements: string[]
  avatar: string
}[]
