import { Server, Member, Profile } from '@prisma/client'

export type ServerWithMembersWtihProfiles = Server & {
    members: (Member & { profile: Profile })[]
}