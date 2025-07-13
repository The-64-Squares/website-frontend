export type PuzzlePiecesType = { [key: number]: string }
export type PuzzleResponseType = { move: string; correct: boolean }[]
export type ClickedMovesType = { [key: number]: boolean }
export type TopMembersType = { name: string; rating: number; wins: number; avatar: string }[]
export type UpcomingEventsType = {title: string;date: string;time: string;location:string;participants: number}[]
export type RecentNewsType = { title: string; excerpt: string; date: string; image: string }[]
