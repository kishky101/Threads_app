'use client'

import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation'
// import { updateUser } from "@/lib/actions/user.actions";

import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";
// import { createThread } from "@/lib/actions/thread.action";


interface commentProps {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: commentProps) => {
    
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        }
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId, 
            values.thread, 
            JSON.parse(currentUserId), 
            pathname
        );

        form.reset();
    }

    return (
        <Form {...form}>
            <form
            className='comment-form'
            onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                    <FormItem className='flex w-full items-center gap-3'>
                        <FormLabel className="relative h-10 w-11">
                            <Image 
                                src={currentUserImg}
                                alt="profile image"
                                // width={48}
                                // height={48}
                                fill
                                className="rounded-full object-cover h-full w-full"
                            />
                        </FormLabel>
                        <FormControl className='border-none bg-transparent'>
                        <Input 
                            type="text"
                            placeholder="Add comment..."
                            className="no-focus text-light-1 outline-none"
                            {...field} 
                        />
                        </FormControl>
                    </FormItem>
                    )}
                />
        
                <Button type='submit' className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment;