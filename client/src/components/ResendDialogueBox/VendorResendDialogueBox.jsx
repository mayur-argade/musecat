import React from 'react'
import { VendorResendVerificationLink } from '../../http'
import toast, { Toaster } from 'react-hot-toast'

const VendorResendDialogueBox = ({ onClose, email }) => {

    const onResend = async (email) => {
        // while login if he is not verified then send a verification link to him again if the verification link is expired
        // if not expired then do not send a new verification link
        // for all this do check records of verification link expiry and all
        // create a request which will send a verification link again and also check for that all security mesaures
        await toast.promise(VendorResendVerificationLink({ email: email }), {
            loading: 'Sending Verification Mail',
            success: 'Verification link has been sent to your email',
            error: (error) => `${error.response.data.data || "something went wrong"}`,
        });
        onClose()
    }

    return (
        <div>
            <div class="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div class="p-6 text-center">
                    <img className=' mx-auto' width="100" height="100" src="https://img.icons8.com/bubbles/100/new-post.png" alt="new-post" />
                    <h5 class="text-center mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        Account Not Verified
                    </h5>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        <span className='font-semibold'>
                            Check your Mailbox for verification link
                        </span>
                        <br /> Click on the Button to complete the verification process, You might need to check the spam folder
                    </p>
                </div>
                <div class="flex justify-end p-6 pt-0">
                    <a
                        class="!font-medium !text-blue-gray-900 !transition-colors hover:!text-pink-500"
                        href="#"
                    >
                        <button
                            onClick={() => onResend(email)}
                            class="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-[#A48533] hover:text-[#C0A04C] transition-all hover:bg-slate-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-dark="true"
                        >
                            Resend verification link
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                class="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                ></path>
                            </svg>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default VendorResendDialogueBox