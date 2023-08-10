
'use client'

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "../cards/CommunityCard";



// interface Props {
//     users: {
//         id: string;
//         objectId: string;
//         username: string;
//         name: string;
//         bio: string;
//         image: string;
//     }[];
//     isNext: boolean;
// }

interface CommunityProp {
    communities: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
        members: {
            image: string;
        }[]
    }[];
    isNext: boolean;
}




function CommunitySearch({searchType}: {searchType: 'User' | 'Community'}) {
    // const [users, setUsers] = useState<Props>();
    // const [searchUserTerm, setSearchUserTerm] = useState('');
    const [searchCommunityTerm, setSearchCommunityTerm] = useState('');
    const [communities, setCommunities] = useState<CommunityProp>();
    

    // useEffect(() => {
    //         const getUsers = async () => {
    //             const fetchedUsers = await fetchUsers({ 
    //                 userId: userId,
    //                 searchString: searchUserTerm
    //             })
        
    //             return setUsers(fetchedUsers);
    //         }
    
    //         getUsers();
    // }, [searchUserTerm])

    // useEffect(() => {
    //         const getCommunities = async () => {
    //             const fetchedUsers = await fetchCommunities({ 
    //                 searchString: searchCommunityTerm
    //             })
        
    //             return setCommunities(fetchedUsers);
    //         }
    
    //         getCommunities();
    // }, [searchCommunityTerm])

    

    return (
        <section>

            <div>
                <Input 
                    type="text"
                    className="account-form_input no-focus"
                    onChange={(e) => setSearchCommunityTerm(e.target.value)}
                />
            </div>

            {/* {searchType === 'User' && ( 
            <div className="mt-14 flex flex-col gap-9">
                {users && users.users.length === 0 ? (
                    <p className="no-result">No users</p>
                ) : (
                    <>
                        {users && users.users.map((person) => (
                            <UserCard 
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType='User'
                            />
                        ))}
                    </>
                )}
            </div>)} */}
            
            {searchType === 'Community' && 
            (<div className="mt-14 flex flex-col gap-9">
                {communities && communities.communities.length === 0 ? (
                    <p className="no-result">No Community</p>
                ) : (
                    <>
                        {communities && communities.communities.map((community: any) => (
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
            </div>)}
            
        </section>
    )
} 

export default CommunitySearch;