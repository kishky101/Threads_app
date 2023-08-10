// // 'use client'

// // import { useState, useEffect } from "react";
// import UserCard from "@/components/cards/UserCard";
// import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
// import { currentUser } from "@clerk/nextjs";
// import Image from "next/image";
// import { redirect } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"

// import Search from "@/components/forms/Search";

// async function Page() {
//     const user = await currentUser();

//     if(!user) return null;

//     const userInfo = await fetchUser(user.id);

//     if(!userInfo?.onboarded) redirect('/onboarding');

//     // Fetch users

//     // const [searchString, setSearchString] = useState('');


//     const result = await fetchUsers({
//         userId: user.id,
//         searchString: '',
//         pageNumber: 1,
//         pageSize: 25
//     })

//     return (
//         <section>
//             {/* <h1 className="head-text mb-10">Search</h1> */}

//         {/* Search bar */}
//             <div className="flex gap-3 ">
//                 {/* <Input  
//                     type="text"
//                     placeholder=""
//                     className="account-form_input no-focus"
//                     // onChange={(e) => setSearchString(e.target.value)}
//                 />
//                 <Button className="user-card_btn">Search</Button> */}
//                 {/* <Form {...form}>
//                     <form
//                     className='mt-10 flex flex-col justify-start gap-10'
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     >
//                         <FormField
//                             control={form.control}
//                             name='thread'
//                             render={({ field }) => (
//                             <FormItem className='flex w-full flex-col gap-3'>
//                                 <FormLabel className='text-base-semibold text-light-2'>
//                                 Content
//                                 </FormLabel>
//                                 <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
//                                 <Textarea rows={15} {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                             )}
//                         />
                
//                         <Button type='submit' className='bg-primary-500'>
//                             Post Thread
//                         </Button>
//                     </form>
//                 </Form> */}
//             </div>
//                 <Search userId={user.id} searchType="User" />
//             {/* <div className="mt-14 flex flex-col gap-9">
//                 {result.users.length === 0 ? (
//                     <p className="no-result">No users</p>
//                 ) : (
//                     <>
//                         {result.users.map((person) => (
//                             <UserCard 
//                                 key={person.id}
//                                 id={person.id}
//                                 name={person.name}
//                                 username={person.username}
//                                 imgUrl={person.image}
//                                 personType='User'
//                             />
//                         ))}
//                     </>
//                 )}
//             </div> */}
//         </section>
//     )
// }

// export default Page;

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
// import Pagination from "@/components/shared/Pagination";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <Searchbar routeType='search' />

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
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
      </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;