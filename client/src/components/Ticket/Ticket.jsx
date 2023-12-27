import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import './ticket.css'
import { useReactToPrint } from 'react-to-print';

const Ticket = ({ event, ticket, download }) => {
    const [qrCodeSize, setQrCodeSize] = useState(240); // Initial size, adjust as needed

    const baseUrl = "http://omanwhereto.com/"

    const pageUrl = `${baseUrl}/${ticket._id}?download=true`;

    const qrdata = pageUrl;

    const qrCodeValue = JSON.stringify(qrdata);

    const handleDownloadPDF = () => {
        const element = document.getElementById('ticketContent');

        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${ticket.firstname}_${event.title}_ticket.pdf`);
        });
    };
    useEffect(() => {
        // You can calculate the size dynamically based on the container width, screen size, or any other logic.
        // For example, setting the QR code size to 80% of the container's width
        const containerWidth = document.getElementById('qrcodedata').clientWidth;
        const newSize = Math.floor(containerWidth * 0.9);
        setQrCodeSize(newSize);
    }, []);

    const mobileComponentRef = useRef();
    const componentRef = useRef();

    const handleMobilePrint = useReactToPrint({
        content: () => mobileComponentRef.current,
    })

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    console.log(download)

    if (download == 'true' || download == true) {
        handlePrint()
    }
    const handleQRCodeScan = () => {
        // Redirect to the specified URL
        window.location.href = pageUrl;
    };
    return (
        <>
            <div ref={componentRef} id="ticketContent" class="hidden md:block container bg-white rounded-lg">
                <div class="item rounded-2xl">
                    <div class="item-left">
                        <div className='flex justify-between items-center align-middle '>
                            <img className='mt-5 h-5' src="/images/logo/logo.png" alt="" />
                            {/* <img className='h-10 mr-5' src="/images/assets/logoticket.png" alt="" /> */}
                            <p class="font- text-md mt-5 mr-5 ">{ticket._id}</p>
                        </div>
                        <div className='flex space-x-10'>

                            <p class="font-bold text-md mt-5">{event.title}</p>


                        </div>
                        <div class="">
                            <p className='font-bold text-md mt-5'>{ticket.firstname} {ticket.lastname}</p>
                            <p className='font-medium text-md mt-5'>{ticket.email}</p>
                            <div className='flex justify-between mt-10'>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>Date</p>
                                    <p className='font-medium text-sm'>{moment(ticket.date).format("DD-MM-YYYY")}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>Class</p>
                                    <p className='font-medium text-sm'>{ticket.class}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>No. of Seats</p>
                                    <p className='font-medium text-sm'>{ticket.seats}</p>
                                </div>
                                <div className='flex flex-col mr-5'>
                                    <p className='font-light text-sm'>Status</p>
                                    <p className='font-medium text-sm'>{ticket.status}</p>
                                </div>
                            </div>
                        </div>
                        <span class="tickets">Tickets</span>
                    </div>
                    <div id='qrcodedata' class="item-right">
                        {/* <img className='h-60 mt-5' src="/images/assets/qrcode.png" alt="" /> */}
                        <QRCode value={qrCodeValue} className='mt-5'
                            bgColor="#C0A04C" fgColor="#ffff" level='L' size={qrCodeSize} onScan={handleQRCodeScan} />
                        <span class="up-border"></span>
                        <span class="down-border"></span>
                    </div>
                </div>

            </div>

            <div ref={mobileComponentRef} id='mobileTicketContent' className='block md:hidden'>

                <p class="msg"></p>

                <div class="m-ticket">

                    <div class="movie-details p-3">
                        <QRCode value={qrCodeValue} className='mt-5'
                            bgColor="white" fgColor="black" level='L' onScan={handleQRCodeScan} />

                        <div class="movie mt-5">
                            <span className='ml-0  font-bold text-xl'>{event.title}</span>

                            <p>{ticket.firstname} {ticket.lastname}</p>
                            <p>{ticket.email}</p>
                            <p>{moment(ticket.date).format("DD-MM-YYYY")}</p>
                        </div>

                    </div>

                    <div class="info-cancel">
                        Download this Ticket to show at a venue
                    </div>

                    <div class="ticket-details">


                        <div class="ticket">
                            <p>class: {ticket.class}</p>

                            <b>{ticket.seats}</b>

                            <p>{ticket.status}</p>

                            <h6>BOOKING ID: {ticket._id}</h6>

                        </div>

                    </div>

                </div>
            </div>
            <div className='flex justify-end'>
                <button
                    onClick={handlePrint}
                    className="hidden md:block mt-5 bg-[#C0A04C] text-white font-bold py-2 px-4 rounded"
                >
                    Download PDF
                </button>
                <button
                    onClick={handleMobilePrint}
                    className="block md:hidden mt-5 bg-[#C0A04C] text-white font-bold py-2 px-4 rounded"
                >
                    Download PDF
                </button>
            </div>
        </>
    )
}

export default Ticket