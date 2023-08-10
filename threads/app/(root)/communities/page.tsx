

import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from 'next/navigation';
import CommunitySearch from "@/components/forms/CommunitySearch";
import Searchbar from "@/components/shared/Searchbar";

async function Page({ searchParams} : { searchParams : {[key: string] : string | undefined}}) {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    // Fetch communities

    const result = await fetchCommunities({
        searchString: searchParams?.q,
        pageNumber: searchParams?.page ? +searchParams?.page : 1,
        pageSize: 25
    })

    return (
        <section>
        
        <Searchbar routeType="communities" />

        <div className="mt-14 flex flex-col gap-9">
            {result.communities.length === 0 ? (
                <p className="no-result">No Community</p>
            ) : (
                <>
                    {result.communities.map((community) => (
                        <CommunityCard 
                            key={community.id}
                            id={community.id}
                            name={community.name}
                            username={community.username}
                            imgUrl={community.image}
                            bio={community.bio}
                            members={community.members}
                        />
                    ))}
                </>
            )}
        </div>
        </section>
    )
}

export default Page;